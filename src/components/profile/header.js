import React, { useContext } from "react";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import PropTypes from "prop-types";
import useUser from "../../hooks/use-user";
import {
  isUserFollowingProfile,
  updateFollower,
  updateFollowing,
} from "../../services/firebase";
import UserContext from "../../context/user";
import useAuthListener from "../../hooks/use-auth-listener";
function Header({
  photosCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    username: profileUsername,
    fullName,
    following,
    followers,
  },
  followerCount,
  setFollowerCount,
}) {
  const { user: authUser } = useAuthListener();
  //console.log("authUser", authUser);
  const { user: loggedInUser } = useContext(UserContext);
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const { user } = useUser(loggedInUser?.uid);
  const activeButtonFollow =
    authUser &&
    profileUsername &&
    user.username !== profileUsername &&
    user.username;
  //  console.log("authUser", user);
  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profileUserId
      );
      setIsFollowingProfile(isFollowing);
    };
    if (loggedInUser && user.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [authUser, user, profileUsername,user.following]);
  //console.log("puid", profileUserId);
  const handleToggelFollow = async () => {
    await updateFollower(profileUserId, profileDocId, user.userId);
    await updateFollowing(user.userId, user.docId, profileUserId);
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    });
    // console.log("followersCount", followerCount);
  };
  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center">
        {profileUsername && (
          <img
            className="rounded-full h-40 w-40 flex"
            alt={`${profileUsername}'s profile pic`}
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
          {followers === undefined || following === undefined ? (
            <Skeleton count={1} height={24} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">
                  {photosCount} {photosCount === 1 ? "Photo" : "Photos"}{" "}
                </span>
              </p>
              <p className="mr-10">
                <span className="font-bold">
                  {followerCount}{" "}
                  {followerCount === 1 ? "Follower" : "Followers"}
                </span>
              </p>
              <p className="mr-10">
                <span className="font-bold">{following.length} Following</span>
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">
            {!fullName ? <Skeleton count={1} height={24} /> : fullName}
          </p>
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
