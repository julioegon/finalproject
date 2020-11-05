import React from "react";
import Logo from "./logo";
import Xmpl from './xmpl';
import Uploader from "./uploader";

export default class App extends React.Component{
    constructor(){
        super();
        this.state = {
            first: "julio",
            last: "Gonzalez",
            imgUrl: "foto",
            uploaderIsVisible: false,
        }
        this.methodInApp = this.methodInApp.bind(this);
    }
    componentDidMount(){
        console.log("App just mounted");

    }
    toggleUploader(){
        console.log("Make the uploader appear")
        
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        })
    }

    methodInApp(arg){
        console.log("running in App Component")
        console.log("the argument I got passed was:", arg);
        console.log('this.state: ', this.state);
    }

    render (){
        return (
            <>
                <Logo />
                <header>
                    <h1> Hey I am your App :D</h1>
                </header>
                <div className="main-container">
                    <Xmpl first={this.state.first} 
                    last={this.state.last}
                    imgUrl={this.state.imgUrl} />
                    {this.state.uploaderIsVisible && (<Uploader methodInApp={this.methodInApp} /> )}
                    <h2 onClick={() => this.toggleUploader()}> Changing state with a method: toggleUploader 
                    {this.state.uploaderIsVisible && "Hola"}
                    {!this.state.uploaderIsVisible && "Chao"}{" "}</h2>
                </div>
            </>
        );
    }
}