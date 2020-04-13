import React from "react";
import { Link } from "@reach/router";
import arrow from "../arrow.svg";
import { findByLabelText } from "@testing-library/dom";

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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p className="linkText" style={{ textAlign: "center" }}>
            go back
          </p>
          <img src={arrow} className="linkArrowReverse" />
        </div>
      </Link>
    </div>
  );
};

export default LineInfo;
