import React, { Component } from "react";
import axios from "axios";
import { formatDate } from "../functions";
import Table from "./Table";
import { Router, Link } from "@reach/router";
import LineInfo from "./LineInfo";
import arrow from "../arrow.svg";
import refresh_icon from "../refresh.svg";

class Travel extends Component {
  state = {
    tubeLineStatuses: [],
    lastUpdatedString: "",
    refreshIconRotation: "still"
  };

  fetchData = () => {
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
        this.setState({ refreshIconRotation: "still" });
        console.log("still");
      });
  };

  fetchDate = () => {
    const now = new Date();
    const lastUpdatedString = formatDate(now);
    this.setState({ lastUpdatedString });
  };

  refreshData = () => {
    this.fetchDate();
    this.fetchData();
    this.spinIcon();
  };

  spinIcon = () => {
    this.setState({ refreshIconRotation: "rotate" });
    console.log("rotate");
  };

  renderTableData = tubeLineStatuses => {
    return tubeLineStatuses.map(tubeLine => {
      const { id, tubeLineName, tubeLineStatus } = tubeLine;
      return (
        <tr key={id}>
          <td className={id}>{tubeLineName}</td>
          <td>{tubeLineStatus}</td>
          <td>
            <Link to={`/travel/${id}`}>
              <p className="linkText">View More</p>
              <img src={arrow} className="linkArrow" alt="chevron link icon" />
            </Link>
          </td>
        </tr>
      );
    });
  };

  componentDidMount = () => {
    console.log("componentDidMount from Travel.jsx firing !");
    this.fetchData();
    this.fetchDate();
  };

  render() {
    return (
      <div className="widgetAligner">
        <div className="widgetContainer">
          <div className="widgetHeader">
            <p style={{ padding: "0px 8px" }}>
              last updated: {this.state.lastUpdatedString}
            </p>
            <button onClick={this.refreshData}>
              <div>
                <img
                  src={refresh_icon}
                  className={this.state.refreshIconRotation}
                  alt="refrish icon"
                />
                <p>Refresh Data</p>
              </div>
            </button>
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
