
import   React  from "react";

export class Cell extends React.Component{
    constructor(props){
        this.super(props);
        this.player = null;
    }
    //
    render(){
        var {selected,cssClass} = this.props;
        return <div onClick={selected} className={cssClass}></div>;
    }
}