'use strict';

import chai from 'chai';
const expect = chai.expect;

import { helloWorldLogic } from './hello-world.js';

describe('helloWorldLogic reverses a string', () => {
  it('"toads" -> "sdaot"', () => {
    expect(helloWorldLogic('toads')).to.equal('sdaot');
  });
  it('"sdaot" -> "toads"', () => {
    expect(helloWorldLogic('sdaot')).to.equal('tods');
  });
});
