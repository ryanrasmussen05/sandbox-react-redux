import Home from "./components/home/Home";
import Resume from "./components/resume/Resume";
import Sandbox from "./components/sandbox/Sandbox";
import ParticlesPage from "./components/sandbox/particles/ParticlesPage";
import FireworksPage from "./components/sandbox/fireworks/FireworksPage";
import PhysicsIntroPage from "./components/sandbox/physicsIntro/PhysicsIntroPage";

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
        component: ParticlesPage
    },
    {
        path: '/sandbox/fireworks',
        component: FireworksPage
    },
    {
        path: '/sandbox/physics',
        component: PhysicsIntroPage
    }
];