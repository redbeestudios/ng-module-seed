'use strict';

import Mdo from 'scripts/mdo/mdo.module.seed.js';

describe('suite Mdo',() => {

  it('unit test case on true condition', () => {

    let mdo = new Mdo();

    expect(mdo.getForTest(true)).toEqual('test ok')

  });

  it('unit test case on false condition', () => {

    let mdo = new Mdo();

    expect(mdo.getForTest(false)).toEqual('test fail')

  });

});