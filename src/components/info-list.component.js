import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Info = props => (
  <tr>
    <td>{props.info.username}</td>
    <td>{props.info.weight}</td>
    <td>{props.info.date.substring(0,10)}</td>
    <td><div class="alert alert-primary" role="alert" align="center">
      <Link to={"/edit/"+props.info._id}>edit</Link> | <a href="#" onClick={() => { props.deleteInfo(props.info._id) }}>delete</a>
      </div></td>
  </tr>
)

export default class InfoList extends Component {
  constructor(props) {
    super(props);

    this.deleteInfo = this.deleteInfo.bind(this)

    this.state = {info: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/info/')
      .then(response => {
        this.setState({ info: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteInfo(id) {
    axios.delete('http://localhost:5000/info/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      info: this.state.info.filter(el => el._id !== id)
    })
  }

  infoList() {
    return this.state.info.map(currentinfo => {
      return <Info info={currentinfo} deleteInfo={this.deleteInfo} key={currentinfo._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Informations</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Weight</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.infoList() }
          </tbody>
        </table>
      </div>
    )
  }
}