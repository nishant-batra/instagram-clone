import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import UserContext from "../../context/user";
import FirebaseContext from "../../context/firebase";
function Actions({ docId, totalLikes, likedPhoto, handleFocus }) {
  const {
    user: { uid: userId = "" },
  } = useContext(UserContext);
  const [toggleLike, setToggleLike] = useState(likedPhoto);
  const [likes, setLikes] = useState(totalLikes);
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const handleToggleLike = async () => {
    setToggleLike((toggleLike) => !toggleLike);
    await firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        likes: toggleLike
          ? FieldValue.arrayRemove(userId)
          : FieldValue.arrayUnion(userId),
      });
    setLikes((likes) => (toggleLike ? likes - 1 : likes + 1));
  };
  return (
    <>
      <div className="flex justify-between p-4">
        <div className="flex">
          <svg
            onClick={handleToggleLike}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 select-none cursor-pointer ${
              toggleLike ? "fill-red text-red-primary" : "text-black-light"
            }`}
            viewBox="0 0 20 20"
            stroke="currentColor"
            fill={`${toggleLike ? "currentColor" : "none"}`}
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 ml-4 text-black-light select-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
        </div>
      </div>
      <div className="p-4 py-0">
        <p className="text-sm font-bold">
          {likes === 1 ? likes + " like" : likes + " likes"}
        </p>
      </div>
    </>
  );
}

export default Actions;
Actions.propTypes = {
  docId: PropTypes.string.isRequired,
  totalLikes: PropTypes.number.isRequired,
  likedPhoto: PropTypes.bool.isRequired,
  handleFocus: PropTypes.func.isRequired,
};
