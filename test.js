const Cache = require('./cache');

const testKey = 'testKey';
const testVal = 'testVal';
const testExpiry = 10000;
let cache = null;

beforeEach(() => {
  cache = new Cache();
});

it('Should add a new key with expiration', () => {
  const isAdded = cache.add(testKey, testVal, testExpiry);
  expect(isAdded).not.toEqual(false);
});

it('Should add a new key with no expiration', () => {
  const isAdded = cache.add(testKey, testVal, null);
  expect(isAdded).not.toEqual(false);
});

it('Should collide on duplicate additions', () => {
  const isAdded = cache.add(testKey, testVal, null);
  expect(isAdded).not.toEqual(false);

  const isAddedTwice = cache.add(testKey, testVal, null);
  expect(isAddedTwice).toEqual(false);
});

it('Should get a key', () => {
  const isAdded = cache.add(testKey, testVal, null);
  expect(isAdded).not.toEqual(false);

  const val = cache.fetch(testKey);
  expect(val).toBe(testVal);
});

it('Should delete a key', () => {
  const isAdded = cache.add(testKey, testVal, null);
  expect(isAdded).not.toEqual(false);

  const isDeleted = cache.remove(testKey);
  expect(isDeleted).toBe(true);
});

it('Should expire a key', () => {
  const isAdded = cache.add(testKey, testVal, 1000);
  expect(isAdded).not.toEqual(false);

  setTimeout(() => {
    const val = cache.fetch(testKey);
    expect(val).toBe(false);
  }, 1000);
});
