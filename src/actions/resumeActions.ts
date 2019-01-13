import {Action, AnyAction, Dispatch} from 'redux';
import firebase from 'firebase';
import {ThunkAction} from "redux-thunk";
import {Resume} from "../model/resume";

export const REQUESTING_RESUME = 'REQUESTING_RESUME';
export const RESUME_RECEIVED = 'RESUME_RECEIVED';
export const RESUME_ERROR = 'RESUME_ERROR';

export interface ActionRequestingResume extends Action {
    type: 'REQUESTING_RESUME';
}

export interface ActionResumeReceived extends Action {
    type: 'RESUME_RECEIVED';
    resume: Resume;
}

export interface ActionResumeError extends Action {
    type: 'RESUME_ERROR';
    error: string;
}

export type ResumeActions =
    ActionRequestingResume |
    ActionResumeReceived |
    ActionResumeError;

export function requestingResume(): ActionRequestingResume {
    return {
        type: REQUESTING_RESUME
    }
}

export function resumeReceived(resume: Resume): ActionResumeReceived {
    return {
        type: RESUME_RECEIVED,
        resume: resume
    }
}

export function resumeError(error: string): ActionResumeError {
    return {
        type: RESUME_ERROR,
        error: error
    }
}

export function fetchResume(): ThunkAction<Promise<void>, any, any, AnyAction> {
    return (dispatch: Dispatch) => {
        dispatch(requestingResume());

        return firebase.database().ref('resume').once('value').then(
            (data: firebase.database.DataSnapshot) => {
                dispatch(resumeReceived(data.val()));
            },
            (error: string) => {
                console.error(error);
                dispatch(resumeError(error));
            }
        );
    };
}

