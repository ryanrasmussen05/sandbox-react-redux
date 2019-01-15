import * as firebase from 'firebase/app';
import { Action, AnyAction, Dispatch } from 'redux';
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Resume } from "../models/resume";
import { AppState } from "../reducers";

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

export function fetchResumeIfNeeded(): ThunkAction<Promise<void>, any, any, AnyAction> {
    return (dispatch: ThunkDispatch<any, any, AnyAction>, getState: () => AppState) => {
        if (shouldFetchResume(getState())) {
            return dispatch(fetchResume());
        } else {
            return Promise.resolve();
        }
    }
}

function shouldFetchResume(state: AppState): boolean {
    return !state.resumeState.resume;
}

function fetchResume(): ThunkAction<Promise<void>, any, any, AnyAction> {
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

