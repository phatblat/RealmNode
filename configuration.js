//const hostname = '127.0.0.1'
const hostname = 'imac.local'

module.exports = {
    user: 'test@log-g.co',
    password: 'password',
    server: 'http://' + hostname + ':9080',
    realm_url: 'realm://' + hostname + ':9080/RealmNode',
}
