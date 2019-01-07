import { ProjectState } from './projectReducer';
import { combineReducers, Reducer } from 'redux';
import projectReducer from './projectReducer'

export interface AppState {
    projectState: ProjectState;
}

const rootReducer: Reducer<AppState> = combineReducers({
    projectState: projectReducer
});

export default rootReducer;
