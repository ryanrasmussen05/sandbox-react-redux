import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { RouteConfig, routes } from "../routeConfig";

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    {routes.map((route: RouteConfig) => (
                        <Route
                            key={route.path}
                            exact
                            path={route.path}
                            component={route.component}/>
                    ))}
                    <Redirect from="*" to="/"/>
                </Switch>
            </Router>
        );
    }
}

export default App;
