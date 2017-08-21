const config = require('./configuration'),
    debug = require('debug'),
    Realm = require('realm')

const username = config.user,
    password = config.password,
    serverUrl = config.server,
    questServerUrl = config.questserver

if (Realm.Sync.User.current) {
    console.log("Realm user " + Realm.Sync.User.current.identity + " is currently logged in")
} else {
    console.log("Logging into realm object server " + serverUrl + " as user " + username)

    Realm.Sync.User.login(serverUrl, username, password, (error, user) => {
        if (error) {
             console.log("Error logging in")
             return
        }

        console.log("Successfully logged in")
    })
}
