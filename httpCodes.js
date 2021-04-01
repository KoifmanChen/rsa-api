exports.HTTP_CODES = {
    CRYPTO_RSA_GENERATE: 201,
    CRYPTO_RSA_DELETE: 204,
    CRYPTO_RSA_SIGN_ON: 200,
    CRYPTO_RSA_VERIFY: 200,
    CRYPTO_RSA_LIST_ALL: 200,
}

exports.HTTP_ERRORS = {
    INVALID_KEY_ID: {
        statusCode : 400,
        message: 'Invalid keyId'
    }
}