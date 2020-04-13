import React, { Component } from "react";
import axios from "axios";
import { formatDate } from "../functions";
import Table from "./Table";
import { Router, Link } from "@reach/router";
import LineInfo from "./LineInfo";
import arrow from "../arrow.svg";

class Travel extends Component {
  state = {
    tubeLineStatuses: [],
    lastUpdatedString: ""
  };

  fetchData() {
    axios
      .get(
        "https://api.tfl.gov.uk/Line/Mode/tube/Status?app_id=cdf2be4d&app_key=2c620fbd67b0fe7202e99b15a97419d6"
      )
      .then(response => {
        const tubeLineStatuses = response.data.map(tubeLine => {
          return {
            id: tubeLine.id,
            tubeLineName: tubeLine.name,
            tubeLineStatus: tubeLine.lineStatuses[0].statusSeverityDescription,
            tubeLineStatusMessage: tubeLine.lineStatuses[0].reason
          };
        });

        this.setState({ tubeLineStatuses });
        console.log(tubeLineStatuses);
      });
  }

  fetchDate() {
    const now = new Date();
    const lastUpdatedString = formatDate(now);
    this.setState({ lastUpdatedString });
    console.log(lastUpdatedString);
  }

  refreshData() {
    console.log("trying to refresh data...");
    window.location.reload(false);
  }

  renderTableData(tubeLineStatuses) {
    return tubeLineStatuses.map(tubeLine => {
      const { id, tubeLineName, tubeLineStatus } = tubeLine;
      return (
        <tr key={id}>
          <td className={id}>{tubeLineName}</td>
          <td>{tubeLineStatus}</td>
          <td>
            <Link to={`/travel/${id}`}>
              <p className="linkText">View More</p>
              <img src={arrow} className="linkArrow" />
            </Link>
          </td>
        </tr>
      );
    });
  }

  componentDidMount() {
    console.log("componentDidMount from Travel.jsx firing !");
    this.fetchData();
    this.fetchDate();
  }

  render() {
    return (
      <div className="widgetAligner">
        <div className="widgetContainer">
          <div className="widgetHeader">
            <p>last updated: {this.state.lastUpdatedString}</p>
            <button onClick={this.refreshData}>Refresh Data</button>
          </div>
          <Router>
            <Table
              path="/"
              renderTableData={this.renderTableData}
              tubeLineStatuses={this.state.tubeLineStatuses}
            />
            <LineInfo path="/:id" lineStatuses={this.state.tubeLineStatuses} />
          </Router>
        </div>
      </div>
    );
  }
}

export default Travel;
