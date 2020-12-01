module.exports.createMatrix = function(numberOfRows,numberOfColumns,type) {
    var array = new Array(numberOfRows);
    type = type===undefined? null :type;
    for (let i = 0; i < array.length; i++) {
        array[i] = new Array(numberOfColumns);        
        for (let j = 0; j < array[i].length; j++) {
            array[i][j]=type;            
        }
    }
    return array;
}
//


