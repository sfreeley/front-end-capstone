import React, { useState } from 'react';
import ApplicationViews from "./ApplicationViews";
import './App.css';

const TrackRx = () => {
  const isAuthenticated = () => sessionStorage.getItem("user") !== null;

  const [hasUser, setHasUser] = useState(isAuthenticated());

  const setUser = user => {
    sessionStorage.setItem("user", JSON.stringify(user));
    setHasUser(isAuthenticated());
  };

 
  const clearUser = () => {
      sessionStorage.clear();
      setHasUser(isAuthenticated())
  }

  return (
   
    
    <div className="applicationViews">
    <ApplicationViews hasUser={hasUser} setUser={setUser} clearUser={clearUser} />
    </div>

 
    
  )

}
  

export default TrackRx;
