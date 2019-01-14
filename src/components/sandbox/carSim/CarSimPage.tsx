import React from 'react';
import Header from '../../common/Header';
import {match} from 'react-router';
import './CarSimPage.scss';

let Physics: any = require('physicsjs/dist/physicsjs-full.js');

interface CarSimPageProps {
    match: match
}

class CarSimPage extends React.Component<CarSimPageProps> {
    world: any;
    canvasWrapper: HTMLDivElement | null = null;

    constructor(props: CarSimPageProps) {
        super(props);

        this.reset = this.reset.bind(this);
        this.draw = this.draw.bind(this);
    }

    render() {
        return (
            <div className="car-sim-page">
                <Header currentPath={this.props.match.url}/>

                <div className="car-sim-canvas-wrapper" id="physics" ref={(node: HTMLDivElement) => {
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

        Physics.behavior('torque', function(parent: any) {

            const defaults = {
                torque: 0.1
            };

            return {
                init: function(options: any) {
                    const self: any = this;
                    parent.init.call(self);
                    self.options.defaults(defaults);
                    self.options(options);
                },

                behave: function(data: any) {
                    const self: any = this;

                    const bodies = self.getTargets();

                    for (let i = 0; i < bodies.length; i++) {
                        const angularAcceleration = self.options.torque / bodies[i].moi;
                        bodies[i].state.angular.vel = bodies[i].state.angular.vel + angularAcceleration;
                    }
                }
            };
        });

        Physics.body('beam', 'rectangle', function(parent: any) {
            return {
                buildFromPoints: function(pointA: any, pointB: any) {
                    const self: any = this;

                    const centerPoint = {
                        x: (pointA.x + pointB.x) / 2,
                        y: (pointA.y + pointB.y) / 2
                    };

                    const scratch = Physics.scratchpad();
                    const tempVector = scratch.vector().set(pointB.x - pointA.x, pointB.y - pointA.y);
                    const angle = tempVector.angle() + (Math.PI / 2);
                    const length = tempVector.norm();
                    scratch.done();

                    self.state.pos.x = centerPoint.x;
                    self.state.pos.y = centerPoint.y;

                    self.geometry.width = 5;
                    self.geometry.height = length;

                    self.state.angular.pos = angle;
                }
            };
        });

        this.draw();
    }

    draw(): void {
        if (this.canvasWrapper) {
            const component = this;

            const width = this.canvasWrapper.offsetWidth;
            const height = this.canvasWrapper.offsetHeight;

            component.world = Physics();

            component.world.add([
                Physics.behavior('constant-acceleration'),
                Physics.behavior('sweep-prune'),
                Physics.behavior('body-collision-detection'),
                Physics.behavior('body-impulse-response'),
                Physics.behavior('edge-collision-detection', {
                    aabb: Physics.aabb(0, 0, width, height),
                    restitution: 0.0,
                    cof: 0
                })
            ]);

            const renderer = Physics.renderer('canvas', {el: 'physics'});
            component.world.add(renderer);

            component.world.on('step', function() {
                component.world.render();
            });

            Physics.util.ticker.on(function(time: any) {
                component.world.step(time);
            });

            Physics.util.ticker.start();

            // draw road
            let y = height * 0.9;

            for (let x = 0; x < width; x += 100) {
                const leftPoint = {
                    x: x,
                    y: y
                };

                y = y * 0.95;

                const rightPoint = {
                    x: x + 100,
                    y: y
                };

                const roadSection = Physics.body('beam', {
                    treatment: 'static',
                    restitution: 0.0,
                    cof: 1.0
                });
                roadSection.buildFromPoints(leftPoint, rightPoint);

                component.world.add(roadSection);
            }

            // draw car
            const wheels = [];

            wheels.push(Physics.body('circle', {
                x: 50,
                y: 50,
                radius: 30,
                cof: 1.0
            }));

            wheels.push(Physics.body('circle', {
                x: 150,
                y: 50,
                radius: 30,
                cof: 1.0
            }));

            const rigidConstraints = Physics.behavior('verlet-constraints', {
                iterations: 3
            });

            rigidConstraints.distanceConstraint(wheels[0], wheels[1], 1);

            component.world.on('render', function() {
                const constraint = rigidConstraints.getConstraints().distanceConstraints[0];
                renderer.drawLine(constraint.bodyA.state.pos, constraint.bodyB.state.pos, 'rgba(0, 0, 0, 1.0)');
            });


            component.world.add(Physics.behavior('torque', {torque: 0.05}).applyTo(wheels));
            component.world.add(wheels);
            component.world.add(rigidConstraints);
        }
    }
}

export default CarSimPage;