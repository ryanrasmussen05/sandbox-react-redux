import { combineReducers, Reducer } from 'redux';
import projectReducer, {ProjectState} from './projectReducer'
import resumeReducer, {ResumeState} from "./resumeReducer";

export interface AppState {
    projectState: ProjectState;
    resumeState: ResumeState;
}

const rootReducer: Reducer<AppState> = combineReducers({
    projectState: projectReducer,
    resumeState: resumeReducer
});

export default rootReducer;
