import React, { useState, useEffect } from 'react';
import ApplicationViews from "./ApplicationViews";
import ApplicationManager from "./components/modules/ApplicationManager";
import { currentDateTime } from "./components/modules/helperFunctions";
import { calculateNextRefill } from "./components/modules/helperFunctions";
import './App.css';

const TrackRx = () => {
  const isAuthenticated = () => sessionStorage.getItem("user") !== null;

  const [hasUser, setHasUser] = useState(isAuthenticated());

  const setUser = user => {
    sessionStorage.setItem("user", JSON.stringify(user));
    setHasUser(isAuthenticated());
  };



  return (

    <div className="applicationViews">
      <ApplicationViews
        hasUser={hasUser}
        setUser={setUser}
      />
    </div>

  )

}


export default TrackRx;
