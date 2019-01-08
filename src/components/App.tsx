import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './home/Home';
import Resume from './resume/Resume';
import Sandbox from './sandbox/Sandbox';

class App extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/resume" component={Resume}/>
                            <Route path="/sandbox" component={Sandbox}/>
                            <Redirect from="*" to="/"/>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
