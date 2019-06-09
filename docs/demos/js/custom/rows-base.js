function getParameterDefinitions() {
    return [
        { name: 'unitSize', type: 'int', initial: 2, caption: 'Unit Size' },
        { name: 'baseBoxColor', type: 'color', initial: '#F6D55C', caption: 'Base Box Color' },
        { name: 'totalRows', type: 'int', initial: 1, caption: 'Total Rows' },
        { name: 'totalColumns', type: 'int', initial: 1, caption: 'Total Columns' }
    ];
  }

  function getTopBoxes(params) {
    var records = [];
      for(var i =0; i< params.totalRecords;i++) {
        var row =  color(html2rgb(params.color),
              difference(
                  union(
                      //base
                    cube({size: [params.unitSize * 9, params.unitSize * 7, params.unitSize * 0.5]}),
                    // Top boxes
                    cube({size: [params.unitSize * 9, params.unitSize , params.unitSize * 2]}).translate([0,params.unitSize * 7 - params.unitSize,0])
                  )
            )
        ).translate([i * params.unitSize * 9, 0, 0]);
        records.push(row);
      }
      return records;
  }

function main(params) {
    var singleCellWidth = 3;
    var columnSpacerWidth = 10;
    var cellColumnSpacerWidth = 5;
    var singleColumnWidth = 2 * singleCellWidth + cellColumnSpacerWidth;

    var singleCellHeight = 9;
    var rowSpacerWidth = 10;
    var cellRowSpacerWidth = 5;
    var singleRowWidth = 2 * singleCellHeight + cellRowSpacerWidth;

    var records = [];
    var baseBox = color(html2rgb(params.baseBoxColor),
        cube({ size: [
            params.totalColumns * singleColumnWidth + params.totalColumns * columnSpacerWidth, 
            params.totalRows * singleRowWidth + params.totalRows * rowSpacerWidth, 
            0.5] })
    );

    records.push(baseBox);
    return records;
}
  