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
    console.log(`do http request: ` + this.driver.url + ':' + this.driver.port + '/cmd=' + device + ' ' + code + ' ' + address + ' LEARN ' + (state) ? 'ON' : 'OFF');

    http.get({
      host: this.driver.url,
      port: this.driver.port,
      path: '/cmd=' + device + ' ' + code + ' ' + address + ' LEARN ' + (state) ? 'ON' : 'OFF'
    }, function (response) {
      console.log(response);
    });
  }

  dim(device, code, address, level) {
    console.log(`do http request dim with:` + device + code + address + level);

    http.get({
      host: this.driver.url,
      port: this.driver.port,
      path: '/cmd=' + device + ' ' + code + ' ' + address + ' LEARN ' + level
    }, function (response) {
      console.log(response);
    });
  }
}

module.exports = HttpDriver;

