import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './routes/Home';
import UpdatePage from './routes/UpdatePage';
import DealershipDetailPage from './routes/DealershipdetailPage';

const App = () => {
  return (
    <div>
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/dealership/:id/update" component={UpdatePage}/>
                <Route exact path="/dealership/:id" component={DealershipDetailPage}/>
            </Switch>
        </Router>
    </div>
  );
};

export default App;