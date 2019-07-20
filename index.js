const program = require('commander')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})
const Blowfish = require('blowfish-security-lib')
const clipboardy = require('clipboardy')

program
  .action(() => console.log(program.help()))

program
  .command('encrypt')
  .option('-k, -key <key>', 'Give the secret key (if not using default)')
  .description('Encrypt the given string')
  .action((options) => {
    readline.question('Pass the text to encrypt: ', (text) => {
      let bf = new Blowfish(options.Key)
      let encrypted = bf.encrypt(text)

      console.log(`The code is automatically copied to clipboard: ${encrypted}`)
      clipboardy.writeSync(encrypted)

      process.exit();
    })
  });

program
  .command('decrypt')
  .option('-k, -key <key>', 'Give the secret key (if not using default)')
  .description('Decrypt the given string')
  .action((options) => {
    readline.question('Pass the blowfish cipher: ', (text) => {
      let bf = new Blowfish(options.Key)
      let decrypted = bf.decrypt(text)

      console.log(`Decrypted message: ${decrypted}`)

      process.exit();
    })
  })

program.parse(process.argv)

if (!program.args) program.outputHelp();

module.exports = program;