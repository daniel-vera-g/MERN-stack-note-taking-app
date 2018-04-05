/**
 * @author Daniel V.G.
 * @email danielveragi@gmail.com
 * @create date 2018-04-05 11:13:42
 * @modify date 2018-04-05 11:13:42
 * Component to delete note
 */

import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class Delete extends React.Component {
  constructor() {
    super();
    this.state = {
      id: ""
    };
    this.onClick = this.onClick.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    this.setState({
      id: this.props.note._id
    });
  }

  onClick(e) {
    this.delete(this);
  }

//   delete note from System
  delete(e) {
      axios.delete("/delete?id=" + e.state.id).then((resp) => {
        console.log(resp);
    }).catch(err => {
        console.error(err);
    });
  }

  render() {
    return <Button bsStyle="danger" bsSize="small" onClick={this.onClick}>
        <Link to={{ pathname: "/", search: '?month='+this.state.month+'&year='+this.state.year }} style={{ textDecoration: "none" }}>
          <span className="glyphicon glyphicon-remove" />
        </Link>
      </Button>;
  }
}
export default Delete;