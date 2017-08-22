const auth = require('./object-server-auth'),
    realm_promise = auth.realm_promise,
    Realm = require('realm')

realm_promise.then((realm) => {
    console.log("realm: " + realm)

    try {
        realm.write(() => {
            let user = realm.create('User', {id: 'user3'}, true)
            console.log("Created user " + user)
        })
    } catch (e) {
        console.log("Error on creation " + e)
    }

    console.log("All users:")

    let users = realm.objects('User')
    console.log(users)

    realm.close()
    console.log("Realm closed")
})
.then(() => {
    // Disconnect
    Realm.Sync.User.current.logout()
    console.log("Sync user logged out")
})
.catch((err) => {
    console.log("Error: " + err)
})
