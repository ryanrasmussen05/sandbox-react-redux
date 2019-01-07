import React from 'react';
import { Dispatch } from 'redux';
import { State } from '../reducers';
import { getProjects } from '../actions/projectActions';
import { connect } from 'react-redux';

interface TestProps {
    count: number;
    lastUpdate: string;
    handleClick: any;
}

class Test extends React.Component<TestProps> {
    render() {
        const count = this.props.count;
        const lastUpdate = this.props.lastUpdate;
        const handleClick = this.props.handleClick;

        return (
            <div>
                <p>Click Count: {count}</p>
                <p>Last Update: {lastUpdate}</p>
                <button onClick={handleClick}>Update</button>
            </div>
        );
    }
}

function mapStateToProps(state: State) {
    return {
        count: state.projectState.count,
        lastUpdate: state.projectState.lastUpdate
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        handleClick: () => {
            dispatch(getProjects((new Date()).toLocaleTimeString()))
        }
    };
}

const ConnectedTest = connect(mapStateToProps, mapDispatchToProps)(Test);

export default ConnectedTest;