import React, { Component } from 'react';
import './Result.css';

class Result extends Component {
    constructor(props){
        super(props);

        this.state = {
            a: this.props.a,
            b: this.props.b,
            c: this.props.c,
            d: this.props.d
        }
    }

    render() { 
        return ( 
            <div className="result">
                a: {this.state.a}<br/>
                b: {this.state.b}<br/>
                c: {this.state.c}<br/>
                d: {this.state.d}<br/>
            </div>
        );
    }
}
 
export default Result;