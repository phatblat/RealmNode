const auth = require('./object-server-auth'),
    realm_promise = auth.realm_promise,
    Realm = require('realm')

realm_promise.then((realm) => {
    console.log("realm: " + realm)

    try {
        realm.write(() => {
            let user = realm.create('User', {id: 'user4', name: 'User Four'}, true)
            console.log("Created user " + user)
        })
    } catch (e) {
        console.log("Error on creation " + e)
    }

    return realm
})
.then((realm) => {
    let users = realm.objects('User')
    console.log("All users:\n" + users)
    return realm
})
.then((realm) => {
    realm.close()
    console.log("Realm closed")
})
.then(() => {
    // Disconnect
    Realm.Sync.User.current.logout()
    console.log("Sync user logged out")
    process.exit()
})
.catch((error) => {
    console.log(error)
    process.exit(1)
})
