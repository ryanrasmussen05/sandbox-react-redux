import React from 'react';
import Header from '../common/Header';
import {match} from 'react-router';
import './Home.scss';
import {Button, Icon} from "antd";
import {AppState} from "../../reducers";
import {fetchProjects} from "../../actions/projectActions";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getProjects, isFetchingProjects} from "../../reducers/selectors";
import {Project} from "../../model/project";
import ProjectComp from "./Project";
import Footer from "../common/Footer";
import {getImage} from "../common/functions";

interface HomeProps {
    match: match;
    fetchProjects: () => void;
    loading: boolean;
    projects: Project[];
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
                <div className="text-container homepage-section">
                    <div className="section-title">
                        About
                    </div>
                    <div>
                        I'm a full-stack web developer and a mobile developer in my spare time. I built this site
                        with <b>ReactJS</b>, <b>TypeScript</b>, and <b>Redux</b>, and utilizing <b>Firebase</b> for
                        hosting and realtime database to help me stay up-to-date with the latest front-end
                        technologies, and as a sandbox for learning to use various libraries.
                    </div>
                    <div className="section-button">
                        <Link to="/resume">
                            <Button htmlType="button" type="primary">Resume</Button>
                        </Link>
                    </div>
                </div>
                <div className="divider"></div>
                <img src={getImage('rhino_logo-teal.png')} className="rhino-logo" alt="rhino"/>
                <div className="text-container homepage-section">
                    <div className="section-title">
                        Mobile Development
                    </div>
                    <div>
                        I publish apps to Google Play under the developer name <b>Rhino Development</b>, and currently
                        have one app in the Apple App Store written for <b>Strategic Air Command & Aerospace Museum</b>.
                    </div>

                    {this.props.loading &&
                        <div className="loading-indicator">
                            <Icon type="sync" spin/>
                        </div>
                    }

                    {this.props.projects &&
                        this.props.projects.map((project: Project) => (
                            <div key={project.title} className="project-wrapper">
                                <ProjectComp project={project}/>
                            </div>
                        ))
                    }

                </div>
                <div className="divider"></div>
                <div className="text-container homepage-section sandbox-section">
                    <div className="section-title">
                        Sandbox
                    </div>
                    <div>
                        This is the area I use to store various components I create while learning new/interesting
                        libraries.
                    </div>
                    <div className="section-button">
                        <Link to="/sandbox">
                            <Button htmlType="button" type="primary">Sandbox</Button>
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    componentDidMount(): void {
        this.props.fetchProjects();
    }
}

function mapStateToProps(state: AppState) {
    return {
        loading: isFetchingProjects(state),
        projects: getProjects(state)
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        fetchProjects: () => {
            dispatch(fetchProjects())
        }
    }
}

const ConnectedHome = connect(mapStateToProps, mapDispatchToProps)(Home);

export default ConnectedHome;