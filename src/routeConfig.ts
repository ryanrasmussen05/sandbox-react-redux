import HomePage from "./components/home/HomePage";
import ResumePage from "./components/resume/ResumePage";
import BridgePage from "./components/sandbox/bridge/BridgePage";
import CarSimPage from "./components/sandbox/carSim/CarSimPage";
import FireworksPage from "./components/sandbox/fireworks/FireworksPage";
import MontyHallPage from "./components/sandbox/montyHall/MontyHallPage";
import ParticlesPage from "./components/sandbox/particles/ParticlesPage";
import ParticlesTwoPage from "./components/sandbox/particlesTwo/ParticlesTwoPage";
import PhysicsIntroPage from "./components/sandbox/physicsIntro/PhysicsIntroPage";
import SandboxPage from "./components/sandbox/SandboxPage";
import SolarSystemPage from "./components/sandbox/solarSystem/SolarSystemPage";

export interface RouteConfig {
    path: string;
    component: any;
}

export const routes: RouteConfig[] = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/resume',
        component: ResumePage
    },
    {
        path: '/sandbox',
        component: SandboxPage
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
    },
    {
        path: '/sandbox/montyHall',
        component: MontyHallPage
    }
];