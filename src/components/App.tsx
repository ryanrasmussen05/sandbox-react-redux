import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import { Home } from './Home';
import { Resume } from './Resume';
import { Sandbox } from './Sandbox';

class App extends React.Component {
    render() {
        return (
            <Router>
                {/*TODO create header component*/}
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/resume">About</Link>
                        </li>
                        <li>
                            <Link to="/sandbox">Topcs</Link>
                        </li>
                    </ul>
                    <hr/>

                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/resume" component={Resume}/>
                        <Route path="/sandbox" component={Sandbox}/>
                        <Redirect from="*" to="/"/>
                    </Switch>

                </div>
            </Router>
        );
    }
}

export default App;



// import React from 'react';
// import Test from './Test';
//
// interface Props {
//     x?: string
// }
//
// class App extends React.Component<Props> {
//     render() {
//         const temp = this.props.x;
//
//         return (
//             <div>
//                 {temp}
//                 <Test/>
//             </div>
//
//         );
//     }
// }
//
// export default App;
