const configuration = require('./configuration'),
    schema = require('./schema'),
    debug = require('debug'),
    Realm = require('realm')

const username = configuration.user,
    password = configuration.password,
    server_url = configuration.server_url,
    realm_url = configuration.realm_url

module.exports.realm_promise = new Promise((resolve, reject) => {
    if (!Realm.Sync.User.current) {
        // Log in when not currently logged in.
        console.log("Logging into realm object server " + server_url + " as user " + username)

        Realm.Sync.User.login(server_url, username, password, (error, user) => {
            if (error) {
                 console.log("Error logging in")
                 reject("Error logging in")
                 return
            }

            console.log("Successfully logged in")
            resolve(openRealm(Realm.Sync.User.current))
        })
        return
    }

    console.log("Realm user " + Realm.Sync.User.current.identity + " is currently logged in")
    resolve(openRealm(Realm.Sync.User.current))
})

function openRealm(user) {
    let config = {
        sync: {
            user: user,
            url: realm_url,
        },
        schema: [
            schema.UserSchema
        ]
    }

    // Open the realm
    // synchronously
    // module.exports.realm = new Realm(config)

    // asynchronously
    // Realm.openAsync(config, (error, realm) => {
    //     if (error) {
    //          console.log("Error connecting to realm at url: " + realm_url)
    //          return
    //     }
    //
    //     console.log("Connected to realm at url: " + realm_url)
    //     module.exports.realm = realm
    // })

    // as a Promise
    return Realm.open(config)
}
