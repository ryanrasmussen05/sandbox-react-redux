import React from 'react';
import Header from '../common/Header';
import { match } from 'react-router';

interface HomeProps {
    match: match
}

class Home extends React.Component<HomeProps> {
    render() {
        return (
            <div>
                <Header currentPath={this.props.match.url}/>
                home page
            </div>
        );
    }
}

export default Home;