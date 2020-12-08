import React from 'react';
import { Cell } from '../components/Cell';
import { Board } from "./Board";
export class XO extends React.Component{
    constructor(props){
        super(props);
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
    }
    //
    move(player,rowIndex,columnIndex){
        if (!this.isGameOver && this.isValidMove(player,rowIndex,columnIndex)) {
            this.cells[rowIndex][columnIndex].setPlayer(player);  
            this.isGameOver = this.didPlayerWon();
            if(this.isGameOver){
                this.endedDate = new Date();
                this.winningPlayer = player;
            }
            return this.isGameOver; 
        }
        else//throw Error(`invalid move, already chosed by player ${this.matrix[rowIndex][columnIndex]}`);        
            return false;
    }
    //
    isValidMove(player,rowIndex,columnIndex){
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
        return (m[0,0].getPlayer() && m[1,1].getPlayer() && m[2,1].getPlayer()) || 
                (m[0,2].getPlayer() && m[1,1].getPlayer() && m[2,0].getPlayer());
    }
    //
    render(){
        let cells = this.cells;
        let numberOfCells=9;
        let c =[];
        for (let i = 0; i < cells.length; i++) {
            for (let j = 0; j < cells[i].length; j++) {
                c.push(<Cell key={i+j+1} 
                             onSelected={this.move}
                             rowNumber={i} 
                             colNumber={j}></Cell>);            
            }
        }
        // let c= cells.map((item,index)=>{
        //     return <Cell key={index} 
        //                  rowNumber={item.rowNumber} 
        //                  colNumber={item.colNumber}>
        //             </Cell>
        // });
        
        console.log(cells);
        console.log(c);
        return  c;
    }
}