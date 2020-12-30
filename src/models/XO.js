import { createMatrix } from './Utils';
//
export class XO {
    constructor(){
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
        this.currentPlayer = this.players[0];
        this.isGameOver =false;
        //        
        this.togglePlayer = this.switchPlayer.bind(this);
        this.move = this.move.bind(this);
        this.isValidMove = this.isValidMove.bind(this);
        this.didPlayerWon = this.didPlayerWon.bind(this);
        this.didWonVerticaly = this.didWonVerticaly.bind(this);
        this.didWonHorizontaly = this.didWonHorizontaly.bind(this);
        this.didWonDiagonaly = this.didWonDiagonaly.bind(this);
    }
    //
    switchPlayer(){
        return this.currentPlayer === this.players[0]?
                this.players[1]:
                this.players[0];
    }
    //
    move(rowIndex,columnIndex){
        console.log(rowIndex,columnIndex);
        if (!this.isGameOver)
        {            
            if(this.isValidMove(rowIndex,columnIndex)) {                
                this.cells[rowIndex][columnIndex]= this.currentPlayer;  
                this.isGameOver = this.didPlayerWon(rowIndex,columnIndex);
                this.currentMoveCount++;
                if(this.isGameOver){
                    this.endedDate = new Date();
                    this.winningPlayer = this.currentPlayer;
                }
                else
                    this.isGameOver = this.currentMoveCount === this.maximumMoveCount;
                if (!this.isGameOver) 
                    this.currentPlayer= this.switchPlayer();
                return true;
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
}