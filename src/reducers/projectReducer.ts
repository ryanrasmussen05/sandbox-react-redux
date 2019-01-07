import { Project } from '../model/project';
import { GET_PROJECTS, ProjectActions, SET_PROJECTS } from '../actions/projectActions';

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

function projectReducer(state: ProjectState = initialProjectState, action: ProjectActions): ProjectState {
    switch(action.type) {
        case GET_PROJECTS:
            return {
                ...state,
                count: state.count + 1,
                lastUpdate: action.lastUpdate
            };
        case SET_PROJECTS:
            return {
                ...state,
                count: 0,
                lastUpdate: action.testProp // TODO this is junk to test typings
            };
        default:
            return state;
    }
}

export default projectReducer;
