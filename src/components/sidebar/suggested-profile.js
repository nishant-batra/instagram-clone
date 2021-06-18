import React from "react";
import PropTypes from "prop-types";
function SuggestedProfile({ userDocId, username, profileId, userId }) {
  return (
    <div>
      <p>i am suggested {username}</p>
      <div>hello</div>
    </div>
  );
}

export default SuggestedProfile;
SuggestedProfile.propTypes = {
  userDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};
