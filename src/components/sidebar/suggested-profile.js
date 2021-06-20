import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { updateFollower, updateFollowing } from "../../services/firebase";
function SuggestedProfile({
  userDocId,
  suggestedProfileId,
  suggestedUsername,
  suggestedUserDocId,
  userId,
}) {
  const [followed, setFollowed] = useState(false);
  async function handleFollow() {
    setFollowed(true);
    await updateFollower(suggestedProfileId, suggestedUserDocId, userId);
    await updateFollowing(userId, userDocId, suggestedProfileId);
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
          src={`/images/avatars/${suggestedUsername}.jpg`}
          alt="suggestions profile pic"
        />
        <Link to={`/p/${suggestedUsername}`}>
          <p className="font-bold test-sm">{suggestedUsername}</p>
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
  suggestedUsername: PropTypes.string.isRequired,
  suggestedProfileId: PropTypes.string.isRequired,
  suggestedUserDocId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};
