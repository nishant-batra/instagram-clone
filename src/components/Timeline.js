import React, { useContext } from "react";
import usePhotos from "../hooks/use-photos";
import Post from "./posts";
import Skeleton from "react-loading-skeleton";
import LoggedInUserContext from "../context/logged-in-user";
function Timeline() {
  const { user } = useContext(LoggedInUserContext);
  //console.log("Tuser", user);
  const photos = usePhotos(user);
  // console.log("photos", photos);
  return (
    <div className="container col-span-2">
      {!photos ? (
        <>
          <Skeleton count={2} width={640} height={500} className="mb-4" />
        </>
      ) : (
        photos.map((content) => (
          <Post key={content.docId} content={content} user />
        ))
      )}
    </div>
  );
}

export default Timeline;
