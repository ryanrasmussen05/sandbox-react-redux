import {AppState} from "./index";
import {createSelector} from "reselect";
import {ProjectState} from "./projectReducer";
import {ResumeState} from "./resumeReducer";

const getProjectState = (state: AppState) => state.projectState;
const getResumeState = (state: AppState) => state.resumeState;

export const isFetchingProjects = createSelector(
    [getProjectState],
    (state: ProjectState) => state.fetchingProjects

);

export const getProjects = createSelector(
    [getProjectState],
    (state: ProjectState) => state.projects
);

export const isFetchingResume = createSelector(
    [getResumeState],
    (state: ResumeState) => state.fetchingResume
);

export const getResume = createSelector(
    [getResumeState],
    (state: ResumeState) => state.resume
);