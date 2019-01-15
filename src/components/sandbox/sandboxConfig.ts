export interface SandboxSection {
    title: string;
    links: SandboxLink[];
    image: string;
}

export interface SandboxLink {
    title: string;
    link: string;
}

export const sandboxConfig: SandboxSection[] = [
    {
        title: 'HTML Canvas',
        image: 'html5.png',
        links: [
            {title: 'Particles', link: '/sandbox/particles'},
            {title: 'Fireworks', link: '/sandbox/fireworks'}
        ]
    },
    {
        title: 'PhysicsJS',
        image: 'physicsjs.png',
        links: [
            {title: 'PhysicsJS Intro', link: '/sandbox/physics'},
            {title: 'Particles', link: '/sandbox/particlesTwo'},
            {title: 'Solar System', link: '/sandbox/solarSystem'},
            {title: 'Bridge', link: '/sandbox/bridge'},
            {title: 'Angular Acceleration', link: '/sandbox/carSim'}
        ]
    },
    {
        title: 'Other Development',
        image: 'other-development.png',
        links: [
            {title: 'Monty Hall Paradox', link: '/sandbox/montyHall'}
        ]
    }
];