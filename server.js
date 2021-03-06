const fastify = require('fastify')({ logger: true })
const crypto = require('./crypto')
const {HTTP_CODES, HTTP_ERRORS} = require('./httpCodes')

fastify.register(require('fastify-sensible'))

const validateKeyId = keyId => {
    if (!crypto.rsa.isValidKeyId(keyId)) {
        const {statusCode, message} = HTTP_ERRORS.INVALID_KEY_ID;
        throw fastify.httpErrors.createError(statusCode, message);
    }
}

// Generate new RSA key pair
fastify.post('/keys', async (request, reply) => {
    const pair = crypto.rsa.generateKeyPair();
    reply.code(HTTP_CODES.CRYPTO_RSA_GENERATE).send(pair);
})

// Delete an existing RSA key pair
fastify.delete('/keys/:keyId', async (request, reply) => {
    const {keyId} = request.params;

    validateKeyId(keyId);

    const removed = crypto.rsa.deleteKeyPair(keyId);
    reply.code(HTTP_CODES.CRYPTO_RSA_DELETE).send(removed);
})

// List all existing keys IDs
fastify.get('/keys', async (request, reply) => {
    const keyIds = crypto.rsa.getAll();
    reply.code(HTTP_CODES.CRYPTO_RSA_LIST_ALL).send(keyIds);
})

// Sign on a given data using the given key
fastify.post('/signature', async (request, reply) => {
    const {keyId, data} = request.body;

    validateKeyId(keyId);

    const signature = crypto.rsa.signOn(keyId, data);
    reply.code(HTTP_CODES.CRYPTO_RSA_SIGN_ON).send(signature);
})

// Verify the given signature on the given data using the given key
fastify.post('/signature/verify', async (request, reply) => {
    const {keyId, data, signature} = request.body;

    validateKeyId(keyId);

    const isVerified = crypto.rsa.verify(keyId, data, signature);
    reply.code(HTTP_CODES.CRYPTO_RSA_VERIFY).send(isVerified);
})

// Run the server!
const start = async () => {
    try {
        await fastify.listen(3000)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()