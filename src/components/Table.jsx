import React from "react";

const Table = props => {
  return (
    <div>
      <div className="tableContainer">
        <table id="tubeLines">
          <tbody>
            <tr>
              <th>Line</th>
              <th colSpan="2">Status</th>
            </tr>
            {props.renderTableData(props.tubeLineStatuses)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
