'use strict';
const DriverBase = require('./base');
const http = require('http');

class HttpDriver extends DriverBase {

  constructor(log, config) {
    super(log, config);

    // Create driver.
    this.driver = config.driver;
    console.log(`initialized HttpDriver (config ${ config.driver })`);
  }

  switch(device, code, address, state, learn, dimmable) {

    console.log('Switch ... ', device, code, address, state, learn, dimmable);

    let onoff = (state) ? 'ON' : 'OFF';

    if (dimmable) {
      onoff = (state) ? '100%' : '0%';
    }
    let learnable = (learn) ? ' LEARN ' : ' DIP ';

    console.log('do http request: ' + this.driver.url + ':' + this.driver.port + '/cmd=' + device + ' ' + code + ' ' + address + learnable + onoff);

    setTimeout(() => {
      http.get({
        host: this.driver.url,
        port: this.driver.port,
        path: '/cmd=' + encodeURIComponent(device + ' ' + code + ' ' + address + learnable + onoff)
      }, function (response) {
        console.log(response.statusCode + ' ' + response.statusMessage);
      })
    }, Math.floor(Math.random() * (4000 - 50) + 50));
  }

  dim(device, code, address, level) {

    console.log('do http request: ' + this.driver.url + ':' + this.driver.port + '/cmd=' + device + ' ' + code + ' ' + address + ' LEARN ' + level);

    setTimeout(() => {
      http.get({
        host: this.driver.url,
        port: this.driver.port,
        path: '/cmd=' + encodeURIComponent(device + ' ' + code + ' ' + address + ' LEARN ' + level)
      }, function (response) {
        console.log(response.statusCode + ' ' + response.statusMessage);
      })
    }, Math.floor(Math.random() * (4000 - 50) + 50));
  }
}

module.exports = HttpDriver;

