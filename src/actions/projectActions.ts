import { Action } from 'redux';

export const GET_PROJECTS = 'GET_PROJECTS';
export const SET_PROJECTS = 'SET_PROJECTS';

export interface ActionGetProjects extends Action {
    type: 'GET_PROJECTS';
    lastUpdate: string
}

export interface ActionSetProjects extends Action {
    type: 'SET_PROJECTS';
    testProp: string;
}

export type ProjectActions = ActionGetProjects | ActionSetProjects;


export function getProjects(lastUpdate: string): ActionGetProjects {
    return {
        type: GET_PROJECTS,
        lastUpdate: lastUpdate
    }
}

export function setProjects(testProp: string): ActionSetProjects {
    return {
        type: SET_PROJECTS,
        testProp: testProp
    }
}
