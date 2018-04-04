import React from "react";
import { Button } from "react-bootstrap";
import Modal from "react-modal";
import axios from "axios";
import { Link } from "react-router-dom";
import Log from "react-log";
var querystring = require("querystring");

/**
 * @author Daniel VG
 * @create date 2018-04-01 11:08:14
 * @modify date 2018-04-01 11:08:14
 * @desc React Component to add a Note
 */
<Log>
  Testing logging
</Log>
/**
 * Button to:
 * Open Modal
 * Input Note Informations
 * Submit Informations(insertNewNote())
 */
class Add extends React.Component {
  constructor() {
    super();
    // set Modal Component state
    this.state = {
      topic: "",
      description: "",
      month: "",
      year: "",
      messageFromServer: "",
      modalIsOpen: false
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.insertNewNote = this.insertNewNote.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  // open modal to add Note
  openModal() {
    this.setState({
      modalIsOpen: true
    });
  }

  //set state when modal closes
  closeModal() {
    this.setState({
      modalIsOpen: false,
      topic: "",
      description: "",
      month: "Jan",
      year: 2017,
      messageFromServer: ""
    });
  }

  componentDidMount() {
    if (this.props.selectedMonth == "All") {
      this.setState({ month: "Jan" });
    } else {
      this.setState({ month: this.props.selectedMonth });
    }
    this.setState({ year: this.props.selectedYear });
  }

  // On Click handler to add new Note
  onClick(e) {
    this.insertNewNote(this);
  }

  // handle select input for month and year
  handleSelectChange(e) {
    // check if target is year or month
    if (e.target.name == "month") {
      this.setState({
        month: e.target.value
      });
    }
    if (e.target.name == "year") {
      this.setState({
        year: e.target.value
      });
    }
  }

  // handle input from the topic & description
  handleTextChange(e) {
    //  check if it's the topic or the name
    if (e.target.name == "topic") {
      this.setState({
        topic: e.target.value
      });
    }
    if (e.target.name == "description") {
      this.setState({
        description: e.target.value
      });
    }
  }

  // Use AXIOS post request to insert Note into the DB
  insertNewNote(e) {
    axios
      .post("/insert", {
        topic: e.state.topic,
        description: e.state.description,
        month: e.state.month,
        year: e.state.year
      })
      .then(resp => {
        console.log(resp);
        e.setState({
          messageFromServer: resp.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    if (this.state.messageFromServer == "") {
      return (
        <div>
          {/* Button to open Modal */}
          <Button bsStyle="success" bsSize="small" onClick={this.openModal}>
            <span className="glyphicon glyphicon-plus" />
          </Button>
          {/* Modal to add Note */}
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="Add Note"
            className="Modal"
            ariaHideApp={false}
          >
            {/* Close Modal */}
            <Link
              to={{ pathname: "/", search: "" }}
              style={{ textDecoration: "none" }}
              replace
            >
              <Button bsStyle="danger" bsSize="small" onClick={this.closeModal}>
                <span className="closebtn glyphicon glyphicon-remove" />
              </Button>
            </Link>
            <br />
            {/* field to input Note data */}
            <fieldset>
              {/* Note Topic */}
              <label htmlFor="Topic">Topic:</label>
              <input
                type="text"
                id="topic"
                name="topic"
                value={this.state.topic}
                onChange={this.handleTextChange}
              />
              {/* Note Description */}
              <label htmlFor="Description">Description:</label>
              <input
                type="text"
                id="description"
                name="description"
                value={this.state.description}
                onChange={this.handleTextChange}
              />
              {/* Select Month */}
              <label htmlFor="month">Month:</label>
              <select
                id="month"
                name="month"
                value={this.state.month}
                onChange={this.handleSelectChange}
              >
                <option value="Jan" id="Jan">
                  January
                </option>
                <option value="Feb" id="Feb">
                  Febrary
                </option>
                <option value="Mar" id="Mar">
                  March
                </option>
                <option value="Apr" id="Apr">
                  April
                </option>
                <option value="May" id="May">
                  May
                </option>
                <option value="Jun" id="Jun">
                  June
                </option>
                <option value="Jul" id="Jul">
                  July
                </option>
                <option value="Aug" id="Aug">
                  August
                </option>
                <option value="Sep" id="Sep">
                  September
                </option>
                <option value="Oct" id="Oct">
                  October
                </option>
                <option value="Nov" id="Nov">
                  November
                </option>
                <option value="Dec" id="Dec">
                  December
                </option>
              </select>
              <label htmlFor="year">Year:</label>
              <select
                id="year"
                name="year"
                value={this.state.year}
                onChange={this.handleSelectChange}
              >
                <option value="2016" id="16">
                  2016
                </option>
                <option value="2017" id="17">
                  2017
                </option>
                <option value="2018" id="18">
                  2018
                </option>
                <option value="2019" id="19">
                  2019
                </option>
                <option value="2020" id="20">
                  2020
                </option>
              </select>
            </fieldset>
            {/* Submit new Note */}
            <div className="button-center">
              <br />
              <Button bsStyle="success" bsSize="small" onClick={this.onClick}>
                Add New Note
              </Button>
            </div>
          </Modal>
        </div>
      );
    } else {
      return (
        <div>
          <Button bsStyle="success" bsSize="small" onClick={this.openModal}>
            <span className="glyphicon glyphicon-plus" />
          </Button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            contentLabel="Add note"
            className="Modal"
            ariaHideApp={false}
          >
            {/* Link to get Back to the App --> React Router */}
            <div className="button-center">
              <h3>{this.state.messageFromServer}</h3>
              <Link
                to={{ pathname: "/", search: "" }}
                style={{ textDecoration: "none" }}
                replace
              >
                <Button
                  bsStyle="success"
                  bsSize="small"
                  onClick={this.closeModal}
                >
                  Close the Dialog
                </Button>
              </Link>
            </div>
          </Modal>
        </div>
      );
    }
  }
}
export default Add;
