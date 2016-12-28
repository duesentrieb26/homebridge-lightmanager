'use strict';
const DriverBase = require('./base');
const http       = require('http');

class HttpDriver extends DriverBase {

  constructor(log, config) {
    super(log, config);

    // Create driver.
    this.driver = config.driver;
    console.log(`initialized HttpDriver (config ${ config.driver })`);
  }

  switch(device, code, address, state) {
    console.log(`do http request switch with:` + device + code + address + state);

    http.get({
      host: this.driver.url,
      port: this.driver.port,
      path: '/cmd=' + device + ' ' + code + ' ' + address + (state) ? 'ON' : 'OFF'
    });
  }

  dim(device, code, address, level) {
    console.log(`do http request dim with:` + device + code + address + level);
    //this.driver.dim(address, device, level);
  }
}

module.exports = HttpDriver;

