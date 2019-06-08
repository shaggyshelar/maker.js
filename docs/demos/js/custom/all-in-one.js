function getParameterDefinitions() {
    return [
        { name: 'unitSize', type: 'int', initial: 10, caption: 'Unit Size' },
        { name: 'color', type: 'color', initial: '#ED553B', caption: 'Main Base Color' },
        { name: 'pinColor', type: 'color', initial: '#173F5F', caption: 'Pin Color' },
        { name: 'movableBaseColor', type: 'color', initial: '#F6D55C', caption: 'Movable Base Color' }
    ];
}

function getMainBase(params) {
    return color(html2rgb(params.color),
        difference(
            union(
                cube({ size: [params.unitSize * 9, params.unitSize * 7, params.unitSize * 0.5] }),
                // Bottom Boxes
                cube({ size: [params.unitSize * 2.5, params.unitSize, params.unitSize * 2] }).translate([0, 0, 0]),
                cube({ size: [params.unitSize * 2, params.unitSize, params.unitSize * 2] }).translate([params.unitSize * 3 + params.unitSize * 0.5, 0, 0]),
                cube({ size: [params.unitSize * 2.5, params.unitSize, params.unitSize * 2] }).translate([params.unitSize * 6 + params.unitSize * 0.5, 0, 0]),
                // Top boxes
                cube({ size: [params.unitSize * 2.5, params.unitSize, params.unitSize * 2] }).translate([0, params.unitSize * 7 - params.unitSize, 0]),
                cube({ size: [params.unitSize * 2, params.unitSize, params.unitSize * 2] }).translate([params.unitSize * 3 + params.unitSize * 0.5, params.unitSize * 7 - params.unitSize, 0]),
                cube({ size: [params.unitSize * 2.5, params.unitSize, params.unitSize * 2] }).translate([params.unitSize * 6 + params.unitSize * 0.5, params.unitSize * 7 - params.unitSize, 0]),
                // Bottom half line
                cube({ size: [params.unitSize * 9, params.unitSize, params.unitSize] }).translate([0, params.unitSize, 0]),
            ),
            union(
                cube({ size: [params.unitSize, params.unitSize * 2, params.unitSize * 3] }).translate([params.unitSize * 2.5, 0, 0]),
                cube({ size: [params.unitSize, params.unitSize * 2, params.unitSize * 3] }).translate([params.unitSize * 5 + params.unitSize * 0.5, 0, 0])
            )
        )
    )
}

function getPin(params) {
    var pinHeight = 3;
    return color(html2rgb(params.pinColor),
        difference(
            //base
            cube({ size: [params.unitSize * 2, params.unitSize * 4, params.unitSize * pinHeight] }),
            // left cutout
            cube({ size: [params.unitSize * 0.5, params.unitSize * 2, params.unitSize * pinHeight] }),
            //right cutout
            cube({ size: [params.unitSize * 0.5, params.unitSize * 2, params.unitSize * pinHeight] }).translate([params.unitSize * 1.5, 0, 0]),
            // top cutout
            cube({ size: [params.unitSize, params.unitSize * 0.5, params.unitSize * 0.5] }).translate([params.unitSize * 0.5, params.unitSize * 0.5, params.unitSize * 2.5])
        )
    ).translate([params.unitSize * 2.5, params.unitSize * 5, params.unitSize * 0.5])
}


function getMovableBase(params) {
    return color(html2rgb(params.movableBaseColor),
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
    ).translate([0, params.unitSize * 2, params.unitSize * 0.5])
}

function main(params) {
   var mainBase =  getMainBase(params);
   var pin =  getPin(params);
   var movableBase =  getMovableBase(params);
   var toReturn = [];
   toReturn.push(mainBase);
   toReturn.push(pin);
   toReturn.push(movableBase);
   return toReturn;
}
