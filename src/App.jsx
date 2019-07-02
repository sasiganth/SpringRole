import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './Home'
import User from './User'

const App = () => {
  return (
    <Router>
        <Route key="home" exact={true} path="/" component={Home} />
        <Route key="userdetail" path="/user/:id" component={User} />
      
    </Router>
  )
}
export default App;