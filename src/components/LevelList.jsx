import React from "react";
import PropTypes from "prop-types";
import Level from "./Level";

function LevelList({ list }) {
  return (
    <div className="flex">
      {list.length ? (
        list.map((elem) => (
          <div key={elem._id}>
            <Level info={elem} />
          </div>
        ))
      ) : (
        <div className="ml-5 text-sm">Основатель</div>
      )}
    </div>
  );
}

LevelList.propTypes = {
  list: PropTypes.array,
};

export default LevelList;
