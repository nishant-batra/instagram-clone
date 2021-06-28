import { useEffect, useState, useContext } from "react";
import FirebaseContext from "../context/firebase";
export default function useAuthListener() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    async function userAuth() {
      const listener = await firebase.auth().onAuthStateChanged((authUser) => {
        if (authUser) {
          localStorage.setItem("authUser", JSON.stringify(authUser));
          setUser(authUser);
        } else {
          localStorage.removeItem("authUser");
          setUser(null);
        }
      });
    }
    //to clean up the listener
    userAuth();
  }, [firebase]);

  return { user };
}
