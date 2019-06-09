var singleCellWidth = 3;
var columnSpacerWidth = 10;
var cellColumnSpacerWidth = 5;
var singleColumnWidth = 2 * singleCellWidth + cellColumnSpacerWidth;

var singleCellHeight = 9;
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
    var height = params.totalRows * singleRowHeight + params.totalRows * rowSpacerHeight;
    for (var i = 0; i < params.totalColumns; i++) {
        var leftColumn = color(html2rgb(params.columnColor),
            difference(
                union(
                    cube({ size: [singleCellWidth, height, 7] })
                )
            )
        ).translate([columnSpacerWidth + i * singleColumnWidth + i * columnSpacerWidth, 0, 0.5]);
        columns.push(leftColumn);

        var rightColumn = color(html2rgb(params.columnColor),
            difference(
                union(
                    cube({ size: [singleCellWidth, height, 7] })
                )
            )
        ).translate([columnSpacerWidth + i * (singleColumnWidth + columnSpacerWidth) + (singleCellWidth +cellColumnSpacerWidth), 0, 0.5]);
        columns.push(rightColumn);
    }
    return columns;
}

function getBase(params) {
    var height = params.totalRows * singleRowHeight + params.totalRows * rowSpacerHeight;
    var width = params.totalColumns * singleColumnWidth + params.totalColumns * columnSpacerWidth + columnSpacerWidth;
    return color(html2rgb(params.baseBoxColor),
        cube({
            size: [width,height,0.5]
        })
    );
}

function main(params) {
    var dummyColumns = getDummyColumns(params);
    var baseBox = getBase(params);

    dummyColumns.push(baseBox);
    return dummyColumns;
}
