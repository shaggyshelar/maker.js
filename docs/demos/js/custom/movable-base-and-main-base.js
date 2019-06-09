function getParameterDefinitions() {
    return [
        { name: 'unitSize', type: 'int', initial: 2, caption: 'Unit Size' },
        { name: 'color', type: 'color', initial: '#ED553B', caption: 'Main Base Color' },
        { name: 'pinColor', type: 'color', initial: '#173F5F', caption: 'Pin Color' },
        { name: 'movableBaseColor', type: 'color', initial: '#F6D55C', caption: 'Movable Base Color' },
        { name: 'totalRecords', type: 'int', initial: 1, caption: 'Total Records' }
    ];
  }

function getMainBase(params) {
    var width = 9;
    var records = [];
    for (var i = 0; i < params.totalRecords; i++) {
        var row = color(html2rgb(params.color),
            difference(
                union(
                    //base
                    cube({ size: [params.unitSize * width, params.unitSize * 7, params.unitSize * 0.5] }),
                    // Top boxes
                    cube({ size: [params.unitSize * width, params.unitSize, params.unitSize * 2] }).translate([0, params.unitSize * 7 - params.unitSize, 0]),
                    // Right Box
                    //cube({size: [params.unitSize, params.unitSize * 7 , params.unitSize * 2]}).translate([params.unitSize * width-params.unitSize,0,0]),
                    // Bottom Boxes
                    cube({ size: [params.unitSize * width, params.unitSize, params.unitSize * 2] }).translate([0, 0, 0]),
                    // Bottom half line
                    cube({ size: [params.unitSize * width, params.unitSize, params.unitSize] }).translate([0, params.unitSize, 0])
                ),
                union(
                    cube({ size: [params.unitSize, params.unitSize * 7, params.unitSize * 3] }).translate([params.unitSize * 2.5, 0, params.unitSize]),
                    cube({ size: [params.unitSize, params.unitSize * 2, params.unitSize * 3] }).translate([params.unitSize * 2.5, 0, 0]),
                    cube({ size: [params.unitSize, params.unitSize * 2, params.unitSize * 3] }).translate([params.unitSize * 5 + params.unitSize * 0.5, 0, 0]),
                    cube({ size: [params.unitSize, params.unitSize * 7, params.unitSize * 3] }).translate([params.unitSize * 5 + params.unitSize * 0.5, 0, params.unitSize])
                )
            )
        ).translate([i * params.unitSize * 9, 0, 0]);
        records.push(row);
    }
    return records;
}

function getMovableBase(params) {
    var toReturn = [];
    for (var i = 0; i < params.totalRecords; i++) {
        var newRecord = color(html2rgb(params.movableBaseColor),
            difference(
                union(
                    // Base
                    cube({ size: [params.unitSize * 9, params.unitSize * 4, params.unitSize * 0.5] }),

                    // Top boxes
                    cube({ size: [params.unitSize * 2.5, params.unitSize * 0.5, params.unitSize] }).translate([0, params.unitSize * 4 - params.unitSize * 0.5, 0]),
                    cube({ size: [params.unitSize * 2, params.unitSize * 0.5, params.unitSize] }).translate([params.unitSize * 3 + params.unitSize * 0.5, params.unitSize * 4 - params.unitSize * 0.5, 0]),
                    cube({ size: [params.unitSize * 2.5, params.unitSize * 0.5, params.unitSize] }).translate([params.unitSize * 6 + params.unitSize * 0.5, params.unitSize * 4 - params.unitSize * 0.5, 0]),

                    // bottom boxes
                    difference(
                        cube({ size: [params.unitSize * 2.5, params.unitSize * 3, params.unitSize * 1.5] }).translate([0, 0, 0]),
                        cube({ size: [params.unitSize * 0.5, params.unitSize * 2, params.unitSize * 3] }).translate([params.unitSize * 2, params.unitSize / 2, 0])
                    ),
                    cube({ size: [params.unitSize * 2, params.unitSize * 3, params.unitSize * 1.5] }).translate([params.unitSize * 3 + params.unitSize * 0.5, 0, 0]),
                    difference(
                        cube({ size: [params.unitSize * 2.5, params.unitSize * 3, params.unitSize * 1.5] }).translate([params.unitSize * 6 + params.unitSize * 0.5, 0, 0]),
                        cube({ size: [params.unitSize * 0.5, params.unitSize * 2, params.unitSize * 3] }).translate([params.unitSize * 6 + params.unitSize * 0.5, params.unitSize / 2, 0])
                    )
                )
            )
        ).translate([i * params.unitSize * 9, params.unitSize * 2, params.unitSize * 0.5]);
        //.translate([0, params.unitSize * 2, params.unitSize * 0.5])
        toReturn.push(newRecord);
    }
    return toReturn;
}

function getPins(params) {
    var pinHeight = 1;
    var pins = [];
    for (var i = 0; i < params.totalRecords; i++) {
        var leftPin = color(html2rgb(params.pinColor),
            difference(
                //base
                cube({ size: [params.unitSize * 2, params.unitSize * 4, params.unitSize * pinHeight] }),
                // left cutout
                cube({ size: [params.unitSize * 0.5, params.unitSize * 2, params.unitSize * pinHeight] }),
                //right cutout
                cube({ size: [params.unitSize * 0.5, params.unitSize * 2, params.unitSize * pinHeight] }).translate([params.unitSize * 1.5, 0, 0]),
                // top cutout
                cube({ size: [params.unitSize, params.unitSize * 0.5, params.unitSize * 0.5] }).translate([params.unitSize * 0.5, params.unitSize * 0.5, 0])
            )
        ).translate([i * params.unitSize * 9 + params.unitSize * 2, params.unitSize * 5, params.unitSize]);
        pins.push(leftPin);

        var rightPin = color(html2rgb(params.pinColor),
            difference(
                //base
                cube({ size: [params.unitSize * 2, params.unitSize * 4, params.unitSize * pinHeight] }),
                // left cutout
                cube({ size: [params.unitSize * 0.5, params.unitSize * 2, params.unitSize * pinHeight] }),
                //right cutout
                cube({ size: [params.unitSize * 0.5, params.unitSize * 2, params.unitSize * pinHeight] }).translate([params.unitSize * 1.5, 0, 0]),
                // top cutout
                cube({ size: [params.unitSize, params.unitSize * 0.5, params.unitSize * 0.5] }).translate([params.unitSize * 0.5, params.unitSize * 0.5, 0])
            )
        ).translate([i * params.unitSize * 9 + params.unitSize * 5, params.unitSize * 5, params.unitSize]);
        pins.push(rightPin);
    }
    return pins;
}

function main(params) {
    var records = [];
    var mainBaseRecords = getMainBase(params);
    var movableBaseRecords = getMovableBase(params);
    var pins = getPins(params);
    return mainBaseRecords.concat(movableBaseRecords).concat(pins);
}
