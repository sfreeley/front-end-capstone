const remoteURL = "http://localhost:5002"

export default {
    //user calls

    //get all users from database
    getUsers() {
       return fetch(`${remoteURL}/users`).then(result => result.json())
    },

    //adding new user upon registration 
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
  
  //get user specific list of drugs based of session storage userId
  getDrugsForUser(sessionUserId) {
    return fetch(`${remoteURL}/drugs/?userId=${sessionUserId}&_expand=user`).then(data => data.json())
  },

  getDrugsOneUser(id) {
    return fetch(`${remoteURL}/users/${id}?_embed=drugs`).then(data => data.json())
  },

  //get all the drugs in list regardless of user
  getAllDrugs() {
    return fetch(`${remoteURL}/drugs`).then(data => data.json())
  },

  //get drug by drugId
  getDrugById(id) {
    return fetch(`${remoteURL}/drugs/${id}`).then(data => data.json())
  },

  //get drug by drugId specific to userId that takes the drug
  getUserDrugById(drugId) {
    return fetch(`${remoteURL}/drugs/${drugId}/?_expand=user`).then(data => data.json())
  },

  //search in database for drugs specific to userId based on json search functionality (q)
  getSearchResults(sessionUserId, userSearchTerm) {
    return fetch(`${remoteURL}/drugs/?userId=${sessionUserId}&q=${userSearchTerm}`).then(data => data.json())
  },

  //posting new drug
  postNewDrug(newDrugObject) {
    return fetch(`${remoteURL}/drugs`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newDrugObject)
      }).then(data => data.json())
      
  },

  //editing drug
  editDrug(drugObject) {
    return fetch(`${remoteURL}/drugs/${drugObject.id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(drugObject)
      }).then(data => data.json())
      
  },


  //deleting drug
  deleteDrug(id) {
    return fetch(`${remoteURL}/drugs/${id}`, {
        method: "DELETE"
    }).then(result => result.json())
},

//getting user's with resources
getUserResources() {
  return fetch(`${remoteURL}/resources?_expand=user`).then(data => data.json())
},

getAllResources() {
  return fetch(`${remoteURL}/resources`).then(data => data.json())
}
}
