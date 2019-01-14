import React from 'react';
import Header from '../../common/Header';
import {match} from 'react-router';
import './PhysicsIntroPage.scss';

let Physics: any = require('physicsjs/dist/physicsjs-full.js');

interface PhysicsIntroPageProps {
    match: match
}

class PhysicsIntroPage extends React.Component<PhysicsIntroPageProps> {
    world: any;
    canvasWrapper: HTMLDivElement | null = null;

    constructor(props: PhysicsIntroPageProps) {
        super(props);

        this.reset = this.reset.bind(this);
        this.draw = this.draw.bind(this);
    }

    render() {
        return (
            <div className="physics-intro-page">
                <Header currentPath={this.props.match.url}/>

                <div className="physics-intro-canvas-wrapper" id="physics" ref={(node: HTMLDivElement) => {
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

            component.world = Physics({ sleepDisabled: true });

            const renderer: any = Physics.renderer('canvas', {
                el: 'physics'
            });
            component.world.add(renderer);

            component.world.on('step', function() {
                component.world.render();
            });

            component.world.add(Physics.behavior('interactive', { el: renderer.container }));

            const edgeBounce = Physics.behavior('edge-collision-detection', {
                aabb: viewportBounds,
                restitution: 0.99, // energy % after collision
                cof: 0.8 // friction with boundaries
            });

            const circles = [];

            for (let counter = 0; counter < 100; counter++) {
                circles.push(
                    Physics.body('circle', {
                        x: Math.random() * width, // (width - 10) + 10,
                        y: Math.random() * height, // (height - 10) + 10,
                        mass: 1,
                        radius: 4,
                        vx: Math.random() * 0.01 - 0.005,
                        vy: Math.random() * 0.01 - 0.005,
                        restitution: 0.99,
                        styles: {
                            fillStyle: '#'+Math.floor(Math.random()*16777215).toString(16)
                        }
                    })
                );
            }

            component.world.add(circles);

            const attractor = Physics.behavior('attractor', {
                order: 0,
                strength: 0.002
            });

            component.world.on({
                'interact:poke': function(pos: any) {
                    component.world.wakeUpAll();
                    attractor.position(pos);
                    component.world.add( attractor );
                },
                'interact:move': function(pos: any) {
                    attractor.position(pos);
                },
                'interact:release': function() {
                    component.world.wakeUpAll();
                    component.world.remove( attractor );
                }
            });

            component.world.add([
                Physics.behavior('newtonian', { strength: 0.01 }),
                Physics.behavior('sweep-prune'),
                Physics.behavior('body-collision-detection', { checkAll: false }),
                Physics.behavior('body-impulse-response'),
                edgeBounce
            ]);

            Physics.util.ticker.on(function(time: any) {
                component.world.step( time );
            });

            Physics.util.ticker.start();
        }
    }
}

export default PhysicsIntroPage;