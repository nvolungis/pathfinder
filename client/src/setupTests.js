import { configure } from 'enzyme';
import Adapter       from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

let store = {};

const localStorageMock = {
  getItem: function(key) {
    return store[key] || null;
  },

  setItem: function(key, value) {
    store[key] = value.toString();
  },

  removeItem: function(key) {
    delete store[key];
  },

  clear: function() {
    store = {};
  }
};

global.localStorage = localStorageMock;
