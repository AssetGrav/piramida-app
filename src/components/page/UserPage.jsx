import React from "react";
import PropTypes from "prop-types";
import { useUser } from "../../hook/useUser";
import Table from "../common/table/Table";

const UserPage = ({ userId }) => {
  const { getUserById, userBonus } = useUser();
  console.log("page", userId);
  const user = getUserById(userId);
  if (user) {
    return (
      <div className="container">
        <div className="flex">
          <div className="mb-3">
            <Table bonus={userBonus} userId={userId} />
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>Loading</h1>;
  }
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserPage;
