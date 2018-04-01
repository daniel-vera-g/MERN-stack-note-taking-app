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
class AddButton extends React.Component{
    constructor() {
        super();
        // set Modal Component state
        this.state = {
            topic: '',
            description: '',
            month: '',
            year: '',
            messageFromServer: '',
            modalIsOpen: false
        }
        // set functions
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.insertNewNote = this.insertNewNote.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
}

// Use AXIOS post request to insert Note into the DB
insertNewExpense(e) {
    axios.post('/insert',
    querystring.stringify({
        topic: e.state.topic,
        description: e.state.description,
        month: e.state.month,
        year: e.state.year
    }), {
        headers: {
            "Content-Type": "applications/x-www-form-urlencoded"
        }
    }).then((response) => {
        e.setState({
            messageFromServer: response.data
        });
    });
};