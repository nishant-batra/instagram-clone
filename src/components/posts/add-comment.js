import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";
function AddComment({ docId, comments, setComments, commentInput }) {
  const [comment, setComment] = useState("");
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const {
    user: { displayName },
  } = useContext(UserContext);

  const handleComment = (e) => {
    e.preventDefault();
    setComments([{ displayName, comment }, ...comments]);
    setComment("");
    return firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ displayName, comment }),
      });
  };
  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={(event) => {
          if (comment.length > 1) return handleComment();
          else event.preventDefault();
        }}
      >
        <input
          aria-label="Post a comment"
          autoComplete="off"
          className="text-sm text-gray-base py-5 mr-3 w-full px-4"
          placeholder="Add Comment..."
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
            return;
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") return handleComment(event);
          }}
          ref={commentInput}
        />
        <button
          className={`text-sm font-bold text-blue-medium ${
            !comment.length && "opacity-25"
          }`}
          type="button"
          disabled={!comment.length}
          onClick={handleComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default AddComment;
AddComment.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object.isRequired,
};
