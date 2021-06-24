import React from "react";
import PropTypes from "prop-types";
import { useEffect, useReducer } from "react";
import Header from "./header";
import { getUserByUsername,getPhotosByUsername } from "../../services/firebase";

export default function Profile({ user}) {
    const reducer = (state, newState) => ({ ...state, ...newState }); //basically overwriting the previous state
    const initialState = {
      profile: {},
      photosCollection: [],
      followerCount: 0,
    };
    const [{ propfile, photosColection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(()=>{
      async function getProfileInfo(){
          //const [user]=await  getUserByUsername(user.username);
          const photos=getPhotosByUsername(user.username);
          dispatch({profile:user,photosCollection:photos,followerCount:user.followers.length})
      }
      getProfileInfo();
  },[]);
  return <div>{user.username}</div>;
}
Profile.propTypes={
    user:PropTypes.shape({
        dateCreated:PropTypes.number.isRequired,
        username:PropTypes.string.isRequired,
        emailAddress:PropTypes.string.isRequired,
        followers:PropTypes.array.isRequired,
        following:PropTypes.array.isRequired,
        userId:PropTypes.string.isRequired,
        fullName:PropTypes.string.isRequired,
    })
}