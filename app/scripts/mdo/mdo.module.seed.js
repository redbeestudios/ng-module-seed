'use strict';

import SuperMdo from './mdo.super.module.seed'

export default class Mdo extends SuperMdo {

  getForTest(value) {

    return value ? `${this.label} ok` : `${this.label} fail` ;
  }
}