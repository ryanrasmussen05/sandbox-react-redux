import React from 'react';
import { Link } from "react-router-dom";
import { getImage } from "../common/functions";
import { SandboxLink, SandboxSection } from "./sandboxConfig";
import './SandboxGroup.scss';

interface SandboxGroupProps {
    section: SandboxSection
}

const SandboxGroup: React.FunctionComponent<SandboxGroupProps> = (props) => {
    return (
        <div className="sandbox-group">
            <div className="sandbox-group-image">
                <img src={getImage(props.section.image)} alt={props.section.image}/>
            </div>
            <div className="sandbox-group-details">
                <div className="sandbox-group-title">{props.section.title}</div>
                <ul className="sandbox-group-links">
                    {props.section.links.map((link: SandboxLink) => (
                        <li key={link.title} className="sandbox-group-link">
                            <Link to={link.link}>{link.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
};

export default SandboxGroup;