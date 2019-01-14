import Home from "./components/home/Home";
import Resume from "./components/resume/Resume";
import Sandbox from "./components/sandbox/Sandbox";

export interface RouteConfig {
    path: string;
    component: any;
}

export const routes: RouteConfig[] = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/resume',
        component: Resume
    },
    {
        path: '/sandbox',
        component: Sandbox
    },
    {
        path: '/sandbox/particles',
        component: Sandbox
    }
];