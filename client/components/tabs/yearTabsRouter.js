/**
 * @author Daniel V.G.
 * @email danielveragi@gmail.com
 * @create date 2018-04-05 01:33:18
 * @modify date 2018-04-05 01:33:18
 * @desc Tab component to navigate between the different years
*/

import React from "react";
import ReactDOM from "react-dom";
import { Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";

class YearTabsRouter extends React.Component {
  constructor() {
    super();
    this.state = { style: { "fontSize": "16px" } };
  }

  render() {
    return (
      <Link
        to={{ pathname: "/", search: "?month=All&year="+this.props.year }}
      >
        <p style={this.state.style}>{this.props.year}</p>
      </Link>
    );
  }
}

export default YearTabsRouter;
