import { useEffect, useState } from "react";

import { getUserById } from "../services/firebase";
export default function useUser(userId) {
  const [activeUser, setActiveUser] = useState({});
  useEffect(() => {
    async function getUserObjectById(userId) {
      const [user] = await getUserById(userId);
      //  console.log(result);
      setActiveUser(user || {});
    }
    if (userId) {
      getUserObjectById(userId);
    }
  }, [userId]);
  return { user: activeUser };
}
