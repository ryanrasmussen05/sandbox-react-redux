import { ProjectState } from './projectReducer';
import { combineReducers, Reducer } from 'redux';
import projectReducer from './projectReducer'

export interface State {
    projectState: ProjectState;
}

const rootReducer: Reducer<State> = combineReducers({
    projectState: projectReducer
});

export default rootReducer;
