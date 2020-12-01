import { Cell } from "../components/Cell";
import {  createMatrix } from "../utils";
export class XO{
    constructor(){
        this.initialize();
    }
    //
    initialize(){
        this.startedDate=new Date();
        this.endedDate = null;
        this.isGameOver = false;
        this.winningPlayer = null;
        let cells = createMatrix(3,3);

        for (let i = 0; i < cells.length; i++) {
            for (let j = 0; j < cells[i].length; j++) {
                cells[i][j]=new Cell(null,null);            
            }
        }
        this.cells =cells;
    }
    //
    move(player,rowIndex,columnIndex){
        if (!this.isGameOver && this.isValidMove(player,rowIndex,columnIndex)) {
            this.cells[rowIndex][columnIndex] = player.symbol;  
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
        return !this.cells[rowIndex][columnIndex];
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
            for (let rI = 0,p = m[rI][cI], matchCount=0; rI < m[cI].length; rI++) {
                if(p && m[rI][cI] == p){
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
            for (let cI = 0,p = m[rI][cI], matchCount=0; cI < m[rI].length; cI++) {
                if(p && m[rI][rI] == p){
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
        return (m[0,0] && m[1,1] && [2,1]) || (m[0,2] && m[1,1] && [2,0]);
    }
    //
}