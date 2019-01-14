import {Resume} from "../models/resume";
import {REQUESTING_RESUME, RESUME_ERROR, RESUME_RECEIVED, ResumeActions} from "../actions/resumeActions";

export interface ResumeState {
    resume: Resume | null;
    fetchingResume: boolean;
    error: string | null;
}

const initialResumeState: ResumeState = {
    resume: null,
    fetchingResume: false,
    error: null
};

function resumeReducer(state: ResumeState = initialResumeState, action: ResumeActions): ResumeState {
    switch(action.type) {
        case REQUESTING_RESUME:
            return {
                ...state,
                fetchingResume: true,
                error: null
            };
        case RESUME_RECEIVED:
            return {
                resume: action.resume,
                fetchingResume: false,
                error: null
            };
        case RESUME_ERROR:
            return {
                ...state,
                fetchingResume: false,
                error: action.error
            };
        default:
            return state;
    }
}

export default resumeReducer;
