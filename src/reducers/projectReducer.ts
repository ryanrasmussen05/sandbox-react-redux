import { Project } from '../model/project';
import { GET_PROJECTS } from '../constants/actionTypes';
import { AnyAction } from 'redux';

export interface ProjectState {
    projects: Project[];
    count: number; //TODO delete
    lastUpdate: string; //TODO delete
}

const initialProjectState: ProjectState = {
    projects: [],
    count: 0,
    lastUpdate: '----'
};

function projectReducer(state: ProjectState = initialProjectState, action: AnyAction): ProjectState {
    switch(action.type) {
        case GET_PROJECTS:
            return {
                ...state,
                count: state.count + 1,
                lastUpdate: action.lastUpdate
            };
        default:
            return state;
    }
}

export default projectReducer;
