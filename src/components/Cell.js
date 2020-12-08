
import   React  from "react";
import './Cell.css';

export class Cell extends React.Component{
    constructor(props){
        super(props);
        this.state = {player : null};
        console.log(props);
        let {onSelected,rowNumber,colNumber } = props;
        // this.rowNumber = props.rowNumber;
        // this.colNumber = props.colNumber;
    }
    //
    setPlayer(player){
        this.setState({ player : player});
    }
    //
     getPlayer(){
        return this.state.player;
    }
    //
    clicked(){
        
        this.props.onSelected(this.rowNumber)
    }
    //
    render(){
        var {selected,cssClass} = this.props;
        return <div onClick={this.clicked} className={cssClass}>1</div>;
    }
}