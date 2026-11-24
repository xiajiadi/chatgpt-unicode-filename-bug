// Offline illustration only: not ChatGPT source code.
export function buildQuery(path, alreadyEncoded = false) {
  const value = alreadyEncoded ? encodeURI(path) : path;
  return new URLSearchParams({ sandbox_path: value }).toString();
}
export function parsePath(query) {
  return new URLSearchParams(query).get('sandbox_path');
}
if (process.argv[1] && process.argv[1].endsWith('encoding-demo.mjs')) {
  const path = '/mnt/data/123456中文测试.txt';
  // The observed route encoded filename characters but not path separators.
  for (const name of [path, '/mnt/data/123456_café_résumé.txt']) {
    const good = buildQuery(name);
    const affected = buildQuery(name, true);
    console.log('\nOriginal:', name);
    console.log('Single:  ', good, '=>', parsePath(good));
    console.log('Double:  ', affected, '=>', parsePath(affected));
  }
}
