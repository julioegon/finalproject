import React from 'react';
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(){
        super()
        this.state = {}
    }

    componentDidMount() {
        console.log('"uploader just mounted: ');
        console.log('this.props', this.props)
    }

    methodInUploader(){
        this.props.methodInApp('Pimento is great');
    }

    render() {
        return (
            <>
                    <h1> Hey I am your Uploader:D</h1>
                    <h2 onClick={() => this.methodInUploader()}>{" "}Click here to run the method in Uploader that triggers the one in App</h2>
                
            </>
        )
    }
}