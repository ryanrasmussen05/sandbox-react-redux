import React from 'react';
import Header from '../common/Header';
import { match } from 'react-router';

interface SandboxProps {
    match: match
}

class Sandbox extends React.Component<SandboxProps> {
    render() {
        return (
            <div>
                <Header currentPath={this.props.match.url}/>
                sandbox page
            </div>
        );
    }
}

export default Sandbox;