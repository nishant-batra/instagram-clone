import { useEffect, useState, useContext } from "react";
import UserContext from "../context/user";
import { getUserById } from "../services/firebase";
export default function useUser() {
  const { user } = useContext(UserContext);
  const [activeUser, setActiveUser] = useState({});
  useEffect(() => {
    async function getUserObjectById() {
      const [result] = await getUserById(user.uid);
      console.log(result);
      setActiveUser(result);
    }
    if (user?.uid) {
      getUserObjectById();
    }
  }, [user]);
  return { user: activeUser };
}
