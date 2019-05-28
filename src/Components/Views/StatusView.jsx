import React from "react";
import SingleStatusViewer from "../Sections/SingleStatusViewer";
import AllStatusViewer from "../Sections/AllStatusViewer";

const StatusView = ({ match }) => {
  return (
    <div className="status">
      {match.params.group === "all" ? (
        <AllStatusViewer />
      ) : (
        <SingleStatusViewer group={match.params.group} />
      )}
    </div>
  );
};

export default StatusView;
