import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { updateFollower, updateFollowing } from "../../services/firebase";
function SuggestedProfile({ userDocId, username, profileId, userId, docId }) {
  const [followed, setFollowed] = useState(false);
  async function handleFollow() {
    console.log("clicked");
    setFollowed(true);
    await updateFollower(profileId, userDocId, userId);
    await updateFollowing(userId, docId, profileId);
  }
  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-8 flex mr-3"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/avatars/default.png";
          }}
          src={`/images/avatars/${username}.jpg`}
          alt="suggestions profile pic"
        />
        <Link to={`/p/${username}`}>
          <p className="font-bold test-sm">{username}</p>
        </Link>
      </div>
      <div>
        <button
          className="text-xs font-bold text-blue-medium"
          type="button"
          onClick={handleFollow}
        >
          follow
        </button>
      </div>
    </div>
  ) : null;
}

export default SuggestedProfile;
SuggestedProfile.propTypes = {
  userDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};
