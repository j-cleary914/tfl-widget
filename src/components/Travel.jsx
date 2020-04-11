import React, { Component } from "react";
import axios from "axios";
import { formatDate } from "../functions";

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
      });
  }

  fetchDate() {
    const now = new Date();
    const lastUpdatedString = formatDate(now);
    this.setState({ lastUpdatedString });
  }

  componentDidMount() {
    this.fetchData();
    this.fetchDate();
  }

  render() {
    return (
      <div>
        <p>Ah, the home of my new widget :)</p>
      </div>
    );
  }
}

export default Travel;
