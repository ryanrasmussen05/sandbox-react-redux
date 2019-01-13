import React from "react";
import './Footer.scss';
import {getImage} from "./functions";

const Footer: React.FunctionComponent = () => {
    return (
        <div className="footer">
            <div className="links-wrapper">
                <a href="https://reactjs.org/" target="_blank">
                    <img src={getImage('react.png')} alt="react"/>
                </a>
                <a href="https://redux.js.org/" target="_blank">
                    <img src={getImage('redux.png')} alt="redux"/>
                </a>
                <a href="https://firebase.google.com/" target="_blank">
                    <img src={getImage('firebase.png')} alt="firebase"/>
                </a>
            </div>
            <div className="copyright">
                Made by Ryan Rasmussen &copy; 2019
            </div>
        </div>
    )
};

export default Footer;