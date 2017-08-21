const auth = require('./object-server-auth'),
    realmPromise = auth.realm

realmPromise.then((realm) => {
    console.log("realm: " + realm)

    try {
        realm.write(() => {
            let user = realm.create('User', {id: 'abc123'}, true)
            console.log("Created user " + user)
        })
    } catch (e) {
        console.log("Error on creation " + e)
    }

    console.log("All users:")

    let users = realm.objects('User')
    console.log(users)    
})
