import { expect } from 'chai';

describe('true is truthy and false is falsy', () => {
  it('true is truthy', () => {
    expect(true).to.equal(true);
  });

  it('false is falsy', () => {
    expect(false).to.equal(false);
  });
});
