import React, { useContext } from "react";
import LoggedInUserContext from "../../context/logged-in-user";
import Suggestions from "./suggestions";
import User from "./user";
function Sidebar() {
  const { user } = useContext(LoggedInUserContext);
  //console.log("user", user);

  return (
    <div className={"p-4"}>
      <User userName={user.username} fullName={user.fullName} />
      <Suggestions
        userId={user.userId}
        following={user.following}
        docId={user.docId}
      />
    </div>
  );
}

export default (Sidebar);
