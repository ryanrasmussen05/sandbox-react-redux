import { GET_PROJECTS } from '../constants/actionTypes';

export function getProjects(lastUpdate: string) {
    return {
        type: GET_PROJECTS,
        lastUpdate: lastUpdate
    }
}