const crypto = require("crypto");
const rijndael = require("rijndael-js");
function CDS() {
    let passwordHash = "P@@Sw0rd";
    let saltKey = "S@LT&KEY";
    let vIKey = "@1B2c3D4e5F6g7H8";
    let encrypt = crypto.pbkdf2Sync(
        new Buffer.from(passwordHash),
        new Buffer.from(saltKey, "ascii"),
        1000,
        32,
        "sha1"
    );

    console.log(Uint8Array.from(encrypt));
    const keyByte = Buffer.from(encrypt).toString("base64");
    console.log(keyByte);
    let cipher = crypto.createCipheriv(
        "aes-256-cbc",
        encrypt,
        Buffer.from(vIKey, "ascii")
    );
    let text = "1";
    let cipherEncrypt = cipher.update(text, "utf-8", "base64");
    //cipher.setAutoPadding(false);
    cipherEncrypt += cipher.final("base64");
    console.log(cipherEncrypt);
}

module.exports = CDS;
