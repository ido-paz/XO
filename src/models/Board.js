import { Cell } from "../components/Cell";
import { createMatrix } from "./utils";

export class Board{
    constructor(size){
        let cells = createMatrix(size,size);

        for (let i = 0; i < cells.length; i++) {
            for (let j = 0; j < cells[i].length; j++) {
                cells[i][j]=new Cell({rowNumber:i,colNumber:j});            
            }
        }
        this.cells =cells;
    }
}