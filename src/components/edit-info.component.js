import React, { Component } from 'react';
import axios from 'axios'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class AddInfo extends Component {
constructor(props){
  super(props)
  this.onChangeUserName=this.onChangeUserName.bind(this);
  this.onChangeWeight=this.onChangeWeight.bind(this);
  this.onChangeDate=this.onChangeDate.bind(this);
  this.onSubmit=this.onSubmit.bind(this);

  this.state={
    username:"",
    weight:0,
    date:new Date(),
    users:[]
  }
}

componentDidMount(){
  axios.get('http://localhost:5000/info/'+this.props.match.params.id)
      .then(res=>{
        this.setState({
          username:res.data.username,
          weight:res.data.weight,
          date:new Date(res.data.date)
        })
      });

  axios.get('http://localhost:5000/user')
      .then(res =>{
        if(res.data.length>0){
            this.setState({
            users : res.data.map(users => users.username),
  })
}
});
}

onChangeUserName(e){
  this.setState({
    username : e.target.value
  });
}

onChangeWeight(e){
  this.setState({
    weight : e.target.value
  });
}

onChangeDate(date){
  this.setState({
    date : date
  });
}

onSubmit(e){
  e.preventDefault();
  const info={
    username:this.state.username,
    weight:this.state.weight,
    date:this.state.date
  }  

  console.log(info);
  axios.post('http://localhost:5000/info/update/'+this.props.match.params.id, info)
      .then(res => console.log(res.data));
  window.location ='/';
}
render() {
  return (
  <div>
    <h3>Update Information</h3>
    <form onSubmit={this.onSubmit}>
      <div className="form-group"> 
        <label>Username: </label>
        <select
            required
            className="form-control"
            value={this.state.username}
            onChange={this.onChangeUserName}>
            {
              this.state.users.map(function(user) {
                return <option 
                  key={user}
                  value={user}>{user}
                  </option>;
              })
            }
        </select>
      </div>
      <div className="form-group">
        <label>Weight (in Kilogaram): </label>
        <input 
            type="text" 
            maxLength="3"
            className="form-control"
            value={this.state.weight}
            onChange={this.onChangeWeight}
            />
      </div>
      <div className="form-group">
        <label>Date: </label>
        <div>
          <DatePicker
            selected={this.state.date}
            onChange={this.onChangeDate}
          />
        </div>
      </div>

      <div className="form-group">
        <input type="submit" value="Update Inforamtion" className="btn btn-primary" />
      </div>
    </form>
  </div>
  )
}
}