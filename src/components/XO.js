import React from 'react';
import { Cell } from '../components/Cell';
import { createMatrix } from '../models/Utils';
import "./XO.css";
export class XO extends React.Component{
    constructor(props){
        super(props);     
        this.initialize = this.initialize.bind(this);
        this.initialize();
    }
    //
    initialize(){
        this.startedDate=new Date();
        this.endedDate = null;
        this.winningPlayer = undefined;        
        this.cells = createMatrix(3,3);
        this.currentMoveCount = 0;
        this.maximumMoveCount = 3*3;
        this.players = ['X','O'];
        this.state = {currentPlayer : this.players[0],isGameOver :false};
        //        
        this.togglePlayer = this.togglePlayer.bind(this);
        this.move = this.move.bind(this);
        this.isValidMove = this.isValidMove.bind(this);
        this.didPlayerWon = this.didPlayerWon.bind(this);
        this.didWonVerticaly = this.didWonVerticaly.bind(this);
        this.didWonHorizontaly = this.didWonHorizontaly.bind(this);
        this.didWonDiagonaly = this.didWonDiagonaly.bind(this);
        this.startGame= this.startGame.bind(this);
    }
    //
    startGame(){
        this.initialize();
        this.setState({currentPlayer:undefined,isGameOver:false});
    }
    //
    togglePlayer(){
        return this.state.currentPlayer === this.players[0]?
                this.players[1]:
                this.players[0];
    }
    //
    move(rowIndex,columnIndex){
        console.log(rowIndex,columnIndex);
        if (!this.state.isGameOver)
        {
            let currentPlayer = this.togglePlayer();
            if(this.isValidMove(rowIndex,columnIndex)) {                
                this.cells[rowIndex][columnIndex]= currentPlayer;  
                let isGameOver = this.didPlayerWon(rowIndex,columnIndex);
                this.currentMoveCount++;
                if(isGameOver){
                    this.endedDate = new Date();
                    this.winningPlayer = currentPlayer;
                }
                else
                    isGameOver = this.currentMoveCount === this.maximumMoveCount;
                this.setState({currentPlayer:currentPlayer,isGameOver:isGameOver});
                return isGameOver; 
            }   
        }
        return false;
    }
    //
    isValidMove(rowIndex,columnIndex){
        return !this.cells[rowIndex][columnIndex];
    }
    //check Vertical , Horizontal , Diagonaly
    didPlayerWon(rowIndex,columnIndex) {       
        return this.didWonVerticaly(columnIndex) || this.didWonHorizontaly(rowIndex) || this.didWonDiagonaly();        
    }
    //
    didWonVerticaly(columnIndex){
        var m = this.cells;
        var p = m[0][columnIndex];
        let matchCount=0;
        if (p) {
            for (let rowIndex = 0; rowIndex < m.length; rowIndex++) 
                if (m[rowIndex][columnIndex]===p) 
                    matchCount++;
        }
        return matchCount===m.length;  
    }
    //
    didWonHorizontaly(rowIndex){
        var m = this.cells;
        var p = m[rowIndex][0];
        let matchCount=0;
        if (p) {
            for (let columnIndex = 0; columnIndex < m.length; columnIndex++) 
                if (m[rowIndex][columnIndex]===p) 
                    matchCount++;
        }
        return matchCount===m.length;  
    }
    //
    didWonDiagonaly(){
        let m = this.cells;
        let p = m[1][1];
        if (p) {
            return (p===m[0][0] && p===m[2][2]) || 
                   (p===m[0][2] && p===m[2][0]);    
        }
        return false;
    }
    //
    render(){       
        
        if (this.state.isGameOver){
            let message = this.winningPlayer? `Player ${this.winningPlayer} won!!`:'Draw...';
            return <div>
                    {message}
                    <div><button onClick={this.startGame}>Play again</button></div>
                    </div>;
        }
        else{
            let cells = this.cells;            
            let board =[];
            for (let i = 0,keyID=0; i < cells.length; i++) {
                for (let j = 0; j < cells[i].length; j++,keyID++) {
                    board.push(<Cell key={keyID} 
                                player={cells[i][j]}
                                onSelected={this.move}
                                rowNumber={i} 
                                colNumber={j}></Cell>);            
                }
            }
            return  <div className="xo">{board}</div>;
        }
    }
}