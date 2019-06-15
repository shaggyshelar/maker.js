var twoPinYValue = 13;
var threePinYValue = 17;
var zValueWithoutPinHeight = 7;
var zValueWithPinHeight = 9;
var xValue = 2.5;

function getParameterDefinitions() {
    return [
        { name: 'unitSize', type: 'int', initial: 1, caption: 'Unit Size' },
        { name: 'leftCellColor', type: 'color', initial: '#F6D55C', caption: 'Row Base Color' },
        { name: 'rightCellColor', type: 'color', initial: '#ED553B', caption: 'Row Movable Base Color' },
        { name: 'pinColor', type: 'color', initial: '#173F5F', caption: 'Pin Color' },
        { name: 'pushPinColor', type: 'color', initial: '#3CAEA3', caption: 'Push Pin Color' },
        { name: 'rowClosePanelColor', type: 'color', initial: '#F6D55C', caption: 'Row Close Panel Color' },
        { name: 'isTwoPin', type: 'checkbox', checked: true, caption: 'Two Pin' },
        { name: 'spaceBetweenColumnCells', type: 'float', initial: 1, caption: 'Space Between Column Cells' },
        { name: 'spaceBetweenColumns', type: 'float', initial: 5, caption: 'Space Between Columns' },
        { name: 'numberOfRows', type: 'int', initial: 1, caption: 'Number Of Rows' },
        { name: 'numberOfColumns', type: 'int', initial: 1, caption: 'Number Of Columns' }
    ];
}

function getBase(params) {
    var singleCellYValue = params.isTwoPin ? twoPinYValue : threePinYValue;
    var singleColumnWidth = 2 * xValue + params.spaceBetweenColumnCells + params.spaceBetweenColumns;

    var columns = []

    for (var i = 0; i < params.numberOfColumns; i++) {
        var leftColumnCell = color(
            html2rgb(params.leftCellColor),
            union(cube({ size: [params.unitSize * xValue, params.unitSize * params.numberOfRows * singleCellYValue, params.unitSize * zValueWithoutPinHeight] })).translate([i * singleColumnWidth, 0, 0])
        );
        columns.push(leftColumnCell);
    
        var rightColumnCell = color(
            html2rgb(params.rightCellColor),
            cube({ size: [params.unitSize * xValue, params.unitSize * params.numberOfRows * singleCellYValue, params.unitSize * zValueWithoutPinHeight] }).translate([i * singleColumnWidth + params.unitSize * xValue + params.spaceBetweenColumnCells, 0, 0])
        );
        columns.push(rightColumnCell);
    }
    return columns;
}

function main(params) {
    var mainBase = getBase(params);
    // var singleCellYValue = params.isTwoPin ? twoPinYValue : threePinYValue;
    // var singleColumnWidth = 2 * xValue + params.spaceBetweenColumnCells + params.spaceBetweenColumns;
    // var mainBase = color(
    //     html2rgb(params.leftCellColor),
    //     union(cube({ size: [params.unitSize * xValue, params.unitSize * params.numberOfRows * singleCellYValue, params.unitSize * zValueWithoutPinHeight] }))
    // );
    return mainBase;
}