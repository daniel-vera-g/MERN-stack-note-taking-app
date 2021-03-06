/**
 * @author Daniel V.G.
 * @email danielveragi@gmail.com
 * @create date 2018-04-06 10:13:24
 * @modify date 2018-04-06 10:13:24
 * @desc component with the tabs for each month
*/

import React from "react";
import ReactDOM from "react-dom";
import { Tab, Tabs } from "react-bootstrap";
import MonthTabsRouter from "./monthTabsRouter";
import YearTabsRouter from "./yearTabsRouter";
class MonthTabs extends React.Component {
  constructor() {
    super();
    this.state = { activeTab: "" };
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      activeTab: this.props.year + "-" + nextProps.monthlyActiveTab
    });
  }

  handleSelect(selectedTab) {
    this.setState({
      activeTab: selectedTab
    });
  }

  render() {
    return <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect} id={"months"}>
        <Tab id={"all"} eventKey={this.props.year + "-All"} title={<MonthTabsRouter tabId="All" year={this.props.year} />} />
        <Tab id={"jan"}eventKey={this.props.year + "-Jan"} title={<MonthTabsRouter tabId="Jan" year={this.props.year} />} />
        <Tab id={"feb"}eventKey={this.props.year + "-Feb"} title={<MonthTabsRouter tabId="Feb" year={this.props.year} />} />
        <Tab id={"mar"}eventKey={this.props.year + "-Mar"} title={<MonthTabsRouter tabId="Mar" year={this.props.year} />} />
        <Tab id={"apr"}eventKey={this.props.year + "-Apr"} title={<MonthTabsRouter tabId="Apr" year={this.props.year} />} />
        <Tab id={"may"}eventKey={this.props.year + "-May"} title={<MonthTabsRouter tabId="May" year={this.props.year} />} />
        <Tab id={"jun"}eventKey={this.props.year + "-Jun"} title={<MonthTabsRouter tabId="Jun" year={this.props.year} />} />
        <Tab id={"jul"}eventKey={this.props.year + "-Jul"} title={<MonthTabsRouter tabId="Jul" year={this.props.year} />} />
        <Tab id={"aug"}eventKey={this.props.year + "-Aug"} title={<MonthTabsRouter tabId="Aug" year={this.props.year} />} />
        <Tab id={"sep"}eventKey={this.props.year + "-Sep"} title={<MonthTabsRouter tabId="Sep" year={this.props.year} />} />
        <Tab id={"oct"}eventKey={this.props.year + "-Oct"} title={<MonthTabsRouter tabId="Oct" year={this.props.year} />} />
        <Tab id={"nov"}eventKey={this.props.year + "-Nov"} title={<MonthTabsRouter tabId="Nov" year={this.props.year} />} />
        <Tab id={"dec"}eventKey={this.props.year + "-Dec"} title={<MonthTabsRouter tabId="Dec" year={this.props.year} />} />
      </Tabs>;
  }
}

export default MonthTabs;
