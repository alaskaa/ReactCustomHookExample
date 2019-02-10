import React, { useState, useEffect } from "react";
import AppWrapper from "./AppWrapper";

// Custom Hook Example by Robin Wieruch
// https://www.robinwieruch.de/react-hooks/

/* Extract the useEffect hook into own useOffline Custom Hook
   which you can reuse later at any time!

-- to use the custom hook, we need to return the value
   of the hook at the end */
const useOffline = () => {
  const [isOffline, setIsOffline] = useState(false);

  const onOffline = () => {
    setIsOffline(true);
  };

  const onOnline = () => {
    setIsOffline(false);
  };

  /* useEffect hook for controlling side effect of state
  adds and removes listeners that check if device is online or not
  
  -- listeners only set up once on mount and cleaned up on unmount
  (can be seen by empty parantheses */
  useEffect(() => {
    window.addEventListener("offline", onOffline);
    window.addEventListener("online", onOnline);

    return () => {
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("online", onOnline);
    };
  }, []);

  /* return value of your custom hook here to use as custom hook */
  return isOffline;
};

const App = () => {
  const isOffline = useOffline();

  if (isOffline) {
    return (
      <AppWrapper>
        <h1>React Custom Hook Example</h1>
        <div> Sorry, you are offline</div>
      </AppWrapper>
    );
  }
  return (
    <AppWrapper>
      <h1>React Custom Hook Example</h1>
      <div> Sorry, you are online</div>
    </AppWrapper>
  );
};

export default App;
