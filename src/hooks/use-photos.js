import { useEffect, useState } from "react";
import { getPhotos } from "../services/firebase";

function usePhotos(user) {
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    async function getTimelinePhotos() {
      //console.log(userArray)
      // console.log("following", following);
      // console.log("user", user);

      if (user?.following?.length > 0) {
        let followedUserPhotos = await getPhotos(user.userId, user.following);
        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
        //  console.log("followed user photos", followedUserPhotos);
        setPhotos(followedUserPhotos);
      } else setPhotos([]);
    }
    getTimelinePhotos();
  }, [user?.userId]);
  return photos;
}

export default usePhotos;
