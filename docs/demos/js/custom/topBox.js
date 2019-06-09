var singleCellWidth = 3;
var columnSpacerWidth = 10;
var cellColumnSpacerWidth = 5;
var singleColumnWidth = 2 * singleCellWidth + cellColumnSpacerWidth;
var columnZValue = 7;
var halfValue = 0.5;

var singleCellHeight = 10;
var rowSpacerHeight = 10;
var cellRowSpacerHeight = 5;
var singleRowHeight = 2 * singleCellHeight + cellRowSpacerHeight;

function getParameterDefinitions() {
    return [
        { name: 'baseBoxColor', type: 'color', initial: '#F6D55C', caption: 'Base Box Color' },
        { name: 'columnColor', type: 'color', initial: '#ED553B', caption: 'Column Color' },
        { name: 'totalRows', type: 'int', initial: 1, caption: 'Total Rows' },
        { name: 'totalColumns', type: 'int', initial: 1, caption: 'Total Columns' }
    ];
}

function getDummyColumns(params) {
    var columns = [];
    var height = rowSpacerHeight;
    for (var i = 0; i < params.totalColumns; i++) {
        for (var j = 0; j < params.totalRows; j++) {
            var leftColumn = color(html2rgb(params.columnColor),
                difference(
                    cube({ size: [singleCellWidth, height, columnZValue] }),
                    cylinder({ r: 0.5, h: 10 }).translate([1.5, 2.5, 0]),
                    cylinder({ r: 0.5, h: 10 }).translate([1.5, 5, 0]),
                    cylinder({ r: 0.5, h: 10 }).translate([1.5, 7.5, 0])
                )
            ).translate([columnSpacerWidth + i * singleColumnWidth + i * columnSpacerWidth, j * singleCellHeight + j * rowSpacerHeight + rowSpacerHeight, 0]);
            columns.push(leftColumn);

            var rightColumn = color(html2rgb(params.columnColor),
                difference(
                    cube({ size: [singleCellWidth, height, columnZValue] }),
                    cylinder({ r: 0.5, h: 10 }).translate([1.5, 2.5, 0]),
                    cylinder({ r: 0.5, h: 10 }).translate([1.5, 5, 0]),
                    cylinder({ r: 0.5, h: 10 }).translate([1.5, 7.5, 0])
                )
            ).translate([columnSpacerWidth + i * (singleColumnWidth + columnSpacerWidth) + (singleCellWidth + cellColumnSpacerWidth), j * singleCellHeight + j * rowSpacerHeight + rowSpacerHeight, 0]);
            columns.push(rightColumn);
        }
    }
    return columns;
}

function getBottomBase(params) {
    // var height = params.totalRows * singleRowHeight + params.totalRows * rowSpacerHeight;
    // var width = params.totalColumns * singleColumnWidth + params.totalColumns * columnSpacerWidth + columnSpacerWidth;
    var height = 2 * params.totalRows * rowSpacerHeight + rowSpacerHeight;
    var width = params.totalColumns * singleColumnWidth + params.totalColumns * columnSpacerWidth + columnSpacerWidth;
    return color(html2rgb(params.baseBoxColor),
        cube({
            size: [width, height, halfValue]
        })
    );
}

function main(params) {
    var dummyColumns = getDummyColumns(params);
    var bottomBase = getBottomBase(params);
 
    dummyColumns.push(bottomBase);
    return dummyColumns;
}
