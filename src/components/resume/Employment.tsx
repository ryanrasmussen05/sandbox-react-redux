import React from 'react';
import './Employment.scss';
import {EmploymentItem} from "../../models/resume";
import {getImage} from "../common/functions";


interface EmploymentProps {
    job: EmploymentItem;
}

const Employment: React.FunctionComponent<EmploymentProps> = (props) => {
    return (
        <div className="employment">
            <div className="employment-image">
                <img src={getImage(props.job.image)} alt={props.job.image}/>
            </div>
            <div className="employment-details">
                <div className="job-title">{props.job.title}</div>
                <div className="job-company">
                    {props.job.company}
                    <span className="job-location">{' - ' + props.job.location}</span>
                </div>
                <div className="job-time">{props.job.start + ' - ' + (props.job.end ? props.job.end : 'Present')}</div>
                <ul>
                    {props.job.bullets.map((bullet: string) => (
                        <li key={bullet} className="job-bullet">{bullet}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
};

export default Employment;