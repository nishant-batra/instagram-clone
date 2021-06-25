import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getUserByUsername } from "../services/firebase";
import * as ROUTES from "../constants/routes";
import UserProfile from "../components/profile";
import Header from "../components/Header";
function Profile(props) {
  const { username } = useParams(); //this is becuase profile route is /p/:username;
  const [userExists, setUserExists] = useState(false);
  const [user, setUser] = useState({});
  const history = useHistory();
  useEffect(() => {
    async function checkUserExists() {
      const [doesUserExist] = await getUserByUsername(username);
      if (doesUserExist) {
        setUser(doesUserExist);
        setUserExists(true);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    }
    checkUserExists();
    // console.log("user", user);
  }, [history, username]);
  return userExists ? (
    <div className="bg-gray-background">
      <Header />
      {/* {console.log("user",user)} */}
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={user} />
      </div>
    </div>
  ) : null;
}

export default Profile;
