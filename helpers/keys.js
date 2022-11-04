import { createPrivateKey, createPublicKey, generateKeyPairSync } from 'crypto'

const {publicKey, privateKey } = generateKeyPairSync('ed25519', 
{
modulusLength: 4096,
publicKeyEncoding: {
type: 'spki',
format: 'pem'
},
privateKeyEncoding: {
type: 'pkcs8',
format: 'pem',
cipher: 'aes-256-cbc',
passphrase: ''
}
});
//generate key Object
export const privateKeyObject = createPrivateKey({  
    key: privateKey,
    format: "pem",
    type: "pkcs1",
    passphrase: "",
    encoding: "utf-8"
});

export const publicKeyObject = createPublicKey(privateKeyObject)
