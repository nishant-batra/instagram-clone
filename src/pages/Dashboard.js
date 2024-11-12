import React, { useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/sidebar";
import Timeline from "../components/Timeline";
import useUser from "../hooks/use-user";
import PropTypes from "prop-types";
import LoggedInUserContext from "../context/logged-in-user";
import { connect } from "react-redux";

function Dashboard({ user: loggedInUser, theme }) {
  const { user } = useUser(loggedInUser.uid);
  // console.log("Duser", user);
  useEffect(() => {
    document.title = "Gram";
  }, []);
  return (
    <LoggedInUserContext.Provider value={{ user }}>
      <div className={theme ? "bg-dark text-white" : "bg-gray-background"}>
        <Header />
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg min-h-full">
          <Timeline />
          <Sidebar />
        </div>
      </div>
    </LoggedInUserContext.Provider>
  );
}

function mapStateToProps(state) {
  return {
    theme: state.dark,
  };
}
export default connect(mapStateToProps)(Dashboard);
Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
};
