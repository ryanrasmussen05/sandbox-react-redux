import React from 'react';
import { match } from 'react-router';
import Header from '../../common/Header';
import './ParticlesTwoPage.scss';

let Physics: any = require('physicsjs/dist/physicsjs-full.js');

interface ParticlesTwoPageProps {
    match: match
}

class ParticlesTwoPage extends React.Component<ParticlesTwoPageProps> {
    world: any;
    canvasWrapper: HTMLDivElement | null = null;

    constructor(props: ParticlesTwoPageProps) {
        super(props);

        this.reset = this.reset.bind(this);
        this.draw = this.draw.bind(this);
    }

    render() {
        return (
            <div className="particles-two-page">
                <Header currentPath={this.props.match.url}/>

                <div className="particles-two-canvas-wrapper" id="physics" ref={(node: HTMLDivElement) => {
                    this.canvasWrapper = node;
                }}>
                </div>
            </div>
        );
    }

    componentDidMount(): void {
        this.reset();
        window.addEventListener('resize', this.reset);
    }

    componentWillUnmount(): void {
        this.world.destroy();
        window.removeEventListener('resize', this.reset);
    }

    reset(): void {
        if (this.world) {
            this.world.destroy();
        }
        this.draw();
    }

    draw(): void {
        if (this.canvasWrapper) {
            const component = this;

            const width = this.canvasWrapper.offsetWidth;
            const height = this.canvasWrapper.offsetHeight;
            let viewportBounds = Physics.aabb(0, 0, width, height);

            component.world = Physics({sleepDisabled: true});

            const renderer: any = Physics.renderer('canvas', {
                el: 'physics'
            });
            component.world.add(renderer);

            component.world.on('step', function () {
                component.world.render();
            });

            const edgeBounce = Physics.behavior('edge-collision-detection', {
                aabb: viewportBounds,
                restitution: 1.0, // energy % after collision
                cof: 0.0 // friction with boundaries
            });

            const circles = [];

            for (let counter = 0; counter < 30; counter++) {
                circles.push(
                    Physics.body('circle', {
                        x: Math.random() * width,
                        y: Math.random() * height,
                        mass: 1,
                        radius: 30,
                        vx: Math.random() - 0.5,
                        vy: Math.random() - 0.5,
                        restitution: 1.0,
                        cof: 0.0,
                        styles: {
                            fillStyle: '#' + Math.floor(Math.random() * 16777215).toString(16)
                        }
                    })
                );
            }

            component.world.add(circles);

            component.world.add([
                Physics.behavior('sweep-prune'),
                Physics.behavior('body-collision-detection'),
                Physics.behavior('body-impulse-response'),
                edgeBounce
            ]);

            Physics.util.ticker.on(function (time: any) {
                component.world.step(time);
            });

            Physics.util.ticker.start();
        }
    }
}

export default ParticlesTwoPage;