/**
 * @author Daniel V.G.
 * @email danielveragi@gmail.com
 * @create date 2018-04-01 11:14:38
 * @modify date 2018-04-01 11:14:38
 * @desc Main react entry file for the Application
 */

import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Add from "./Add";
export default class App extends React.Component {
  constructor() {
    super();
    // set default state for the component
    this.state = { selectedMonth: "Jan", selectedYear: 2016, data: [] };
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData(this, "2016");
  }

  componentWillReceiveProps(nextProps) {
    this.getData(this, "2016");
  }
  
  // Get data from the DB & set the State
  getData(ev, year) {
    axios.get("/getAll?month=All&year=" + year).then(response => {
      ev.setState({ data: response.data });
      ev.setState({
        selectedYear: parseInt(year)
      });
    });
  }
  

  render() {
    return (
      <div>
        <Add
          selectedMonth={this.state.selectedMonth}
          selectedYear={this.state.selectedYear}
        />
        <table>
          <thead>
            <tr>
              <th />
              <th className="desc-col">Topic</th>
              <th className="button-col">Description</th>
              <th className="button-col">Month</th>
              <th className="button-col">Year</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((note) => {
              return (
                <tr>
                  <td className="counterCell" />
                  <td className="desc-col">{note.topic}</td>
                  <td className="button-col">{note.description}</td>
                  <td className="button-col">{note.month}</td>
                  <td className="button-col">{note.year}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}