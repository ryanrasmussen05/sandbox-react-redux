import React from 'react';
import Header from '../../common/Header';
import {match} from 'react-router';
import './SolarSystemPage.scss';

let Physics: any = require('physicsjs/dist/physicsjs-full.js');

interface SolarSystemPageProps {
    match: match
}

class SolarSystemPage extends React.Component<SolarSystemPageProps> {
    world: any;
    canvasWrapper: HTMLDivElement | null = null;

    constructor(props: SolarSystemPageProps) {
        super(props);

        this.reset = this.reset.bind(this);
        this.draw = this.draw.bind(this);
    }

    render() {
        return (
            <div className="solar-system-page">
                <Header currentPath={this.props.match.url}/>

                <div className="solar-system-canvas-wrapper" id="physics" ref={(node: HTMLDivElement) => {
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

export default SolarSystemPage;