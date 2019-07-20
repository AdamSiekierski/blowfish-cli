const program = require('commander')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})
const Blowfish = require('blowfish-security-lib')
const clipboardy = require('clipboardy')
const ConfigController = require('./configController')

program
  .action(() => console.log(program.help()))

program
  .command('encrypt')
  .option('-k, -key <key>', 'Give the secret key (if not using default)')
  .description('Encrypt the given string')
  .action((options) => {
    let key = options.Key || ConfigController.readDefaultKey();

    if (!(key === '')) {
      readline.question('Pass the text to encrypt: ', (text) => {
        let bf = new Blowfish(key)
        let encrypted = bf.encrypt(text)

        console.log(`The code is automatically copied to clipboard: ${encrypted}`)
        clipboardy.writeSync(encrypted)

        process.exit();
      })
    } else {
      console.log('Pass a key, or set a default')

      process.exit();
    }
  });

program
  .command('decrypt')
  .option('-k, -key <key>', 'Give the secret key (if not using default)')
  .description('Decrypt the given string')
  .action((options) => {
    let key = options.Key || ConfigController.readDefaultKey();

    if (!(key === '')) {
      readline.question('Pass the blowfish cipher: ', (text) => {
        let bf = new Blowfish(key)
        let decrypted = bf.decrypt(text)

        console.log(`Decrypted message: ${decrypted}`)

        process.exit();
      })
    } else {
      console.log('Pass a key, or set a default')

      process.exit();
    }
  })

program
  .command('setkey <key>')
  .description('Set default key for encryption and decryption')
  .action((key) => {
    ConfigController.setDefaultKey(key)
    console.log(`Default key set succesfully to: ${key}`)

    process.exit()
  })

program.parse(process.argv)

if (program.args.length == 0) {
  program.outputHelp();
  process.exit();
}

module.exports = program;