const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

const private_key = secp.utils.randomPrivateKey();

const public_Key = secp.getPublicKey(private_key);
console.log(toHex(private_key), "private");
console.log(toHex(public_Key), "public");
