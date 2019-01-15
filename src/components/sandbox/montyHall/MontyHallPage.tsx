import React from 'react';
import Header from '../../common/Header';
import {match} from 'react-router';
import './MontyHallPage.scss';
import {Button} from "antd";
import {getImage} from "../../common/functions";

interface MontyHallPageProps {
    match: match
}

interface MontyHallPageState {
    winningDoor: number;
    selectedDoor?: number;
    openDoors: number[];
    gameState: string;
    finishText?: string;
}

class MontyHallPage extends React.Component<MontyHallPageProps, MontyHallPageState> {
    doors: number[] = [1, 2, 3];

    constructor(props: MontyHallPageProps) {
        super(props);

        this.state = {
            winningDoor: this.getRandomWinner(),
            gameState: 'initial',
            openDoors: [],
            selectedDoor: undefined,
            finishText: undefined
        };

        this.getRandomWinner = this.getRandomWinner.bind(this);
        this.doorClick = this.doorClick.bind(this);
        this.getImageForDoor = this.getImageForDoor.bind(this);
        this.openRandomLoser = this.openRandomLoser.bind(this);
        this.getCssClassesForDoor = this.getCssClassesForDoor.bind(this);
        this.getOtherAvailableDoor = this.getOtherAvailableDoor.bind(this);
        this.switchDoor = this.switchDoor.bind(this);
        this.finishGame = this.finishGame.bind(this);
        this.reset = this.reset.bind(this);
    }

    render() {
        return (
            <div className="monty-hall-page">
                <Header currentPath={this.props.match.url}/>

                <div className="monty-hall-buttons">
                    <Button htmlType="button" type="primary">Run 'Stick' Test</Button>
                    <Button htmlType="button" type="primary">Run 'Switch' Test</Button>
                    <Button htmlType="button" onClick={() => this.reset()}>Reset</Button>
                </div>

                <div className="monty-hall-title">Monty Hall Paradox</div>

                <div className="monty-hall-doors">
                    {this.doors.map((doorNumber: number) => (
                        <div
                            key={doorNumber}
                            className={this.getCssClassesForDoor(doorNumber)}
                            onClick={() => this.doorClick(doorNumber)}
                        >
                            <img src={this.getImageForDoor(doorNumber)} alt="door"/>
                            <div className="door-cover">{doorNumber}</div>
                        </div>
                    ))}
                </div>

                {this.state.gameState === 'initial' &&
                <div className="game-action">Choose a door</div>
                }

                {this.state.gameState === 'openLoser' &&
                <div className="game-action">
                    <Button htmlType="button" type="primary" onClick={() => this.openRandomLoser()}>Open A Losing
                        Door</Button>
                </div>
                }

                {this.state.gameState === 'stickOrSwitch' &&
                <div className="game-action">
                    <Button htmlType="button" type="primary" onClick={() => this.switchDoor(false)}>
                        {'Stick With Door ' + this.state.selectedDoor}
                    </Button>
                    <Button htmlType="button" type="primary" onClick={() => this.switchDoor(true)}>
                        {'Switch To Door ' + this.getOtherAvailableDoor()}
                    </Button>
                </div>
                }

                {this.state.gameState === 'reveal' &&
                <div className="game-action">
                    <Button htmlType="button" type="primary" onClick={() => this.finishGame()}>Reveal</Button>
                </div>
                }

                {this.state.gameState === 'gameOver' &&
                <div className="game-action">{this.state.finishText}</div>
                }

            </div>
        );
    }

    getRandomWinner(): number {
        return Math.floor(Math.random() * 3) + 1;
    }

    getCssClassesForDoor(doorNumber: number): string {
        const isSelected = this.state.selectedDoor === doorNumber;
        const isOpen = this.state.openDoors.some(x => x === doorNumber);

        let classes = 'door';
        if (isSelected) classes = classes + ' selected';
        if (isOpen) classes = classes + ' open';

        return classes;
    }

    getImageForDoor(doorNumber: number): string {
        return getImage(this.state.winningDoor === doorNumber ? 'money.png' : 'donkey.png');
    }

    doorClick(doorNumber: number): void {
        if (this.state.gameState === 'initial') {
            this.setState({
                ...this.state,
                selectedDoor: doorNumber,
                gameState: 'openLoser'
            });
        }
    }

    openRandomLoser(): void {
        const losingDoors: number[] = [];
        const randomRatio = Math.random();
        let doorToOpen: number;

        this.doors.forEach((doorNumber: number) => {
            if (doorNumber !== this.state.winningDoor && doorNumber !== this.state.selectedDoor) {
                losingDoors.push(doorNumber);
            }
        });

        if (randomRatio < 0.5 || losingDoors.length === 1) {
            doorToOpen = losingDoors[0];
        } else {
            doorToOpen = losingDoors[1];
        }

        this.setState({
            ...this.state,
            gameState: 'stickOrSwitch',
            openDoors: [...this.state.openDoors, doorToOpen]
        })
    }

    getOtherAvailableDoor(): number {
        let returnDoor: number = 0;

        this.doors.forEach(door => {
            if (door !== this.state.selectedDoor && !this.state.openDoors.some(x => x === door)) {
                returnDoor = door;
            }
        });

        return returnDoor;
    }

    switchDoor(shouldSwitch: boolean): void {
        let selectedDoor = this.state.selectedDoor;

        if (shouldSwitch) {
            selectedDoor = this.getOtherAvailableDoor();
        }

        this.setState({
            ...this.state,
            selectedDoor: selectedDoor,
            gameState: 'reveal'
        });
    }

    finishGame(): void {
        const win = this.state.selectedDoor === this.state.winningDoor;
        const finishText = win ? 'You Win!' : 'You Lost';

        this.setState({
            ...this.state,
            openDoors: this.doors,
            finishText: finishText,
            gameState: 'gameOver'
        })
    }

    reset(): void {
        this.setState({
            winningDoor: this.getRandomWinner(),
            gameState: 'initial',
            openDoors: [],
            selectedDoor: undefined,
            finishText: undefined
        });
    }
}

export default MontyHallPage;