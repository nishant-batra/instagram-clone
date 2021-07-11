import React, { useState } from "react";
import PropTypes from "prop-types";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import AddComment from "./add-comment";
function Comments({ docId, comments: allComments, posted, commentInput }) {
  const [comments, setComments] = useState(allComments);
  const [displayAllComments, setDisplayAllComments] = useState(0);
  return (
    <>
      {/* {displayAllComments && (
        <AllComments
          comments={comments}
          setDisplayAllComments={setDisplayAllComments}
        />
      )} */}
      <div className="p-4 pt-1 pb-4">
        {comments.length >= 4 && (
          <p
            className="text-sm text-gray-base mb-1 cursor-pointer"
            onClick={() => {
              setDisplayAllComments(!displayAllComments);
              return;
            }}
          >
            {displayAllComments ? "View less comments" : "View all comments"}
          </p>
        )}
        <div className="max-h-80 overflow-y-auto">
          {displayAllComments
            ? comments.map((item) => {
                return (
                  <p
                    key={`${item.comment}-${item.displayName}`}
                    className="mb-1"
                  >
                    <Link to={`/p/${item.displayName}`}>
                      <span className="mr-1 font-bold">{item.displayName}</span>
                    </Link>
                    <span>{item.comment}</span>
                  </p>
                );
              })
            : comments.slice(0, 3).map((item) => {
                return (
                  <p
                    key={`${item.comment}-${item.displayName}`}
                    className="mb-1"
                  >
                    <Link to={`/p/${item.displayName}`}>
                      <span className="mr-1 font-bold">{item.displayName}</span>
                    </Link>
                    <span>{item.comment}</span>
                  </p>
                );
              })}
        </div>
        <p className="text-gray-base uppercase text-xs mt-2">
          {formatDistance(posted, new Date())} ago
        </p>
      </div>
      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </>
  );
}

export default Comments;
Comments.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  posted: PropTypes.number.isRequired,
  commentInput: PropTypes.object.isRequired,
};
