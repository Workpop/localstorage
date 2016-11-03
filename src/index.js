// Let's test to make sure that localStorage actually works. For example, in
// Safari with private browsing on, window.localStorage exists but actually
// trying to use it throws.
// Accessing window.localStorage can also immediately throw an error in IE (#1291).

const testKey = '_localstorage_test_KEY_BILL_MURRAY';
let localStorage;
let retrieved;


try {
  if (window.localStorage) {
    window.localStorage.setItem(testKey, testKey);
    retrieved = window.localStorage.getItem(testKey);
    window.localStorage.removeItem(testKey);
  }
} catch (e) {
  // ... ignore
}

if (testKey === retrieved) {
  localStorage = {
    getItem(key) {
      return window.localStorage.getItem(key);
    },
    setItem(key, value) {
      window.localStorage.setItem(key, value);
    },
    removeItem(key) {
      window.localStorage.removeItem(key);
    },
  };
}

if (!localStorage) {
  console.error('You are running a browser with no localStorage or userData support. Logging in from one tab will not cause another tab to be logged in.'); // eslint-disable-line no-console
  localStorage = {
    _data: {},

    setItem(key, val) {
      this._data[key] = val;
    },
    removeItem(key) {
      delete this._data[key];
    },
    getItem(key) {
      const value = this._data[key];
      if (value === undefined) {
        return null;
      }

      return value;
    },
  };
}

const localStorageExport = localStorage;

export default localStorageExport;
