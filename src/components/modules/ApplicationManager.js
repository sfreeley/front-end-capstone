const remoteURL = "http://localhost:5002"

export default {
    //user calls
    getUsers() {
       return fetch(`${remoteURL}/users`).then(result => result.json())
    },

    postNewUser(newUserObject) {
        return fetch(`${remoteURL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(newUserObject)
            }).then(data => data.json())
  }
}