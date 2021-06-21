import React, { useEffect, useState, useContext } from "react";
import UserContext from "../context/user";
import { getPhotos, getUserById } from "../services/firebase";

function usePhotos(props) {
  const [photos, setPhotos] = useState(null);
  const { user } = useContext(UserContext);

  const { uid: userId = "" } = user;
  useEffect(() => {
    async function getTimelinePhotos() {
      const [{ following }] = await getUserById(userId);
      //console.log(userArray)
      // console.log("following", following);
      let followedUserPhotos = [];
      if (following.length > 0) {
        followedUserPhotos = await getPhotos(userId, following);
        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
        //  console.log("followed user photos", followedUserPhotos);
        setPhotos(followedUserPhotos);
      }
    }
    if (userId) {
      getTimelinePhotos();
    }
  }, [user]);
  return photos;
}

export default usePhotos;
