import React, { useContext, useEffect, useState } from "react";
import usePhotos from "../hooks/use-photos";
import Post from "./posts";
import { connect } from "react-redux";
import Skeleton from "react-loading-skeleton";
import LoggedInUserContext from "../context/logged-in-user";
function Timeline(props) {
  const { user } = useContext(LoggedInUserContext);
  const photos = usePhotos(user);
  const darkMode = props.theme;
  return (
    <div className={"container col-span-2" + (darkMode ? " bg-dark" : "")}>
      {!photos ? (
        <>
          <Skeleton count={2} width={"100%"} height={500} className="mb-4" />
        </>
      ) : user?.following?.length === 0 ? (
        <div className="text-center align-bottom h-full	flex flex-col justify-end	 font-bold text-3xl">
          {" "}
          Please follow people to see posts{" "}
        </div>
      ) : photos?.length === 0 ? (
        <div className="text-center align-bottom h-full	flex flex-col justify-end	 font-bold text-3xl">
          {" "}
          Please follow more people to see posts{" "}
        </div>
      ) : (
        photos.map((content) => (
          <Post key={content.docId} content={content} user />
        ))
      )}
    </div>
  );
}
function mapStateToProps(state) {
  return {
    theme: state.dark,
  };
}
export default connect(mapStateToProps)(Timeline);
