import React from "react";
import { Cell } from '../components/Cell';
import { XO } from "../models/XO";
import "./Board.css";

export class Board extends React.Component{
    constructor(props){
        super(props);     
        //
        this.initialize = this.initialize.bind(this);
        this.move = this.move.bind(this);
        this.startGame= this.startGame.bind(this);
        //
        this.initialize();
    }
    //
    initialize(){
        this.state = {game:new XO()};
    }
    //
    startGame(){
        this.setState({game:new XO()});
    }
    //
    move(rowIndex,columnIndex){
        let game = this.state.game;
        if (!game.isGameOver)
            if(game.move(rowIndex,columnIndex))
                this.setState({game:game});
        return false;
    }
    //
    render(){       
        let board = [];
        let gameStatus=null;
        let {cells,winningPlayer,currentPlayer,isGameOver} = this.state.game; 
        if (isGameOver)
            gameStatus = winningPlayer? `Player ${winningPlayer} won!!`:'Draw...';
        else
            gameStatus = currentPlayer + ' turn' ;
        //          
        for (let i = 0,keyID=0; i < cells.length; i++) {
            for (let j = 0; j < cells[i].length; j++,keyID++) {
                board.push(<Cell key={keyID} 
                                player={cells[i][j]}
                                onSelected={this.move}
                                rowNumber={i} 
                                colNumber={j}>
                            </Cell>);            
            }
        }  
        //          
        return  <div className="board">
                    <div className='wholeLine'>
                        <button onClick={this.startGame}>Play again</button>
                    </div>
                    {board}
                    <div className='wholeLine'>{gameStatus}</div>
                </div>;
    }
}