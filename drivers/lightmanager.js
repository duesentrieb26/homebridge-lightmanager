'use strict';
const DriverBase = require('./base');
const http       = require('http');

class HttpDriver extends DriverBase {

  constructor(log, config) {
    super(log, config);

    // Create driver.
    this.driver = http(config.driver);
    log(`initialized HttpDriver (config ${ config.driver })`);
  }

  switch(address, device, state) {
    log(`do http request switch with:` + address + device + state);
    //this.driver.transmit(address, device, state);
  }

  dim(address, device, level) {
    log(`do http request dim with:` + address + device + level);
    //this.driver.dim(address, device, level);
  }
}

module.exports = HttpDriver;

