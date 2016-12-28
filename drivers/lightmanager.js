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
      console.log(response);
    });
  }

  convertToPercentage(level) {
    switch (level) {
      case 1:
        return '6.25%';
      case 2:
        return '12.50%';
      case 3:
        return '18.75%';
      case 4:
        return '25%';
      case 5:
        return '31.25%';
      case 6:
        return '37.50%';
      case 7:
        return '43.75%';
      case 8:
        return '50%';
      case 9:
        return '56.25%';
      case 10:
        return '62.50%';
      case 11:
        return '68.75%';
      case 12:
        return '75%';
      case 13:
        return '81.25%%';
      case 14:
        return '87.50%';
      case 15:
        return '93.75%';
      case 16:
        return '100%';
    }
  }


  dim(device, code, address, level) {
    console.log('do http request: ' + this.driver.url + ':' + this.driver.port + '/cmd=' + device + ' ' + code + ' ' + address + ' LEARN ' + level);

    var percentage = convertToPercentage(level);
    http.get({
      host: this.driver.url,
      port: this.driver.port,
      path: '/cmd=' + encodeURIComponent(device + ' ' + code + ' ' + address + ' LEARN ' + percentage)
    }, function (response) {
      console.log(response);
    });
  }
}

module.exports = HttpDriver;

