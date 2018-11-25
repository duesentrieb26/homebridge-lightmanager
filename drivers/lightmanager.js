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
    let onOff = (state) ? 'ON' : 'OFF';

    const postData = `typ,${device},did,${code},aid,${address},acmd,${onOff}`;
    console.log('do http request: ' + this.driver.url + ':' + this.driver.port + '/control , data => ' + postData);

    const req = http.request({
      hostname: this.driver.url,
      port: this.driver.port,
      path: '/control',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
      },
    });

    req.write(postData);
    req.end();
  }


  dim(device, code, address, level) {

    setTimeout(() => {
      console.log(
        'do http request: ' + this.driver.url + ':' + this.driver.port + '/cmd=' + device + ' ' + code + ' ' + address +
        ' LEARN ' + level);
      http.get({
        host: this.driver.url,
        port: this.driver.port,
        path: '/cmd=' + encodeURIComponent(device + ' ' + code + ' ' + address + ' LEARN ' + level),
      }, function(response) {
        console.log(response.statusCode + ' ' + response.statusMessage);
      });
    }, Math.floor(Math.random() * (2500 - 500) + 500));
  }
}

module.exports = HttpDriver;

