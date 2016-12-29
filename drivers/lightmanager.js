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
    var onoff = (state === 1) ? 'ON' : 'OFF';

    console.log('do http request: ' + this.driver.url + ':' + this.driver.port + '/cmd=' + device + ' ' + code + ' ' + address + ' LEARN ' + onoff);



    http.get({
      host: this.driver.url,
      port: this.driver.port,
      path: '/cmd=' + encodeURIComponent(device + ' ' + code + ' ' + address + ' LEARN ' + onoff)
    }, function (response) {
      console.log(response.statusCode + ' ' + response.statusMessage);
    });
  }


  dim(device, code, address, level) {

    console.log('do http request: ' + this.driver.url + ':' + this.driver.port + '/cmd=' + device + ' ' + code + ' ' + address + ' LEARN ' + level);

    http.get({
      host: this.driver.url,
      port: this.driver.port,
      path: '/cmd=' + encodeURIComponent(device + ' ' + code + ' ' + address + ' LEARN ' + level)
    }, function (response) {
      console.log(response.statusCode + ' ' + response.statusMessage);
    });
  }
}

module.exports = HttpDriver;

