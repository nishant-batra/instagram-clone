import React, { useRef } from "react";
import PropTypes from "prop-types";
import Header from "./header";
import Image from "./image";
import Actions from "./actions";
import Footer from "./footer";
import Comments from "./comments";
function Post({ content }) {
  // console.log(content);
  const commentInput = useRef(null);
  const handleFocus = () => {
    commentInput.current.focus();
  };
  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-8">
      <Header username={content.username} />
      <Image src={content.imageSrc} caption={content.caption} />
      <Actions
        docId={content.docId}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}
      />
      <Footer username={content.username} caption={content.caption} />
      <Comments
        docId={content.docId}
        comments={content.comments}
        commentInput={commentInput}
        posted={content.dateCreated}
      />
    </div>
  );
}

export default Post;
Post.propTypes = {
  content: PropTypes.shape({
    imageSrc: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,

    likes: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    dateCreated: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    userLikedPhoto: PropTypes.bool.isRequired,
  }),
};
