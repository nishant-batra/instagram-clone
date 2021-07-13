import React from "react";
import PropTypes from "prop-types";
import { useEffect, useReducer } from "react";
import Header from "./header";
import Photos from "./photos";
import { getPhotosByUsername } from "../../services/firebase";

export default function Profile({ user }) {
  //console.log("profile user", user);
  const reducer = (state, newState) => ({ ...state, ...newState }); //basically overwriting the previous state
  const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0,
  };
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(() => {
    async function getProfileInfo() {
      //const [user]=await  getUserByUsername(user.username);
      let photos = null;
      photos = await getPhotosByUsername(user.username);
      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length,
      });
    }
    getProfileInfo();
  }, [user]);
  return (
    <>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <Photos photos={photosCollection} />
    </>
  );
}
Profile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    emailAddress: PropTypes.string.isRequired,
    followers: PropTypes.array.isRequired,
    following: PropTypes.array.isRequired,
    userId: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
  }),
};
