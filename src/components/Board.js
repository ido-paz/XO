import   React  from "react";
import { XO } from "../models/XO";


export class Board extends React.Component{
    constructor(props){
        super(props);
        this.xo= new XO();
    }
    render(){
        var m = this.xo.cells;

        return "m[][]";
    }
}