import { useEffect, useState } from "react";
import { getPhotos } from "../services/firebase";

function usePhotos(user) {
  const [photos, setPhotos] = useState(null);
  const [req, setReq] = useState(false);
  useEffect(() => {
    async function getTimelinePhotos() {
      if (user?.following?.length > 0) {
        let followedUserPhotos = await getPhotos(user.userId, user.following);
        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
        setReq(true);
        setPhotos(followedUserPhotos);
      } else setPhotos([]);
    }
    getTimelinePhotos();
  }, [user?.userId, user?.following]);
  return req === true ? photos : null;
}

export default usePhotos;
