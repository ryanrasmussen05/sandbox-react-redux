import React from 'react';
import Header from '../common/Header';
import { match } from 'react-router';

interface ResumeProps {
    match: match
}

class Resume extends React.Component<ResumeProps> {
    render() {
        return (
            <div>
                <Header currentPath={this.props.match.url}/>
                resume page
            </div>
        );
    }
}

export default Resume;