import React from 'react';
import './Education.scss';
import {getImage} from "../common/functions";
import {EducationItem} from "../../models/resume";

interface EducationProps {
    degree: EducationItem
}

const Education: React.FunctionComponent<EducationProps> = (props) => {
    return (
        <div className="education">
            <div className="education-image">
                <img src={getImage(props.degree.image)} alt={props.degree.image}/>
            </div>
            <div className="education-details">
                <div className="education-title">{props.degree.degree}</div>
                <div className="education-school">
                    {props.degree.school}
                    <span className="education-location">{' - ' + props.degree.location}</span>
                </div>
                <ul>
                    <li className="education-bullet">{'Graduated ' + props.degree.graduationDate}</li>
                    <li className="education-bullet">{'GPA: ' + props.degree.gpa}</li>
                </ul>
            </div>
        </div>
    )
};

export default Education;