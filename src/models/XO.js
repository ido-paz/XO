import React from 'react';
import { Cell } from '../components/Cell';
import { Board } from "./Board";
import "./XO.css";
export class XO extends React.Component{
    constructor(props){
        super(props);
        this.initialize = this.initialize.bind(this);
        this.getPlayer = this.togglePlayer.bind(this);
        this.move = this.move.bind(this);
        this.isValidMove = this.isValidMove.bind(this);
        this.didPlayerWon = this.didPlayerWon.bind(this);
        this.didWonVerticaly = this.didWonVerticaly.bind(this);
        this.didWonHorizontaly = this.didWonHorizontaly.bind(this);
        this.didWonDiagonaly = this.didWonDiagonaly.bind(this);
        this.initialize();
    }
    //
    initialize(){
        this.startedDate=new Date();
        this.endedDate = null;
        this.isGameOver = false;
        this.winningPlayer = null;
        let board = new Board(3);
        this.cells =board.cells;
        this.players = ['X','O'];
        this.currentPlayer = this.players[0];
    }
    //
    getPlayer(){
        return this.currentPlayer;
    }
    //
    togglePlayer(){
        return this.currentPlayer && this.currentPlayer==this.players[0]?
                    this.players[1]:
                    this.players[0];
    }
    //
    move(rowIndex,columnIndex){
        console.log(rowIndex,columnIndex);
        if (!this.isGameOver)
        {
            if(this.isValidMove(rowIndex,columnIndex)) {
                this.currentPlayer = this.togglePlayer();
                this.cells[rowIndex][columnIndex].setPlayer(this.currentPlayer);  
                this.isGameOver = this.didPlayerWon();
                if(this.isGameOver){
                    this.endedDate = new Date();
                    this.winningPlayer = this.currentPlayer;
                }
                return !this.isGameOver; 
            }   
        }
        return false;
    }
    //
    isValidMove(rowIndex,columnIndex){
        return !this.cells[rowIndex][columnIndex].getPlayer();
    }
    //check Vertical , Horizontal , Diagonaly
    didPlayerWon() {       
        return this.didWonVerticaly() || this.didWonHorizontaly() || this.didWonDiagonaly();        
    }
    //
    didWonVerticaly(){
        var m = this.cells;
        var p = null;
        var matchCount=0;
        for (let cI = 0; cI < m.length; cI++) {            
            for (let rI = 0,p = m[rI][cI].getPlayer(), matchCount=0; rI < m[cI].length; rI++) {
                if(p && m[rI][cI].getPlayer() == p){
                    matchCount++;
                    if (matchCount==3)return true;
                } 
                break;               
            }            
        }
        return false;  
    }
    //
    didWonHorizontaly(){
        var m = this.cells;
        var p = null;
        var matchCount=0;
        for (let rI = 0; rI < m.length; rI++) {            
            for (let cI = 0,p = m[rI][cI].getPlayer(), matchCount=0; cI < m[rI].length; cI++) {
                if(p && m[rI][rI].getPlayer() == p){
                    matchCount++;
                    if (matchCount==3)return true;
                } 
                break;               
            }            
        }
        return false;  
    }
    //
    didWonDiagonaly(){
        var m = this.cells;
        let p = this.getPlayer();
        return (p==m[0][0].getPlayer() && p==m[1][1].getPlayer() && p==m[2][1].getPlayer()) || 
                (p==m[0][2].getPlayer() && p==m[1][1].getPlayer() && p==m[2][0].getPlayer());
    }
    //
    render(){
        let cells = this.cells;
        let numberOfCells=9;
        let c =[];
        let a=[0,1,2,3,4,5,6,7,8];
        for (let i = 0,keyID=0; i < cells.length; i++) {
            for (let j = 0; j < cells[i].length; j++,keyID++) {
                c.push(<Cell key={keyID} 
                             onSelected={this.move}
                             rowNumber={i} 
                             colNumber={j}></Cell>);            
            }
        }
        // ;return <div className="xo">
        //         {a.map((i)=>{
        //             return <Cell key={i} 
        //                                     onSelected={this.move}
        //                                     rowNumber={i} 
        //                                     colNumber={i}>
        //                     </Cell>
        //         })}
        //         </div> 
        
        console.log(cells);
        console.log(c);
        return  <div className="xo">{c}</div>;
    }
}