/**
 * @author Daniel V.G.
 * @email danielveragi@gmail.com
 * @create date 2018-04-05 08:40:24
 * @modify date 2018-04-05 08:40:24
 * @desc Component to update the UI of the Screen
 */

import React from "react";
import Modal from "react-modal";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
var querystring = require("querystring");
class Update extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "",
      topic: "",
      description: "",
      month: "",
      year: "",
      messageFromServer: "",
      modalIsOpen: false
    };

    this.update = this.update.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.setState({
      id: this.props.note._id,
      topic: this.props.note.topic,
      description: this.props.note.description,
      month: this.props.note.month,
      year: this.props.note.year
    });
  }

  openModal() {
    this.setState({
      modalIsOpen: true
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      messageFromServer: ""
    });
  }

  handleSelectChange(e) {
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

  handleTextChange(e) {
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

  onClick(e) {
    this.update(this);
  }

  //   update request to the server
  update(e) {
    axios
      .post("/update", {
        _id: e.state.id,
        topic: e.state.topic,
        description: e.state.description,
        month: e.state.month,
        year: e.state.year
      })
      .then(resp => {
        console.log(resp);
        e.setState({
          messageFromServer: resp.data
        }).catch(err => {
         console.error(err);
        });
      });
  }

  render() {
    if (this.state.messageFromServer == "") {
      return (
        <div>
          <Button bsStyle="warning" bsSize="small" onClick={this.openModal}>
            <span className="glyphicon glyphicon-edit" />
          </Button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="Add Expense"
            className="Modal"
            ariaHideApp={false}
          >
            <Link
              to={{ pathname: "/", search: "" }}
              style={{ textDecoration: "none" }}
            >
              <Button bsStyle="danger" bsSize="lg" onClick={this.closeModal}>
                <span className="closebtn glyphicon glyphicon-remove" />
              </Button>
            </Link>
            <br />
            <fieldset>
              <label htmlFor="topic">Topic:</label>
              <input
                type="text"
                id="topic"
                name="topic"
                value={this.state.topic}
                onChange={this.handleTextChange}
              />
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                name="description"
                value={this.state.description}
                onChange={this.handleTextChange}
              />
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
                  February
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
                <option value="2015" id="17">
                  2015
                </option>
                <option value="2016" id="17">
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
            <div className="button-center">
              <br />
              <Button bsStyle="warning" bsSize="small" onClick={this.onClick}>
                Update
              </Button>
            </div>
          </Modal>
        </div>
      );
    } else {
      return <div>
          <Button bsStyle="warning" bsSize="small" onClick={this.openModal}>
            <span className="glyphicon glyphicon-edit" />
          </Button>
          <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} contentLabel="Add Note" className="Modal" ariaHideApp={false}>
            <div className="button-center">
              <h3>{this.state.messageFromServer}</h3>
              <Link to={{ pathname: "/", search: "" }} style={{ textDecoration: "none" }}>
                <Button bsStyle="success" bsSize="lg" onClick={this.closeModal}>
                  Close the Dialog
                </Button>
              </Link>
            </div>
          </Modal>
        </div>;
    }
  }
}
export default Update;
