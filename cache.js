class Cache {

  constructor() {
    this.cache = {};
    this.hits = 0;
    this.misses = 0;
    this.collisions = 0;
    this.size = 0;

    console.log(`The new cache has been created`);
  }

  // Adds a key/val to the registry
  add(key, value, expiry = null) {
    // Check for key existence
    if (this.cache.hasOwnProperty(key)) {
      console.log(`Record with key "${key}" already exists`);
      return false;
    }

    value = value.toString();
    this.size++;
    this.cache[key] = {
      value,
      expiry,
    };

    if (!isNaN(expiry)) {
      this.cache[key].timeout = setTimeout(() => {
        this.remove(key);
      }, expiry);
    }

    console.log(`The record "${key}" has been added`);
    return true;
  }

  // Removes a key/val from the registry
  remove(key) {
    if (this.cache.hasOwnProperty(key)) {
      this.size--;
      delete this.cache[key];
      console.log(`The record "${key}" has been removed`);
      return true;
    }
    return false;
  }

  // Fetches a key/val
  fetch(key) {
    if (this.cache.hasOwnProperty(key)) {
      // reset expiry & timeout
      if (this.cache[key].expiry !== null) {
        clearTimeout(this.cache[key].timeout);
        this.cache[key].timeout = setTimeout(() => {
          this.remove(key);
        }, this.cache[key].expiry);
      }
      this.hits++;
      return this.cache[key].value;
    }
    this.misses++;
    console.log(`There is no record for "${key}"`);
    return false;
  }
};

module.exports = Cache;
