import React from 'react';
import { Dispatch } from 'redux';
import { AppState } from '../reducers';
import { getProjects } from '../actions/projectActions';
import { connect } from 'react-redux';

interface TestProps {
    count: number;
    lastUpdate: string;
    handleClick: () => void;
}

class Test extends React.Component<TestProps> {
    render() {
        return (
            <div>
                <p>Click Count: {this.props.count}</p>
                <p>Last Update: {this.props.lastUpdate}</p>
                <button onClick={this.props.handleClick}>Update</button>
            </div>
        );
    }
}

function mapStateToProps(state: AppState) {
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