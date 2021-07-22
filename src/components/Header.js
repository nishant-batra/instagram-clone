import React, {  useState } from "react";
import { useContext } from "react";
import FirebaseContext from "../context/firebase";
import { Link } from "react-router-dom";
import UserContext from "../context/user";
import * as ROUTES from "../constants/routes";
import useUser from "../hooks/use-user";
import { connect } from "react-redux";
import { changeTheme } from "../actions";
function Header(props) {
  const { firebase } = useContext(FirebaseContext);
  const { user: authUser } = useContext(UserContext);
  const [displayPopUp, setDisplayPopUp] = useState(0);
  const { user } = useUser(authUser?.uid);
  //const { dark } = useContext(darkModeContext);
  // const [darkMode, setDarkMode] = useState(useContext(darkModeContext));
  // const [bg, setBg] = useState(darkMode ? "dark" : "white");
  // const [textColor, setTextColor] = useState(darkMode ? "white" : "dark");



  const darkMode=props.theme;
  // console.log("user dark", user.dark);
  //const [borderColor,setBorderColor]=useState(darkMode?'dark':'white');

  const handleDarkMode = async () => {
    await firebase
      .firestore()
      .collection("users")
      .doc(user.docId)
      .update({
        dark: darkMode ? false : true,
      });
    props.dispatch(changeTheme(darkMode));
  };
  const handleSignout = () => {
    setDisplayPopUp(1);
  };
 // console.log("user", user);
  // console.log("header user", response);
  return (
    <>
      {displayPopUp ? (
        <div className="w-full h-full top-0 left-0 fixed bg-black-faded z-50">
          <div className={" w-52 h-36 top-96 left-1/2 -mx-16 shadow-2xl fixed flex flex-col justify-between items-center rounded-2xl opacity-100 "+(darkMode?"bg-dark ":"bg-white")}>
            <div className="m-2 relative top-10">Do you want to Signout?</div>
            <div className="flex w-full justify-around">
              <div
                className=" m-1 p-1 text-blue-medium cursor-pointer"
                onClick={() => {
                  firebase.auth().signOut();
                  setDisplayPopUp(0);
                  return;
                }}
              >
                Yes
              </div>
              <div
                className=" m-1 p-1 text-red-apple cursor-pointer"
                onClick={() => {
                  setDisplayPopUp(0);
                  return;
                }}
              >
                No
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <header
        className={`h-16 bg-${
          darkMode ? "dark" : "white"
        } border-b border-gray-primary mb-8`}
      >
        <div className="container mx-auto max-w-screen-lg h-full">
          <div className="flex justify-between h-full">
            <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
              <h1 className="flex justify-center w-full">
                <Link to={ROUTES.DASHBOARD} aria-label="site logo">
                  <img
                    src="/images/logo.png"
                    alt="gram"
                    className="mt-2 w-6/12"
                  ></img>
                </Link>
              </h1>
            </div>
            <div className=" text-gray-700 text-center flex items-center align-items">
              {authUser ? (
                <>
                  <Link to={ROUTES.DASHBOARD} aria-label="dashboard">
                    <svg
                      className="w-8 h-8 mr-6 text-black-light cursor-pointer "
                      xmlns="http://www.w3.org/2000/svg"
                      //  class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke={darkMode ? "white" : "currentColor"}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </Link>

                  <div className="flex items-center cursor-pointer">
                    <Link to={`/p/${user.username}`} aria-label="user">
                      <img
                        className="rounded-full h-8 w-8 flex mr-6"
                        src={`/images/avatars/${user.username}.jpg`}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/images/avatars/default.png";
                        }}
                        alt={`${user.username}'s profile pic`}
                      />
                    </Link>
                  </div>

                  {darkMode ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 cursor-pointer mr-6"
                      viewBox="0 0 20 20"
                      fill="white"
                      onClick={handleDarkMode}
                    >
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-black-light cursor-pointer mr-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      onClick={handleDarkMode}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  )}
                  <button
                    type="button"
                    title="Sign Out"
                    // onClick={() => firebase.auth().signOut()}
                    onClick={handleSignout}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        firebase.auth().signOut();
                      }
                    }}
                  >
                    <svg
                      className="w-8 h-8 mr-3 text-black-light cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      //   class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke={darkMode ? "white" : "currentColor"}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </button>
                </>
              ) : (
                <>
                  <Link to={ROUTES.LOGIN}>
                    <button
                      className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8 mr-6"
                      type="button"
                    >
                      LOG IN
                    </button>
                  </Link>
                  <Link to={ROUTES.SIGNUP}>
                    <button
                      className="font-bold text-sm rounded text-blue-medium mr-3"
                      type="button"
                    >
                      SIGN UP
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
function mapStateToProps(state) {
  return {
    theme: state.dark,
  };
}
export default connect(mapStateToProps)(Header);
