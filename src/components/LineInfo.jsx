import React from "react";
import { Link } from "@reach/router";

const LineInfo = props => {
  const tubeLine = props.lineStatuses.find(
    tubeLine => tubeLine.id === props.id
  );

  const { id, tubeLineName, tubeLineStatus, tubeLineStatusMessage } = tubeLine;

  return (
    <div className="tableContainer">
      <table id="tubeLines">
        <tbody>
          <tr>
            <th>Line</th>
            <th colSpan="2">Status: {tubeLineStatus}</th>
          </tr>
          <tr>
            <td className={id}>{tubeLineName}</td>
            <td>{tubeLineStatusMessage.split(":")[1]}</td>
          </tr>
        </tbody>
      </table>

      <Link to="/travel">
        <p style={{ textAlign: "center" }}>go back</p>
      </Link>
    </div>
  );
};

export default LineInfo;
