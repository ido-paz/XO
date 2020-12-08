
import   React  from "react";
import './Cell.css';

export class Cell extends React.Component{
    constructor(props){
        super(props);
        this.state = {player : null}; 
        this.getPlayer = this.getPlayer.bind(this);
        this.clicked = this.clicked.bind(this);
        this.toString = this.toString.bind(this); 
        //this.setPlayer = this.setPlayer.bind(this);                  
    }
    //
    // componentDidMount(){
    //     console.log('cdm');        
    // }
    //
    setPlayer =(p)=>{
        console.log(p);
        this.setState({ player : p});
    }
    //
    // setPlayer(p){
    //     this.setState({ player : p});
    // }
    //
     getPlayer(){
        return this.state.player;
    }
    //
    clicked(){        
        let {onSelected,rowNumber,colNumber} = this.props;
        onSelected(rowNumber,colNumber);
    }
    //
    render(){
        var {cssClass} = this.props;
        let player =this.state && this.state.player ? this.state.player:'*';
        return <div onClick={this.clicked} className={cssClass}>{player}</div>;
    }
    //
    toString(){
        return `row:${this.rowNumber},col:${this.colNumber},player:${this.state.player}`;
    }
}