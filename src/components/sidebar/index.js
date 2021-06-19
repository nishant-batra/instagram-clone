import React from "react";
import useUser from "../../hooks/use-user";
import Suggestions from "./suggestions";
import User from "./user";
function Sidebar(props) {
  const {
    user: { fullName, username, userId, following, docId },
  } = useUser();
  // console.log("user", following);
  return (
    <div className="p-4">
      <User userName={username} fullName={fullName} />
      <Suggestions userId={userId} following={following} docId={docId} />
    </div>
  );
}

export default Sidebar;
