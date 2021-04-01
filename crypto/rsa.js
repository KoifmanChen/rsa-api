const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const keyPairsRSA = {};

/**
 * Generate new RSA key pair
 * @returns {PromiseLike<ArrayBuffer>}
 */
const generateKeyPair = () => {
    const keyId = uuidv4();

    keyPairsRSA[keyId] = crypto.generateKeyPairSync("rsa", {
        modulusLength: 512, //2048,
        publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
    });

    return keyId;
}

/**
 * Delete an existing RSA key pair
 * @param keyId
 * @returns {boolean}
 */
const deleteKeyPair = keyId => {
    if (keyPairsRSA[keyId]) {
        delete keyPairsRSA[keyId];
        return true;
    }
    return false;
}

const isValidKeyId = keyId => !!keyPairsRSA[keyId];

/**
 * Sign on a given data using the given key
 * @param keyId
 * @param data
 * @returns {string}
 */
const signOn = (keyId, data) => {
    const {privateKey} = keyPairsRSA[keyId];

    const signer = crypto.createSign('SHA256');
    signer.update(data);
    signer.end();
    return signer.sign(privateKey, 'base64');
}

/**
 * Verify the given signature on the given data using the given key
 * @param keyId
 * @param data
 * @param signature
 * @returns {*}
 */
const verify = (keyId, data, signature) => {
    const {publicKey} = keyPairsRSA[keyId];

    const verifier = crypto.createVerify('SHA256');
    verifier.update(data);
    verifier.end();
    return verifier.verify(publicKey, signature, 'base64');
}

/**
 * List all existing keys IDs
 * @returns {string[]}
 */
const getAll = () => Object.keys(keyPairsRSA);

module.exports = {
    generateKeyPair,
    deleteKeyPair,
    signOn,
    verify,
    getAll,
    isValidKeyId
}