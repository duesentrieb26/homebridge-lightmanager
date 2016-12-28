'use strict';
class DriverBase {
  constructor(log, config) {
    this.log    = log;
    this.config = config;
  }

  switch(code, address, value) {
    this.log(`'.switch()' command not implemented by driver`);
  }

  on(code, address) {
    return this.switch(code, address, true);
  }

  off(code, address) {
    return this.switch(code, address, false);
  }

  dim(code, address, value) {
    this.log(`'.dim()' command not implemented by driver`);
  }
}

module.exports = DriverBase;
