import {AppState} from "./index";
import {createSelector} from "reselect";
import {ProjectState} from "./projectReducer";

const getProjectState = (state: AppState) => state.projectState;

export const isFetchingProjects = createSelector(
    [getProjectState],
    (state: ProjectState) => state.fetchingProjects

);

export const getProjects = createSelector(
    [getProjectState],
    (state: ProjectState) => state.projects
);