'use strict';
const DriverBase = require('./base');
const KaKu       = require('kaku-rpi');

class RaspberryPiDriver extends DriverBase {

  constructor(log, config) {
    super(log, config);

    // Create driver.
    this.driver = KaKu(config.driver.pin);
    log(`initialized RPi driver (pin ${ config.driver.pin })`);
  }

  switch(device, code, address, state) {
    this.driver.transmit(code, address, state);
  }

  dim(device, code, address, level) {
    this.driver.dim(code, address, level);
  }
}

module.exports = RaspberryPiDriver;
