function getParameterDefinitions() {
    return [
        { name: 'unitSize', type: 'int', initial: 10, caption: 'Unit Size' },
        { name: 'color', type: 'color', initial: '#ED553B', caption: 'Main Base Color' },
        { name: 'pinColor', type: 'color', initial: '#173F5F', caption: 'Pin Color' },
        { name: 'pushPinColor', type: 'color', initial: '#3CAEA3', caption: 'Push Pin Color' },
        { name: 'movableBaseColor', type: 'color', initial: '#F6D55C', caption: 'Movable Base Color' },
        { name: 'showMainBase', type: 'checkbox', checked: true, caption: 'Show Main Base' },
        { name: 'showPins', type: 'checkbox', checked: true, caption: 'Show Pins' },
        { name: 'showRowBase', type: 'checkbox', checked: true, caption: 'Show Row Base' },
        { name: 'showPushPins', type: 'checkbox', checked: true, caption: 'Show Push Pins' }
    ];
}

function getMainBase(params) {
    var width = 11;
    return color(html2rgb(params.color),
        difference(
            union(
                //base
            cube({size: [params.unitSize * width, params.unitSize * 7, params.unitSize * 0.5]}),
            // Top boxes
            cube({size: [params.unitSize * width, params.unitSize , params.unitSize * 2]}).translate([0,params.unitSize * 7 - params.unitSize,0]),
            // Right Box
            cube({size: [params.unitSize, params.unitSize * 7 , params.unitSize * 2]}).translate([params.unitSize * width-params.unitSize,0,0]),
            // Bottom Boxes
            cube({size: [params.unitSize * width, params.unitSize , params.unitSize * 2]}).translate([0,0,0]),
            // Bottom half line
            cube({size: [params.unitSize * width, params.unitSize , params.unitSize]}).translate([0,params.unitSize,0]),
            ),
            union(
                cube({size: [params.unitSize, params.unitSize * 7, params.unitSize * 3]}).translate([params.unitSize * 2.5,0,params.unitSize]),
                cube({size: [params.unitSize, params.unitSize * 2, params.unitSize * 3]}).translate([params.unitSize * 2.5,0,0]),
                cube({size: [params.unitSize, params.unitSize * 2, params.unitSize * 3]}).translate([params.unitSize * 5  + params.unitSize * 0.5,0,0]),
                cube({size: [params.unitSize, params.unitSize * 7, params.unitSize * 3]}).translate([params.unitSize * 5  + params.unitSize * 0.5,0,params.unitSize])
            )
        )
    )
}

function getLeftPin(params) {
    var pinHeight = 1;
    return color(html2rgb(params.pinColor),
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
    ).translate([params.unitSize * 2, params.unitSize * 5, params.unitSize])
}

function getRightPin(params) {
    var pinHeight = 1;
    return color(html2rgb(params.pinColor),
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
    ).translate([params.unitSize * 5, params.unitSize * 5, params.unitSize])
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

function getLeftPushPin(params) {
   return color(html2rgb(params.pushPinColor),
       union(
          cube({size: [params.unitSize, params.unitSize * 4, params.unitSize]}),
          cube({size: [params.unitSize * 0.5, params.unitSize , params.unitSize]}).translate([-params.unitSize * 0.5,params.unitSize *1.5,0])
        ).translate([params.unitSize * 2.5, params.unitSize * 1, params.unitSize])
    )
}

function getRightPushPin(params) {
   return color(html2rgb(params.pushPinColor),
       union(
          cube({size: [params.unitSize, params.unitSize * 4, params.unitSize]}),
          cube({size: [params.unitSize * 0.5, params.unitSize , params.unitSize]}).translate([params.unitSize,params.unitSize *1.5,0])
        ).translate([params.unitSize * 5.5, params.unitSize * 1, params.unitSize])
    )
}

function main(params) {
   var toReturn = [];
   if (params.showMainBase) {
    var mainBase =  getMainBase(params);
    toReturn.push(mainBase);
   }
   if (params.showPins) {
        var leftPin =  getLeftPin(params);
        var rightPin =  getRightPin(params);
        toReturn.push(leftPin);
        toReturn.push(rightPin);
   }
   if (params.showRowBase) {
        var movableBase =  getMovableBase(params);
        toReturn.push(movableBase);
   }
   if (params.showPushPins) {
        var rightPin =  getRightPushPin(params);
        var leftPin =  getLeftPushPin(params);
        toReturn.push(rightPin);
        toReturn.push(leftPin);
   }
   return toReturn;
}
