import React from 'react';
import './Project.scss';
import {Project} from "../../model/project";
import {getImage} from "../common/functions";


interface ProjectProps {
    project: Project;
}

const ProjectComponent: React.FunctionComponent<ProjectProps> = (props) => {
    return (
        <div className="project">
            <div className="project-image">
                <img src={getImage(props.project.image)} alt={props.project.image}/>
            </div>
            <div className="project-details">
                <div className="project-details-header">
                    <div className="project-title">{props.project.title}</div>
                    <div className="project-links">
                        {props.project.androidLink &&
                        <a href={props.project.androidLink} className="project-link" target="_blank">Android</a>
                        }
                        {props.project.iosLink &&
                        <a href={props.project.iosLink} className="project-link" target="_blank">iOS</a>
                        }
                    </div>
                </div>
                <div>{props.project.description}</div>
            </div>
        </div>
    )
};

export default ProjectComponent;