import test from 'node:test';
import assert from 'node:assert/strict';
import { buildQuery, parsePath } from './encoding-demo.mjs';

for (const path of ['/mnt/data/123456中文测试.txt', '/mnt/data/123456_café_résumé.txt']) {
  test('raw path round-trips: ' + path, () => {
    assert.equal(parsePath(buildQuery(path)), path);
  });
  test('pre-encoded path retains percent escapes: ' + path, () => {
    const query = buildQuery(path, true);
    assert.match(query, /%25/);
    assert.equal(parsePath(query), encodeURI(path));
    assert.notEqual(parsePath(query), path);
  });
}
test('ASCII control', () => {
  const path = '/mnt/data/Filename_Test.txt';
  assert.equal(buildQuery(path), buildQuery(path, true));
});
test('literal percent escapes must not be blindly decoded', () => {
  const path = '/mnt/data/literal_%E4.txt';
  assert.equal(parsePath(buildQuery(path)), path);
  assert.throws(() => decodeURIComponent(path), URIError);
});
