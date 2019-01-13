import {Action, AnyAction, Dispatch} from 'redux';
import firebase from 'firebase';
import {ThunkAction} from "redux-thunk";
import {Project} from "../model/project";

export const REQUESTING_PROJECTS = 'REQUESTING_PROJECTS';
export const PROJECTS_RECEIVED = 'PROJECTS_RECEIVED';
export const PROJECTS_ERROR = 'PROJECTS_ERROR';

export interface ActionRequestingProjects extends Action {
    type: 'REQUESTING_PROJECTS';
}

export interface ActionProjectsReceived extends Action {
    type: 'PROJECTS_RECEIVED';
    projects: Project[];
}

export interface ActionProjectsError extends Action {
    type: 'PROJECTS_ERROR';
    error: string;
}

export type ProjectActions =
    ActionRequestingProjects |
    ActionProjectsReceived |
    ActionProjectsError;

export function requestingProjects(): ActionRequestingProjects {
    return {
        type: REQUESTING_PROJECTS
    }
}

export function projectsReceived(projects: Project[]): ActionProjectsReceived {
    return {
        type: PROJECTS_RECEIVED,
        projects: projects
    }
}

export function projectsError(error: string): ActionProjectsError {
    return {
        type: PROJECTS_ERROR,
        error: error
    }
}

export function fetchProjects(): ThunkAction<Promise<void>, any, any, AnyAction> {
    return (dispatch: Dispatch) => {
        dispatch(requestingProjects());

        return firebase.database().ref('projects').once('value').then(
            (data: firebase.database.DataSnapshot) => {
                dispatch(projectsReceived(data.val()));
            },
            (error: string) => {
                console.error(error);
                dispatch(projectsError(error));
            }
        );
    };
}

