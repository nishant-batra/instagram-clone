import React, { useRef } from "react";
import PropTypes from "prop-types";
function Post({ content,username,userLikedPhoto }) {
  //  console.log(content);
  return <div>I am a post</div>;
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
  }),
  username: PropTypes.string.isRequired,
  userLikedPhoto: PropTypes.bool.isRequired,
};
