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
import Update from "./update";
import Delete from "./delete";
import { Tab, Tabs } from "react-bootstrap";
import YearTabsRouter from "./tabs/YearTabs.js";
export default class App extends React.Component {
  constructor() {
    super();
    // set default state for the component
    this.state = { selectedMonth: "All", selectedYear: 2016, data: [], activeTab: 2016 };
    this.getData = this.getData.bind(this);
    // this.handleSelect = this.handleSelect.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // TODO understand it
     if (nextProps.history.location.search) {
      var search = nextProps.history.location.search;
      console.log(search);
      search = search.substring(1);
      var searchObj = JSON.parse('{"' + decodeURI(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') + '"}');
      this.setState({ activeTab: parseInt(searchObj.year) });
      this.setState({ selectedYear: searchObj.year });
      this.setState({ selectedMonth: searchObj.month });
      this.getData(this, searchObj.year, searchObj.month);
    }else{
      }
        this.getData(this, 2016, "All");
    }

  componentDidMount() {
    this.getData(this, 2016, "All");
  }

  handleSelect(selectedTab){
    this.setState({
      activeTab: selectedTab,
      selectedYear: selectedTab
    })
  }
  
  // Get data from the DB & set the State
  getData(ev, year, month) {
    axios.get("/getAll?month="+month+"&year=" + year).then(response => {
      ev.setState({ data: response.data });
      ev.setState({
        selectedYear: parseInt(year)
      });
      ev.setState({selectedMonth: month});
    }).catch(err => {
        console.error(err);
      });;
  }
  
  render() {
    return (
    <div>
        <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect} id={"years"}>
          <Tab id={"2016"} eventKey={2016} title={<YearTabsRouter year="2016" />} />
          <Tab id={"2017"} eventKey={2017} title={<YearTabsRouter year="2017" />} />
          <Tab id={"2018"} eventKey={2018} title={<YearTabsRouter year="2018" />} />
          <Tab id={"2019"} eventKey={2019} title={<YearTabsRouter year="2019" />} />
          <Tab id={"2020"} eventKey={2020} title={<YearTabsRouter year="2020" />} />
        </Tabs>
        <Add selectedMonth={this.state.selectedMonth} selectedYear={this.state.selectedYear} />
        <table>
          <thead>
            <tr>
              <th />
              <th className="desc-col">Topic</th>
              <th className="button-col">Description</th>
              <th className="button-col">Month</th>
              <th className="button-col">Year</th>
              <th className="button-col">Update</th>
              <th className="button-col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(note => {
              return <tr key={note._id}>
                  <td className="counterCell" />
                  <td className="desc-col">{note.topic}</td>
                  <td className="button-col">{note.description}</td>
                  <td className="button-col">{note.month}</td>
                  <td className="button-col">{note.year}</td>
                  <td className="button-col">
                    <Update note={note} />
                  </td>
                  <td className="button-col">
                    <Delete note={note} />
                  </td>
                </tr>;
            })}
          </tbody>
        </table>
      </div>
    )
  }
}