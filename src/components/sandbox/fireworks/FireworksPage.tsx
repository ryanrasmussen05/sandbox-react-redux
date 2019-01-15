import React from 'react';
import { match } from 'react-router';
import Header from '../../common/Header';
import { Firework } from "./firework";
import './FireworksPage.scss';
import { Particle } from "./particle";

interface FireworksPageProps {
    match: match
}

class FireworksPage extends React.Component<FireworksPageProps> {
    canvasWrapper: HTMLDivElement | null = null;
    canvas: HTMLCanvasElement | null = null;
    ctx: CanvasRenderingContext2D | null = null;

    fireworks: Firework[] = [];
    particles: Particle[] = [];
    hue: number = 0;

    mouseDown: boolean = false;
    mouseX: number = 0;
    mouseY: number = 0;

    timerTick: number = 0;
    timerTotal: number = 0;
    limiterTick: number = 0;
    limiterTotal: number = 0;

    screenWidth: number = 0;
    screenHeight: number = 0;

    intervalId: number = 0;

    constructor(props: FireworksPageProps) {
        super(props);

        this.reset = this.reset.bind(this);
        this.initCanvas = this.initCanvas.bind(this);
        this.draw = this.draw.bind(this);
        this.createParticles = this.createParticles.bind(this);
        this.getRange = this.getRange.bind(this);
        this.addMouseListeners = this.addMouseListeners.bind(this);
    }

    render() {
        return (
            <div className="fireworks-page">
                <Header currentPath={this.props.match.url}/>

                <div className="fireworks-canvas-wrapper" ref={(node: HTMLDivElement) => {
                    this.canvasWrapper = node;
                }}>
                    <canvas className="fireworks-canvas" ref={(node: HTMLCanvasElement) => {
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
            this.fireworks = [];
            this.particles = [];
            this.hue = 120;
            this.mouseDown = false;
            this.timerTick = 0;
            this.timerTotal = 30;
            this.limiterTick = 0;
            this.limiterTotal = 5;

            this.ctx = this.canvas.getContext('2d');
            this.addMouseListeners();

            this.screenWidth = this.canvasWrapper.offsetWidth;
            this.screenHeight = this.canvasWrapper.offsetHeight;
            this.canvas.width = this.screenWidth;
            this.canvas.height = this.screenHeight;

            this.initCanvas();
        }
    }

    initCanvas(): void {
        this.intervalId = window.setInterval(() => {
            this.draw();
        }, 25);
    }

    draw(): void {
        if (this.ctx) {
            this.hue += 0.5;

            this.ctx.globalCompositeOperation = 'source-over';
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            this.ctx.fillRect(0, 0, this.screenWidth, this.screenHeight);
            this.ctx.globalCompositeOperation = 'lighter';

            const fireworksToRemove: number[] = [];
            const particlesToRemove: number[] = [];

            this.fireworks.forEach((firework, index) => {
                if (this.ctx) {
                    firework.draw(this.ctx, this.hue);
                    const exploded: boolean = firework.update();

                    if (exploded) {
                        this.createParticles(firework.x, firework.y, this.hue);
                        fireworksToRemove.unshift(index);
                    }
                }
            });

            this.particles.forEach((particle, index) => {
                if (this.ctx) {
                    particle.draw(this.ctx);
                    const faded: boolean = particle.update();

                    if (faded) {
                        particlesToRemove.unshift(index);
                    }
                }
            });

            for (const index of fireworksToRemove) {
                this.fireworks.splice(index, 1);
            }

            for (const index of particlesToRemove) {
                this.particles.splice(index, 1);
            }

            if (this.timerTick >= this.timerTotal) {
                if (!this.mouseDown) {
                    this.fireworks.push(new Firework(this.screenWidth / 2, this.screenHeight,
                        this.getRange(this.screenWidth / 3, 2 * this.screenWidth / 3), this.getRange(0, this.screenHeight / 2),
                        this.screenWidth));
                    this.timerTick = 0;
                }
            } else {
                this.timerTick++;
            }

            if (this.limiterTick >= this.limiterTotal) {
                if (this.mouseDown) {
                    this.fireworks.push(new Firework(this.screenWidth / 2, this.screenHeight,
                        this.mouseX, this.mouseY, this.screenWidth));
                    this.limiterTick = 0;
                }
            } else {
                this.limiterTick++;
            }
        }
    }

    createParticles(x: number, y: number, hue: number) {
        for (let i = 0; i < 50; i++) {
            this.particles.push(new Particle(x, y, hue));
        }
    }

    getRange(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    addMouseListeners(): void {
        const that = this;

        if (this.canvas) {
            this.canvas.addEventListener('mousemove', function (event: MouseEvent) {
                if (that.canvas) {
                    that.mouseX = event.pageX - that.canvas.offsetLeft;
                    that.mouseY = event.pageY - that.canvas.offsetTop;
                }
            });

            this.canvas.addEventListener('mousedown', function (event: MouseEvent) {
                event.preventDefault();
                that.mouseDown = true;
            });

            this.canvas.addEventListener('mouseup', function (event: MouseEvent) {
                event.preventDefault();
                that.mouseDown = false;
            });
        }
    }
}

export default FireworksPage;