const crypto = require('crypto');
const fs = require('fs');

const algorithm = "aes128";
const key = 'fa0b9387dba9fe8a';
const data = 'AES128-data: [0-9][a-z]';

function test() {
    function aesEncrypt(data, key) {
        const cipher = crypto.createCipher(algorithm, key);
        var crypted = cipher.update(data, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    }

    function aesDecrypt(encrypted, key) {
        const decipher = crypto.createDecipher(algorithm, key);
        var decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }

    var encrypted = aesEncrypt(data, key);
    var decrypted = aesDecrypt(encrypted, key);

    console.log('data', data);
    console.log('key', key);
    console.log('encrypted', encrypted);
    console.log('decrypted', decrypted);
    console.log('success', decrypted === data);
}

function createCipher(key, option) {
    option = option || {};
    const _key = crypto.scryptSync(key, 'salt', 16);
    const iv = Buffer.alloc(16, 0);
    return option.encrypt ? crypto.createCipheriv(algorithm, _key, iv) : crypto.createDecipheriv(algorithm, _key, iv);
}

function pipe() {
    fs.createReadStream('./file/m3u8/fileSequence2.ts')
        .pipe(createCipher(key, {encrypt: true}))
        .pipe(fs.createWriteStream('./file/m3u8/fileSequence2_1.ts'));

    fs.createReadStream('./file/m3u8/fileSequence2_1.ts')
        .pipe(createCipher(key, {encrypt: false}))
        .pipe(fs.createWriteStream('./file/m3u8/fileSequence2_2.ts'));
}

function updateFinal() {
    const encryptCipher = createCipher(key, {encrypt: true});
    let encrypted = encryptCipher.update(data, 'utf8', 'hex');
    encrypted += encryptCipher.final('hex');

    const decryptCipher = createCipher(key, {encrypt: false});
    let decrypted = decryptCipher.update(encrypted, 'hex', 'utf8');
    decrypted += decryptCipher.final('utf8');

    console.log('data', data);
    console.log('key', key);
    console.log('encrypted', encrypted);
    console.log('decrypted', decrypted);
    console.log('success', decrypted === data);
}

test();
updateFinal();
// pipe();
