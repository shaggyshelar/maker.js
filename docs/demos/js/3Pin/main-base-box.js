var twoPinYValue = 13;
var threePinYValue = 17;
var zValueWithoutPinHeight = 7;
var zValueWithPinHeight = 9;
var xValue = 2.5;
var baseZValue = 1;

function getParameterDefinitions() {
    return [
        { name: 'unitSize', type: 'int', initial: 1, caption: 'Unit Size' },
        { name: 'cellColor', type: 'color', initial: '#ED553B', caption: 'Row Base Color' },
        { name: 'baseColor', type: 'color', initial: '#F6D55C', caption: 'Row Movable Base Color' },
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

function getColumns(params) {
    var pinYValue = params.isTwoPin ? twoPinYValue : threePinYValue;
    var singleCellYValue = params.isTwoPin ? pinYValue : threePinYValue;
    var singleColumnWidth = 2 * xValue + params.spaceBetweenColumnCells + params.spaceBetweenColumns;

    var columns = []

    for (var i = 0; i < params.numberOfColumns; i++) {
        var leftColumnCell = color(
            html2rgb(params.cellColor),
            union(cube({ size: [params.unitSize * xValue, params.unitSize * params.numberOfRows * singleCellYValue, params.unitSize * zValueWithoutPinHeight] })).translate([i * singleColumnWidth, 0, baseZValue])
        );
        columns.push(leftColumnCell);
    
        var rightColumnCell = color(
            html2rgb(params.cellColor),
            cube({ size: [params.unitSize * xValue, params.unitSize * params.numberOfRows * singleCellYValue, params.unitSize * zValueWithoutPinHeight] }).translate([i * singleColumnWidth + params.unitSize * xValue + params.spaceBetweenColumnCells, 0, baseZValue])
        );
        columns.push(rightColumnCell);
    }
    return columns;
}

function getBaseBox(params) {
    var pinYValue = params.isTwoPin ? twoPinYValue : threePinYValue;
    var singleCellYValue = params.isTwoPin ? pinYValue : threePinYValue;
    var singleColumnWidth = 2 * xValue + params.spaceBetweenColumnCells + params.spaceBetweenColumns;

    return color(
        html2rgb(params.baseColor),
        union(
            // Left Border
            cube({
                size: [
                    params.unitSize * xValue,
                    params.unitSize * params.numberOfRows * singleCellYValue,
                    params.unitSize * zValueWithoutPinHeight
                ]
            }).translate([(params.spaceBetweenColumns + xValue) * -1, 0, baseZValue]),
            // Right Border
            cube({
                size: [
                    params.unitSize * xValue,
                    params.unitSize * params.numberOfRows * singleCellYValue,
                    params.unitSize * zValueWithoutPinHeight
                ]
            }).translate([(singleColumnWidth * params.numberOfColumns), 0, baseZValue]),
            // Top Border
            cube({
                size: [
                    singleColumnWidth * (params.numberOfColumns) + params.spaceBetweenColumns + 2 * xValue,
                    params.unitSize,
                    params.unitSize * zValueWithoutPinHeight
                ]
            }).translate([(params.spaceBetweenColumns + xValue) * -1, params.numberOfRows * pinYValue, baseZValue]),
            // Bottom Border
            cube({
                size: [
                    singleColumnWidth * (params.numberOfColumns) + params.spaceBetweenColumns + 2 * xValue,
                    params.unitSize,
                    params.unitSize * zValueWithoutPinHeight
                ]
            }).translate([(params.spaceBetweenColumns + xValue) * -1, params.unitSize * -1, baseZValue]),
            // Base Box
            cube({
                size: [
                    singleColumnWidth * (params.numberOfColumns) + params.spaceBetweenColumns + 2 * xValue,
                    params.unitSize * params.numberOfRows * singleCellYValue + 2 * params.unitSize,
                    baseZValue
                ]
            }).translate([(params.spaceBetweenColumns + xValue) * -1, params.unitSize * -1, 0]),
        )
    );
}

function main(params) {
    var mainBase = getColumns(params);
    var baseBox = getBaseBox(params);
    return mainBase.concat(baseBox);
}