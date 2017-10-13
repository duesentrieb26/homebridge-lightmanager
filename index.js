'use strict';
const path = require('path');

let Service, Characteristic;

module.exports = homebridge => {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerPlatform('homebridge-lightmanager', 'LightManager', KaKuPlatform);
}

class KaKuPlatform {

  constructor(log, config) {
    this.log = log = log.bind(log, '[homebridge-lightmanager]');
    this.config = config;

    // Load driver module.
    let driver = config.driver;
    try {
      let Driver = require(path.resolve(__dirname, 'drivers', driver.type));
      this.log(`using driver '${ driver.type }'`);
      // Instantiate driver.
      this.driver = new Driver(log, config);
    } catch (e) {
      throw Error(`Unable to load driver '${ driver.type }': ${ e.message }`);
    }
  }

  accessories(callback) {
    return callback((this.config.accessories || []).map(acc => {
      acc.type = acc.type || 'Outlet';
      // Validate type.
      if (!Service[acc.type]) {
        throw Error(`Unknown device type '${ acc.type }'`);
      }
      this.log(`adding ${ acc.type.toLowerCase() } '${ acc.name }' (code = ${ acc.code }, address = ${ acc.address })`);
      return new KaKuAccessory(acc, this.driver, this.log);
    }));
  }

}

class KaKuAccessory {

  constructor(config, driver, log) {
    this.name = config.name; // needs to be set
    this.service = new Service[config.type](config.name);
    let learn = true;

    if (config.dimmable) {
      this.service.getCharacteristic(Characteristic.Brightness).on('set', (level, callback) => {

        // Convert 0-100 (Homekit) to 6.25% steps in KAKU.
        level = (Math.ceil(((level / 100) * 16)) * 6.25).toString() + '%';

        // Dim the device.
        log(`dimming ${ config.type.toLowerCase() } '${ config.name }' (code = ${ config.code }, address = ${ config.address }) to level ${ level }`);
        driver.dim(config.device || '', config.code, config.address, level);

        return callback();
      });
    }

    this.service.getCharacteristic(Characteristic.On).on('set', (value, callback) => {

      // Old style
      if (config.oldStyle) {
        learn = false;
      }

      if(config.dimmable) {
        return callback;
      }

      log(`switching ${ config.type.toLowerCase() } '${ config.name }' (code = ${ config.code }, address = ${ config.address }) ${ value ? 'on' : 'off' }`);
      driver.switch(config.device || '', config.code, config.address, value, learn, config.dimmable);
      return callback();
    });

  }

  getServices() {
    return [this.service];
  }

}
