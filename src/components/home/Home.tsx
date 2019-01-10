import React from 'react';
import Header from '../common/Header';
import { match } from 'react-router';
import './Home.scss';
import {Button} from "antd";

interface HomeProps {
    match: match
}

class Home extends React.Component<HomeProps> {
    render() {
        return (
            <div className="home-page">
                <Header currentPath={this.props.match.url}/>
                <div className="banner">
                    <div className="name center mb3">Ryan Rasmussen</div>
                    <div className="job-title center mb1">Software Engineer</div>
                    <div className="location center mb2">Papillion, Nebraska</div>
                    <div className="center">
                        <a href="http://www.linkedin.com/in/ryanrasmussen05" target="_blank">
                            <Button htmlType="button" type="primary" icon="linkedin">LinkedIn</Button>
                        </a>
                        <a href="https://github.com/ryanrasmussen05" target="_blank">
                            <Button htmlType="button" icon="github" className="github-button">GitHub</Button>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;