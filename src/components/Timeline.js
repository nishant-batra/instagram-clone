import React, { useContext } from "react";
import usePhotos from "../hooks/use-photos";
import Post from "./posts";
import Skeleton from "react-loading-skeleton";
import UserContext from "../context/user";
function Timeline(props) {
  const { user } = useContext(UserContext);
  const photos = usePhotos();
  // console.log("photos", photos);
  return (
    <div className="container col-span-2">
      {!photos ? (
        <>
          <Skeleton count={2} width={640} height={500} className="mb-4" />;
        </>
      ) : photos?.length > 0 ? (
        photos.map((content) => (
          <Post key={content.docId} content={content} user />
        ))
      ) : (
        <p className="text-center text-2xl">Follow People to see photos</p>
      )}
    </div>
  );
}

export default Timeline;
