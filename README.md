# RSA-API

## Development
Clone the repository and install all the necessary dependencies

`git clone https://github.com/KoifmanChen/rsa-api.git`  

`cd rsa-api`

`npm i`

Start the dev server
`npm start`

## API


Desc | Route | Method | Params
------------ | ------------- | ------------- | -------------
Generate new RSA key pair | **/keys** | POST |
Delete an existing RSA key pair | **/keys/:keyId** | DELETE | *keyId*
List all existing keys IDs | **/keys** | GET |
Sign on a given data using the given key | **/signature** | POST | *keyId, data*
Verify the given signature on the given data using the given key | **/signature/verify** | POST | *keyId, data, signature*
