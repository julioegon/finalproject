getCurrentDisplay() {
    const step = this.StaticRange.step;
    if (step=='something'){
        return(
            <div>show 1st display</div>
        )
    } else if(step=='somethingelse'){
        return(
            <div>show 2nd display</div>
        )
    } else {
        // and so on and so forth
    }
}


render()    {
    return(
        <div>{this.getCurrentDisplay()}</div>
    )
}