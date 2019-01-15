import React from 'react';
import Header from '../common/Header';
import { match } from 'react-router';
import Footer from "../common/Footer";
import './SandboxPage.scss';
import {sandboxConfig, SandboxSection} from "./sandboxConfig";
import SandboxGroup from "./SandboxGroup";

interface SandboxPageProps {
    match: match
}

class SandboxPage extends React.Component<SandboxPageProps> {
    render() {
        return (
            <div className="sandbox-page">
                <Header currentPath={this.props.match.url}/>

                <div className="page-content">
                    <div className="page-title">Sandbox</div>

                    <div>
                        {sandboxConfig.map((sandboxSection: SandboxSection) => (
                            <div key={sandboxSection.title} className="sandbox-section">
                                <SandboxGroup section={sandboxSection}/>
                            </div>
                        ))}
                    </div>
                </div>

                <Footer/>
            </div>
        );
    }
}

export default SandboxPage;