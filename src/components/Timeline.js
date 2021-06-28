import React from "react";
import usePhotos from "../hooks/use-photos";
import Post from "./posts";
import Skeleton from "react-loading-skeleton";
function Timeline() {
  const photos = usePhotos();
   console.log("photos", photos);
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
        <p className="text-center text-2xl">
          Follow People to see photos
          <br />
          Please reload the page after following
        </p>
      )}
    </div>
  );
}

export default Timeline;
