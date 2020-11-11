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
    }).then(data => data.json())
  },

  //resource page calls

  //get categories from health.gov API
  getCategories() {
    return fetch("https://health.gov/myhealthfinder/api/v3/itemlist.json?lang=en&type=category").then(data => data.json())
  },

  //get result from dropdown selection categoryId from API
  getCategorySelectionResults(categoryId) {
    return fetch(`https://health.gov/myhealthfinder/api/v3/topicsearch.json?lang=en&categoryId=${categoryId}`).then(data => data.json())
  },

  //get all topics for resource page
  getTopics() {
    return fetch(`${remoteURL}/topics`).then(data => data.json())
  },

  //get topics with all resource details
  getTopicsWithResources() {
    return fetch(`${remoteURL}/resources/?_expand=topic`).then(data => data.json())
  },

  //get pharmacies and user with drugs
  getPharmaciesForDrugs(sessionUserId) {
    return fetch(`${remoteURL}/drugs/?userId=${sessionUserId}&_expand=user&_expand=pharmacy`).then(data => data.json())
  },

  //get all pharmacies
  getAllPharmaciesForUser(sessionUserId) {
    return fetch(`${remoteURL}/pharmacies/?userId=${sessionUserId}`).then(data => data.json())
  },

  //POST new pharmacy
  postNewPharmacy(newPharmacyObject) {
    return fetch(`${remoteURL}/pharmacies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPharmacyObject)
    }).then(data => data.json())

  },

  // //DELETE pharmacy
  // hidePharmacy(pharmacyObject) {
  //   return fetch(`${remoteURL}/pharmacies/${pharmacyObject.id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(pharmacyObject)
  //   }).then(data => data.json())

  // },

  //PUT pharmacy
  editPharmacy(pharmacyObject) {
    return fetch(`${remoteURL}/pharmacies/${pharmacyObject.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pharmacyObject)
    }).then(data => data.json())

  },

  //get pharmacy by id
  getPharmacyById(pharmacyId) {
    return fetch(`${remoteURL}/pharmacies/${pharmacyId}/`).then(data => data.json())
  },


}
