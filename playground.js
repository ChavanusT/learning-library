// NodeJS implementation of crypto, I'm sure google's
// crypto would work equally well.
var crypto = require("crypto-js");
module.exports = function Ldddd() {
    let clearText = "123456";
    let encryptionKey = crypto.enc.Utf8.parse("P@@Sw0rd");
    let salt = crypto.enc.Base64.parse("S@LT&KEY"); // this is the byte array in .net fiddle

    let iterations = 1000; // https://learn.microsoft.com/en-us/dotnet/api/system.security.cryptography.rfc2898derivebytes?view=netcore-3.1
    let keyAndIv = crypto.PBKDF2(encryptionKey, salt, {
        keySize: 256 / 32 + 128 / 32,
        iterations: iterations,
        hasher: crypto.algo.SHA1,
    }); // so PBKDF2 in crypto is direct in that it
    // always begins at the beginning of the password, whereas the .net
    // implementation offsets by the last length each time .GetBytes() is called
    // so we had to generate a Iv + Salt password and then split it
    let hexKeyAndIv = crypto.enc.Hex.stringify(keyAndIv);

    let key = crypto.enc.Hex.parse(hexKeyAndIv.substring(0, 64));
    let iv = crypto.enc.Hex.parse(
        hexKeyAndIv.substring(64, hexKeyAndIv.length)
    );

    // As you're using Encoding.Unicde in .net, we have to use crypto.enc.Utf16LE here.
    let encryptedStr = crypto.AES.encrypt(
        crypto.enc.Utf16LE.parse(clearText),
        key,
        { iv: iv }
    ).toString();

    console.log(encryptedStr);
};
