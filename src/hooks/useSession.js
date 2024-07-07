import { useContext } from 'react';
import SessionContext from '../context/SessionContext';

const useSession = () => {
  const sessionId = useContext(SessionContext);
  return sessionId;
};

export default useSession;
