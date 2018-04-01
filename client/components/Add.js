import Axios from "axios";

/**
 * @author Daniel VG
 * @create date 2018-04-01 11:08:14
 * @modify date 2018-04-01 11:08:14
 * @desc React Component to add a Note
 */

/**
 * Button to:
 * Open Modal
 * Input Note Informations
 * Submit Informations(insertNewExpense())
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
    // set functions
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
      // TODO set month to be chosen
      month: "01",
      // TODO set year to be chosen
      year: "2017",
      messageFromServer: ""
    });
  }

  /* // TODO
    componentDidMount() {
        if (this.props.selectedMonth == "All") {
          this.setState({ month: "Jan" });
        } else {
          this.setState({ month: this.props.selectedMonth });
        }
        this.setState({ year: this.props.selectedYear });
    } */

  // On Click handler to add new Note
  onClick(e) {
    this.insertNewExpense(e);
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
      description: e.target.value;
    }
  }

  // Use AXIOS post request to insert Note into the DB
  insertNewExpense(e) {
    axios
      .post(
        "/insert",
        querystring.stringify({
          topic: e.state.topic,
          description: e.state.description,
          month: e.state.month,
          year: e.state.year
        }),
        {
          headers: {
            "Content-Type": "applications/x-www-form-urlencoded"
          }
        }
      )
      .then(response => {
        e.setState({
          messageFromServer: response.data
        });
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
            contentLabel="Add Expense"
            className="Modal"
          >
            {/* Close Modal */}
            <Link
              to={{ pathname: "/", search: "" }}
              style={{ textDecoration: "none" }}
            >
              <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}>
                <span className="closebtn glyphicon glyphicon-remove" />
              </Button>
            </Link>
            <br />
            {/* field to input Note data */}
            <fieldset>
                {/* Note Topic */}
              <label for="Topic">Topic:</label>
              <input
                type="text"
                id="topic"
                name="topic"
                value={this.state.topic}
                onChange={this.handleTextChange}
              />
              {/* Note Description */}
              <label for="Description">Amount:</label>
              <input
                type="text"
                id="description"
                name="description"
                value={this.state.description}
                onChange={this.handleTextChange}
              />
              {/* Select Month */}
              {/* TODO Set automatically */}
              <label for="month">Month:</label>
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
              <label for="year">Year:</label>
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
            contentLabel="Add Expense"
            className="Modal"
          >
          {/* Link to get Back to the App --> React Router */}
            <div className="button-center">
              <h3>{this.state.messageFromServer}</h3>
              <Link
                to={{ pathname: "/", search: "" }}
                style={{ textDecoration: "none" }}
              >
                <Button
                  bsStyle="success"
                  bsSize="mini"
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
