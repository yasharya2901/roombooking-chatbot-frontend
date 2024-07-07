import React, {createContext, useState, useEffect} from 'react'
import {v4 as uuidv4} from 'uuid'

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const [sessionId, setSessionId] = useState('');
  
    useEffect(() => {
      const newSessionId = uuidv4();
      setSessionId(newSessionId);
    }, []);
  
    return (
      <SessionContext.Provider value={sessionId}>
        {children}
      </SessionContext.Provider>
    );
  };
  
  export default SessionContext;