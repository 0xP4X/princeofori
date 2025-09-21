import fs from 'fs';
import path from 'path';

const ROOT = path.resolve('c:/Users/dzuke/Desktop/CyberPort');
const OUT_FILE = path.join(ROOT, 'code-index.json');
const INCLUDE_EXT = new Set(['.ts', '.tsx', '.js', '.jsx']);
const EXCLUDE_DIRS = new Set(['node_modules', 'dist', 'build', '.git', '.next', 'coverage']);

/** Recursively walk directory and collect files */
function walk(dir) {
  /** @type {string[]} */
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (EXCLUDE_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walk(full));
    } else {
      const ext = path.extname(entry.name);
      if (INCLUDE_EXT.has(ext)) results.push(full);
    }
  }
  return results;
}

/** Extract import information */
function extractImports(src) {
  const importRegex = /import\s+([^;]+?)\s+from\s+['\"]([^'\"]+)['\"]/g;
  const sideEffectRegex = /import\s+['\"]([^'\"]+)['\"]/g;
  const imports = [];
  let m;
  while ((m = importRegex.exec(src))) {
    const spec = m[1].trim();
    const from = m[2];
    imports.push({ from, spec });
  }
  while ((m = sideEffectRegex.exec(src))) {
    const from = m[1];
    imports.push({ from, spec: '*side-effect*' });
  }
  return imports;
}

/** Extract export info */
function extractExports(src) {
  const named = new Set();
  let defaultExport = null;
  const reexports = [];

  // export default function Name ... / export default Name
  const defaultFnRegex = /export\s+default\s+function\s+(\w+)/g;
  const defaultNameRegex = /export\s+default\s+(\w+)/g;
  let m;
  while ((m = defaultFnRegex.exec(src))) defaultExport = m[1];
  while ((m = defaultNameRegex.exec(src))) defaultExport = m[1];

  // export function foo / export const foo / export class Foo
  const namedRegex = /export\s+(?:const|let|var|function|class|type|interface|enum)\s+(\w+)/g;
  while ((m = namedRegex.exec(src))) named.add(m[1]);

  // export { a, b as c } [from '...']
  const braceExport = /export\s*\{([^}]+)\}(?:\s*from\s*['\"]([^'\"]+)['\"])*/g;
  while ((m = braceExport.exec(src))) {
    const spec = m[1];
    const from = m[2] || null;
    const names = spec
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
      .map(s => s.replace(/\s+as\s+\w+/, '').trim());
    names.forEach(n => named.add(n));
    if (from) reexports.push({ from, names });
  }

  return { named: Array.from(named), default: defaultExport, reexports };
}

/** Extract top-level function & class names */
function extractSymbols(src) {
  const functions = new Set();
  const classes = new Set();

  let m;
  const fnDecl = /(?:^|\n)\s*function\s+(\w+)\s*\(/g;
  while ((m = fnDecl.exec(src))) functions.add(m[1]);

  const constFn = /(?:^|\n)\s*export?\s*\b(?:const|let|var)\s+(\w+)\s*=\s*\(/g;
  while ((m = constFn.exec(src))) functions.add(m[1]);

  const arrowFn = /(?:^|\n)\s*export?\s*\b(?:const|let|var)\s+(\w+)\s*=\s*[^=]*=>/g;
  while ((m = arrowFn.exec(src))) functions.add(m[1]);

  const clsDecl = /(?:^|\n)\s*class\s+(\w+)\s*/g;
  while ((m = clsDecl.exec(src))) classes.add(m[1]);

  return { functions: Array.from(functions), classes: Array.from(classes) };
}

/** Heuristic React component detection */
function detectReactComponents(filePath, src, symbols) {
  const isTSX = filePath.endsWith('.tsx') || filePath.endsWith('.jsx');
  const comps = new Set();
  if (!isTSX) return [];
  for (const fn of symbols.functions) {
    if (/^[A-Z]/.test(fn)) comps.add(fn);
  }
  // default export unnamed in TSX => assume default component name as 'DefaultExport'
  if (/export\s+default\s+function\s*\(/.test(src)) comps.add('DefaultExport');
  return Array.from(comps);
}

function main() {
  const files = walk(ROOT).filter(p => p.startsWith(path.join(ROOT, 'client')) || p.startsWith(path.join(ROOT, 'server')) || p.startsWith(path.join(ROOT, 'shared')));
  const records = [];
  for (const file of files) {
    let src;
    try {
      src = fs.readFileSync(file, 'utf8');
    } catch {
      continue;
    }
    const imports = extractImports(src);
    const exp = extractExports(src);
    const symbols = extractSymbols(src);
    const reactComponents = detectReactComponents(file, src, symbols);
    records.push({
      path: file.replaceAll('\\', '/'),
      ext: path.extname(file),
      size: fs.statSync(file).size,
      exports: exp,
      imports,
      functions: symbols.functions,
      classes: symbols.classes,
      reactComponents,
    });
  }

  const index = {
    generatedAt: new Date().toISOString(),
    root: ROOT.replaceAll('\\', '/'),
    files: records,
  };

  fs.writeFileSync(OUT_FILE, JSON.stringify(index, null, 2));
  console.log(`Indexed ${records.length} files -> ${OUT_FILE}`);
}

main();