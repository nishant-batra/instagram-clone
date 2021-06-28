import React from "react";
import { memo } from "react";
import Skeleton from "react-loading-skeleton";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const User = ({ userName, fullName }) =>
  !userName || !fullName ? (
    <Skeleton height={61} count={1} />
  ) : (
    <Link
      className="grid grid-cols-4 gap-4 ab-6 items-center"
      to={`/p/${userName}`}
    >
      <div className="flex items-center justify-between col-span-1">
        <img
          className="rounded-full w-16 flex mr-3"
          src={`/images/avatars/${userName}.jpg`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/avatars/default.png";
          }}
          alt="profile pic"
        />
      </div>
      <div className="col-span-3">
        <p className="font-bold text-sm">{userName}</p>
        <p className="text-sm">{fullName}</p>
      </div>
    </Link>
  );

export default memo(User);
User.propTypes = {
  userName: PropTypes.string,
  fullName: PropTypes.string,
};
