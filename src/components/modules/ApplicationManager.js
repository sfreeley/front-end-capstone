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
  },

  //medication calls
  getDrugsForUser(sessionUserId) {
    return fetch(`${remoteURL}/drugs/?userId=${sessionUserId}&_expand=user`).then(data => data.json())
  },

  getDrugsAllUsers() {
    return fetch(`${remoteURL}/users/?_embed=drugs`).then(data => data.json())
  },

  getAllDrugs() {
    return fetch(`${remoteURL}/drugs`).then(data => data.json())
  },

  postNewDrug(newDrugObject) {
    return fetch(`${remoteURL}/drugs`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newDrugObject)
      }).then(data => data.json())
      
  }
}