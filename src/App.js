import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import InfoList from "./components/info-list.component";
import EditInfo from "./components/edit-info.component";
import CreateInfo from "./components/create-info.component";
import CreateUser from "./components/create-user.component";


function App() {
  return (
    <Router>
      <div className="container" >
    <Navbar />
      <br/>
        <Route path="/" exact component={InfoList} />
        <Route path="/edit/:id" component={EditInfo} />
        <Route path="/create" component={CreateInfo} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
} 

export default App;
