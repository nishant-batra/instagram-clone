import React, { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import PropTypes from "prop-types";
import UserContext from "../../context/user";
import useUser from "../../hooks/use-user";
function Photos({ photos }) {
  //console.log("photo", photos);
  const { user: loggedInUser } = useContext(UserContext);
 // console.log("user", loggedInUser?.uid);
  return (
    <div className="h-16 border-t border-gray-primary mt-12 pt-4">
      <div className="grid grid-cols-3 gap-8 mt-4 mb-12">
        {!photos ? (
          <>
            <Skeleton count={12} width={320} height={400} />
          </>
        ) : photos.length > 0 ? (
          photos.map((photo) => (
            <div key={photo.photoId} className="relative group ">
              <img src={photo.imageSrc} alt={photo.caption} />
              <div className="absolute bottom-0 left-0 bg-gray-200 z-10 w-full justify-evenly items-center h-full bg-black-faded group-hover:flex hidden">
                <p className="flex items-center text-white font-bold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill={
                      photo.likes.includes(loggedInUser?.uid)
                        ? "red"
                        : "currentColor"
                    }
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {photo.likes.length}
                </p>
                <p className="flex items-center text-white font-bold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {photo.comments.length}
                </p>
              </div>
            </div>
          ))
        ) : null}
      </div>
      {photos.length === 0 && (
        <p className="text-center text-2xl">No posts yet</p>
      )}
    </div>
  );
}

export default Photos;
Photos.propTypes = {
  photos: PropTypes.array.isRequired,
};
