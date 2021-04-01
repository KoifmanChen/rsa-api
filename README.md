# RSA-API

## Development
Clone the repository and install all the necessary dependencies

`
$ git clone https://github.com/KoifmanChen/rsa-api.git  
$ cd rsa-api  
$ npm i
`

Start the dev server
`npm start`

## API


Desc | Route | Method | Args
------------ | ------------- | ------------- | -------------
Generate new RSA key pair | **/crypto/rsa/generate** | GET |
Delete an existing RSA key pair | **/crypto/rsa/delete** | POST | *keyId*
Sign on a given data using the given key | **/crypto/rsa/sign-on** | POST | *keyId, data*
Verify the given signature on the given data using the given key | **/crypto/rsa/verify** | POST | *keyId, data, signature*
List all existing keys IDs | **/crypto/rsa/list-all** | GET |
