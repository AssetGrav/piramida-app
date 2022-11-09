import React from "react";
import PropTypes from "prop-types";

function Level({ info }) {
  return (
    <div className="text-sm text-gray-500">
      <p className="text-sm text-gray-500 ml-4">
        Уровень {info.level + " = " + info.bonus}
      </p>
    </div>
  );
}

Level.propTypes = {
  info: PropTypes.object,
};

export default Level;
