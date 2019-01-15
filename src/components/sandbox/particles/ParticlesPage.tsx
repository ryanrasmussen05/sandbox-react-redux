import { Select, Switch } from "antd";
import React from 'react';
import { match } from 'react-router';
import Header from '../../common/Header';
import { Particle } from "./particle";
import './ParticlesPage.scss';

interface PhysicsNormal {
    x: number;
    y: number;
}

interface ParticlesPageProps {
    match: match
}

interface ParticlesPageState {
    orbs: string;
    collisions: boolean;
    gravity: boolean;
}

class ParticlesPage extends React.Component<ParticlesPageProps, ParticlesPageState> {
    canvasWrapper: HTMLDivElement | null = null;
    canvas: HTMLCanvasElement | null = null;
    ctx: CanvasRenderingContext2D | null = null;

    particles: Particle[] = [];

    screenWidth: number = 0;
    screenHeight: number = 0;

    intervalId: number = 0;

    constructor(props: ParticlesPageProps) {
        super(props);

        this.state = {
            orbs: '30',
            collisions: true,
            gravity: false
        };

        this.reset = this.reset.bind(this);
        this.initCanvas = this.initCanvas.bind(this);
        this.draw = this.draw.bind(this);
        this.calculateCollisions = this.calculateCollisions.bind(this);
        this.collisionsChanged = this.collisionsChanged.bind(this);
        this.gravityChanged = this.gravityChanged.bind(this);
        this.orbsChanged = this.orbsChanged.bind(this);
    }

    render() {
        return (
            <div className="particles-page">
                <Header currentPath={this.props.match.url}/>

                <div className="particles-controls">
                    <div className="particles-control-toggle">
                        <Switch defaultChecked={this.state.gravity} onChange={this.gravityChanged}/> Gravity
                    </div>
                    <div className="particles-control-toggle">
                        <Switch defaultChecked={this.state.collisions} onChange={this.collisionsChanged}/> Collisions
                    </div>
                    <Select
                        style={{width: 100}}
                        defaultValue={this.state.orbs}
                        className="particles-control-select"
                        onChange={this.orbsChanged}
                    >
                        <Select.Option value="10">10 Orbs</Select.Option>
                        <Select.Option value="20">20 Orbs</Select.Option>
                        <Select.Option value="30">30 Orbs</Select.Option>
                        <Select.Option value="40">40 Orbs</Select.Option>
                        <Select.Option value="50">50 Orbs</Select.Option>
                    </Select>
                </div>

                <div className="particles-canvas-wrapper" ref={(node: HTMLDivElement) => {
                    this.canvasWrapper = node;
                }}>
                    <canvas className="particles-canvas" ref={(node: HTMLCanvasElement) => {
                        this.canvas = node;
                    }}>
                    </canvas>
                </div>
            </div>
        );
    }

    componentDidMount(): void {
        this.reset();

        window.addEventListener('resize', this.reset);
    }

    componentWillUnmount(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }

        window.removeEventListener('resize', this.reset);
    }

    reset(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }

        if (this.canvas && this.canvasWrapper) {
            this.ctx = this.canvas.getContext('2d');

            this.screenWidth = this.canvasWrapper.offsetWidth;
            this.screenHeight = this.canvasWrapper.offsetHeight;
            this.canvas.width = this.screenWidth;
            this.canvas.height = this.screenHeight;

            this.particles = [];

            this.initCanvas();
        }
    }

    initCanvas(): void {
        for (let i = 0; i < +this.state.orbs; i++) {
            this.particles.push(new Particle(this.screenWidth, this.screenHeight));
        }

        this.intervalId = window.setInterval(() => {
            this.draw();
        }, 16);
    }

    draw(): void {
        if (this.ctx) {
            this.ctx.globalCompositeOperation = 'source-over';
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(0, 0, this.screenWidth, this.screenHeight);

            this.ctx.globalCompositeOperation = 'lighter';

            this.particles.forEach((particle) => {
                if (this.ctx) {
                    particle.draw(this.ctx, this.state.gravity);
                }
            });

            if (this.state.collisions) {
                this.calculateCollisions();
            }
        }
    }

    calculateCollisions(): void {
        this.particles.forEach((particleA, index) => {
            for (let i = index + 1; i < this.particles.length; i++) {
                const particleB = this.particles[i];

                if (particleA.isCollided(particleB)) {
                    const distance = Math.sqrt(Math.pow(particleA.x - particleB.x, 2) + Math.pow(particleA.y - particleB.y, 2));

                    const collisionNormal: PhysicsNormal = {
                        x: (particleA.x - particleB.x) / distance,
                        y: (particleA.y - particleB.y) / distance
                    };

                    // Decompose particleA velocity into parallel and orthogonal part
                    const particleADot = collisionNormal.x * particleA.vx + collisionNormal.y * particleA.vy;
                    const particleACollide: PhysicsNormal = {
                        x: collisionNormal.x * particleADot,
                        y: collisionNormal.y * particleADot
                    };
                    const particleARemainder: PhysicsNormal = {
                        x: particleA.vx - particleACollide.x,
                        y: particleA.vy - particleACollide.y
                    };

                    // Decompose particleB velocity into parallel and orthogonal part
                    const particleBDot = collisionNormal.x * particleB.vx + collisionNormal.y * particleB.vy;
                    const particleBCollide: PhysicsNormal = {
                        x: collisionNormal.x * particleBDot,
                        y: collisionNormal.y * particleBDot
                    };
                    const particleBRemainder: PhysicsNormal = {
                        x: particleB.vx - particleBCollide.x,
                        y: particleB.vy - particleBCollide.y
                    };

                    // calculate changes in velocity perpendicular to collision plane, conservation of momentum
                    const newVelX1 = (particleACollide.x * (particleA.mass - particleB.mass) + (2 * particleB.mass * particleBCollide.x)) / (particleA.mass + particleB.mass);
                    const newVelY1 = (particleACollide.y * (particleA.mass - particleB.mass) + (2 * particleB.mass * particleBCollide.y)) / (particleA.mass + particleB.mass);
                    const newVelX2 = (particleBCollide.x * (particleB.mass - particleA.mass) + (2 * particleA.mass * particleACollide.x)) / (particleA.mass + particleB.mass);
                    const newVelY2 = (particleBCollide.y * (particleB.mass - particleA.mass) + (2 * particleA.mass * particleACollide.y)) / (particleA.mass + particleB.mass);

                    // add collision result to remaining parallel velocities
                    particleA.vx = newVelX1 + particleARemainder.x;
                    particleA.vy = newVelY1 + particleARemainder.y;
                    particleB.vx = newVelX2 + particleBRemainder.x;
                    particleB.vy = newVelY2 + particleBRemainder.y;
                }
            }
        });
    }

    collisionsChanged(on: boolean): void {
        this.setState({
            ...this.state,
            collisions: on
        });
    }

    gravityChanged(on: boolean): void {
        this.setState({
            ...this.state,
            gravity: on
        });
    }

    orbsChanged(numOrbs: string): void {
        this.setState({
            ...this.state,
            orbs: numOrbs
        }, this.reset);
    }
}

export default ParticlesPage;