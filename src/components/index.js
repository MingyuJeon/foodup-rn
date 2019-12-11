import React, {Component} from 'react';
import Router from '../router';

export default class Components extends Component {
    render() {
        return (
            <Router/>
        );
    }

    componentWillUnmount(): void {
        clearTimeout();
    }
}
