import { Project } from '../model/project';
import {ProjectActions, PROJECTS_ERROR, PROJECTS_RECEIVED, REQUESTING_PROJECTS} from '../actions/projectActions';

export interface ProjectState {
    projects: Project[];
    fetchingProjects: boolean;
    error: string | null;
}

const initialProjectState: ProjectState = {
    projects: [],
    fetchingProjects: false,
    error: null
};

function projectReducer(state: ProjectState = initialProjectState, action: ProjectActions): ProjectState {
    switch(action.type) {
        case REQUESTING_PROJECTS:
            return {
                ...state,
                fetchingProjects: true,
                error: null
            };
        case PROJECTS_RECEIVED:
            return {
                projects: action.projects,
                fetchingProjects: false,
                error: null
            };
        case PROJECTS_ERROR:
            return {
                ...state,
                fetchingProjects: false,
                error: action.error
            };
        default:
            return state;
    }
}

export default projectReducer;
