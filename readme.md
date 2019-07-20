# Blowfish CLI

### Usage
- Encrypt some text:
```sh
blowfish encrypt -k <encryption_key>
```

- Decrypt blowfish cipher
```sh
blowfish decrypt -k <encryption_key>
```

- Set a default encryption key (so you won't need to pass it as long as you use the same)
```sh
blowfish setkey <encryption_key>
```