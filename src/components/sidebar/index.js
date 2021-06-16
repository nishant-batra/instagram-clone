import React from "react";
import useUser from "../../hooks/use-user";
import Suggestions from "./suggestions";
import User from "./user";
function Sidebar(props) {
  const {
    user: { fullName, username, userId },
  } = useUser();
  console.log("user", fullName, username);
  return (
    <div className="p-4">
      <User userName={username} fullName={fullName} />
      <Suggestions userId={userId} />
    </div>
  );
}

export default Sidebar;
