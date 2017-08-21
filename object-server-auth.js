const configuration = require('./configuration'),
    schema = require('./schema'),
    debug = require('debug'),
    Realm = require('realm')

const username = configuration.user,
    password = configuration.password,
    server_url = configuration.server_url,
    realm_url = configuration.realm_url

var synced_realm

if (Realm.Sync.User.current) {
    console.log("Realm user " + Realm.Sync.User.current.identity + " is currently logged in")
} else {
    console.log("Logging into realm object server " + server_url + " as user " + username)

    Realm.Sync.User.login(server_url, username, password, (error, user) => {
        if (error) {
             console.log("Error logging in")
             return
        }

        console.log("Successfully logged in")
    })
}

let config = {
    sync: {
        user: Realm.Sync.User.current,
        url: realm_url,
    },
    schema: [
        schema.UserSchema
    ]
}

// TODO: Try using Promise
// Realm.open(config) -> Promise

// Open the realm
Realm.openAsync(config, (error, realm) => {
    if (error) {
         console.log("Error connecting to realm at url: " + realm_url)
         return
    }

    console.log("Connected to realm at url: " + realm_url)
    // module.exports.realm = realm
})
