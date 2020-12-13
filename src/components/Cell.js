
import   React  from "react";
import './Cell.css';

export class Cell extends React.Component{
    constructor(props){
        super(props);
        this.getPlayer = this.getPlayer.bind(this);
        this.clicked = this.clicked.bind(this);
        this.toString = this.toString.bind(this); 
    }
    //
    getPlayer(){
        return this.props.player;
    }
    //
    clicked(){        
        let {onSelected,rowNumber,colNumber} = this.props;
        onSelected(rowNumber,colNumber);
    }
    //
    render(){
        var {cssClass,player} = this.props;
        player =player ? player:'*';
        return <div onClick={this.clicked} className={cssClass}>{player}</div>;
    }
    //
    toString(){
        return `row:${this.rowNumber},col:${this.colNumber},player:${this.player}`;
    }
}