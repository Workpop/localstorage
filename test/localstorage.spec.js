import { expect } from 'chai';
import localStorage from '../src';

describe('LocalStorage', function () {
  it('should store value that is set', function () {
    localStorage.setItem('key', 'value');
    expect(localStorage.getItem('key')).to.eql('value');
    localStorage.removeItem('key');
    expect(localStorage.getItem('key')).to.eql(null);
  });
});
