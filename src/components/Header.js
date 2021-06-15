import React from "react";
import { useContext } from "react";
import FirebaseContext from "../context/firebase";
import { Link } from "react-router-dom";
import UserContext from "../context/user";
import * as ROUTES from "../constants/routes";
function Header(props) {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8">
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
            {user ? (
              <>
                <Link to={ROUTES.DASHBOARD} aria-label="dashboard">
                  <svg
                    className="w-8 h-8 mr-6 text-black-light cursor-pointer "
                    xmlns="http://www.w3.org/2000/svg"
                    //  class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </Link>
                <div className="flex items-center cursor-pointer">
                  <Link to={`/p/${user.displayName}`} aria-label="user">
                    <img
                      className="rounded-full h-8 w-8 flex mr-6"
                      src={`/images/avatars/${user.displayName}.jpg`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/avatars/default.png";
                      }}
                      alt={`${user.displayName}'s profile pic`}
                    />
                  </Link>
                </div>
                <button
                  type="button"
                  title="Sign Out"
                  onClick={() => firebase.auth().signOut()}
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
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
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
  );
}

export default Header;
