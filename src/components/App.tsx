import React from 'react';
import Test from './Test';

interface Props {
    x?: string
}

class App extends React.Component<Props> {
    render() {
        const temp = this.props.x;

        return (
            <div>
                {temp}
                <Test/>
            </div>

        );
    }
}

export default App;
