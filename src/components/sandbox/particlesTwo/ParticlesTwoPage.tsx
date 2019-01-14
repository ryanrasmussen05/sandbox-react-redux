import React from 'react';
import Header from '../../common/Header';
import {match} from 'react-router';
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

        }
    }
}

export default ParticlesTwoPage;