import Home from "./components/home/Home";
import Resume from "./components/resume/Resume";
import Sandbox from "./components/sandbox/Sandbox";
import ParticlesPage from "./components/sandbox/particles/ParticlesPage";
import FireworksPage from "./components/sandbox/fireworks/FireworksPage";
import PhysicsIntroPage from "./components/sandbox/physicsIntro/PhysicsIntroPage";
import ParticlesTwoPage from "./components/sandbox/particlesTwo/ParticlesTwoPage";
import SolarSystemPage from "./components/sandbox/solarSystem/SolarSystemPage";
import BridgePage from "./components/sandbox/bridge/BridgePage";
import CarSimPage from "./components/sandbox/carSim/CarSimPage";

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
    },
    {
        path: '/sandbox/particlesTwo',
        component: ParticlesTwoPage
    },
    {
        path: '/sandbox/solarSystem',
        component: SolarSystemPage
    },
    {
        path: '/sandbox/bridge',
        component: BridgePage
    },
    {
        path: '/sandbox/carSim',
        component: CarSimPage
    }
];