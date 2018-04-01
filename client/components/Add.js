import Axios from "axios";

/**
 * @author Daniel VG
 * @create date 2018-04-01 11:08:14
 * @modify date 2018-04-01 11:08:14
 * @desc React Component to add a Note
*/

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