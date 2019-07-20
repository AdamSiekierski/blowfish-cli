const fs = require('fs')

class ConfigController {
  constructor() {
    this.readDefaultKey = this.readDefaultKey.bind(this);
    this.readConfig = this.readConfig.bind(this);
    this.setDefaultKey = this.setDefaultKey.bind(this);
  }

  readDefaultKey() {
    let config = JSON.parse(fs.readFileSync(`${__dirname}/blowfish.config`, 'utf8'));
    return config.defaultKey;
  }

  readConfig() {
    return JSON.parse(fs.readFileSync(`${__dirname}/blowfish.config`, 'utf8'));
  }

  setDefaultKey(key) {
    let config = this.readConfig();
    config.defaultKey = key;
    fs.writeFileSync(`${__dirname}/blowfish.config`, JSON.stringify(config, null, 2))
  }
}

module.exports = new ConfigController();