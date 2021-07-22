import React, { useRef } from "react";
import PropTypes from "prop-types";
import Header from "./header";
import Image from "./image";
import Actions from "./actions";
import Footer from "./footer";
import Comments from "./comments";
import {connect} from "react-redux";
function Post(props) {
  // console.log(content);
  const commentInput = useRef(null);
  const{content}=props;
  const darkMode=props.theme;
  const handleFocus = () => {
    commentInput.current.focus();
  };
  return (
    <div className={"rounded col-span-4 border border-gray-primary mb-8"+(darkMode?" bg-dark text-white":" bg-white")}>
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
function mapStateToProps(state) {
  return {
    theme: state.dark,
  };
}

export default connect(mapStateToProps)(Post);
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
