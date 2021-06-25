import React from "react";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import PropTypes from "prop-types";
import useUser from "../../hooks/use-user";
import { isUserFollowingProfile } from "../../services/firebase";
function Header({
  photosCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    username: profileUsername,
    fullName,
    following = [],
  },
  followerCount,
  setFollowerCount,
}) {
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const { user } = useUser();
  const activeButtonFollow =
    profileUsername && user.username !== profileUsername;
  //  console.log("authUser", user);
  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profileUserId
      );
      setIsFollowingProfile(isFollowing);
    };
    if (user.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user.username, profileUserId]);
  //console.log("puid", profileUserId);
  const handleToggelFollow = () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount + 1 : followerCount - 1,
    });
    console.log("followersCount", followerCount);
  };
  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center">
        {profileUsername && (
          <img
            className="rounded-full h-40 w-40 flex"
            alt={`${profileUsername}'s profile photo`}
            src={`/images/avatars/${profileUsername}.jpg`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/avatars/default.png";
            }}
          />
        )}
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{profileUsername}</p>
          {activeButtonFollow && (
            <button
              className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8 select-none"
              type="button"
              onClick={handleToggelFollow}
            >
              {isFollowingProfile ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
        <div className="container flex mt-4">
                
        </div>
      </div>
    </div>
  );
}

export default Header;
Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
};
