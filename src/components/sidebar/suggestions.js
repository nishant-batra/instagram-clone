import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../context/user";
import { getUserSuggestions } from "../../services/firebase";
import Skeleton from "react-loading-skeleton";
import PropTypes from "prop-types";
import SuggestedProfile from "./suggested-profile";
function Suggestions(props) {
  const [profiles, setProfiles] = useState(null);
  useEffect(() => {
    async function getSuggestions() {
      const suggestions = await getUserSuggestions(
        props.following,
        props.userId
      );
      if (props.userId) {
        setProfiles(suggestions);
      }
    }

    getSuggestions(props.following);
  }, [props.following, props.userId]);
  console.log("profile", profiles);
  return !profiles ? (
    <Skeleton count={1} height={150} className="mt-5" />
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions for you </p>
      </div>
      <div>
        {profiles.map((profile) => {
          return (
            <SuggestedProfile
              key={profile.docId}
              userDocId={profile.docId}
              username={profile.username}
              profileId={profile.userId}
              userId={props.userId}
            />
          );
        })}
      </div>
    </div>
  ) : null;
}

export default Suggestions;
Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
};
