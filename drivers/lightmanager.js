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
    var percentage = '50%';

    switch (level) {
      case 0:
        percentage = '0';
        break;
      case 1:
        percentage = '12.50%';
        break;
      case 2:
        percentage = '18.75%';
        break;
      case 3:
        percentage = '25%';
        break;
      case 4:
        percentage = '31.25%';
        break;
      case 5:
        percentage = '37.50%';
        break;
      case 6:
        percentage = '43.75%';
        break;
      case 7:
        percentage = '50%';
        break;
      case 8:
        percentage = '56.25%';
        break;
      case 9:
        percentage = '62.50%';
        break;
      case 10:
        percentage = '68.75%';
        break;
      case 11:
        percentage = '75%';
        break;
      case 12:
        percentage = '81.25%%';
        break;
      case 13:
        percentage = '87.50%';
        break;
      case 14:
        percentage = '93.75%';
        break;
      case 15:
        percentage = '100%';
        break;
    }

    console.log('do http request: ' + this.driver.url + ':' + this.driver.port + '/cmd=' + device + ' ' + code + ' ' + address + ' LEARN ' + percentage);

    http.get({
      host: this.driver.url,
      port: this.driver.port,
      path: '/cmd=' + encodeURIComponent(device + ' ' + code + ' ' + address + ' LEARN ' + percentage)
    }, function (response) {
      console.log(response.statusCode + ' ' + response.statusMessage);
    });
  }
}

module.exports = HttpDriver;

