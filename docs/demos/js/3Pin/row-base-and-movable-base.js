function getParameterDefinitions() {
    return [
        { name: 'unitSize', type: 'int', initial: 1, caption: 'Unit Size' },
        { name: 'rowMainBaseColor', type: 'color', initial: '#F6D55C', caption: 'Row Base Color' },
        { name: 'movableBaseColor', type: 'color', initial: '#ED553B', caption: 'Row Movable Base Color' },
        { name: 'pinColor', type: 'color', initial: '#173F5F', caption: 'Pin Color' },
        { name: 'pushPinColor', type: 'color', initial: '#3CAEA3', caption: 'Push Pin Color' },
        { name: 'rowClosePanelColor', type: 'color', initial: '#F6D55C', caption: 'Row Close Panel Color' },
        { name: 'isThreePin', type: 'checkbox', checked: true, caption: 'Three Pin' },
        { name: 'rowBaseSpacerSize', type: 'float', initial: 5, caption: 'Row Base Spacer Size' },
        { name: 'spaceBetweenPins', type: 'float', initial: 3, caption: 'Space Between Pins' },
        { name: 'tolerance', type: 'float', initial: 0.1, caption: 'Tolerance' },
        { name: 'totalRecords', type: 'int', initial: 1, caption: 'Total Records' },
        { name: 'isPreview', type: 'checkbox', checked: true, caption: 'Preview Mode' },
        { name: 'hideTopPanel', type: 'checkbox', checked: true, caption: 'Hide Top Panel' },
    ];
}

// Main Row Base Start
function getRowMainBase(params, totalWidth, isFirstCell) {
    if (isFirstCell) {
        return union(        
            // Left Closing
            //cube({ size: [params.unitSize, params.unitSize * 7, params.unitSize * 2.5] }).translate([-1*params.unitSize,0, 0]),
            //base
            cube({ size: [params.unitSize * totalWidth + params.unitSize, params.unitSize * 7, params.unitSize * 0.5] }),
            // Top boxes
            cube({ size: [params.unitSize * totalWidth + params.unitSize, params.unitSize, params.unitSize * 2] }).translate([0, params.unitSize * 7 - params.unitSize, 0]),
            // Bottom Boxes
            cube({ size: [params.unitSize * totalWidth + params.unitSize, params.unitSize, params.unitSize * 2] }).translate([0, 0, 0]),
            // Bottom half line
            cube({ size: [params.unitSize * totalWidth + params.unitSize, params.unitSize - params.tolerance, params.unitSize] }).translate([0, params.unitSize, 0])
        );
    }
    return union(        
        //base
        cube({ size: [params.unitSize * totalWidth + params.unitSize, params.unitSize * 7, params.unitSize * 0.5] }),
        // Top boxes
        cube({ size: [params.unitSize * totalWidth + params.unitSize, params.unitSize, params.unitSize * 2] }).translate([0, params.unitSize * 7 - params.unitSize, 0]),
        // Bottom Boxes
        cube({ size: [params.unitSize * totalWidth + params.unitSize, params.unitSize, params.unitSize * 2] }).translate([0, 0, 0]),
        // Bottom half line
        cube({ size: [params.unitSize * totalWidth + params.unitSize, params.unitSize, params.unitSize] }).translate([0, params.unitSize, 0])
    );
}
  
function getRowMainBoxes(params) {
    if (!params.isThreePin) {
        return union(
            cube({ size: [params.unitSize, params.unitSize * 7, params.unitSize * 3] }).translate([params.unitSize * params.rowBaseSpacerSize + params.unitSize * 0.5, 0, params.unitSize]),
            cube({ size: [params.unitSize, params.unitSize * 2, params.unitSize * 3] }).translate([params.unitSize * params.rowBaseSpacerSize + params.unitSize * 0.5, 0, 0]),
            cube({ size: [params.unitSize, params.unitSize * 7, params.unitSize * 3] }).translate([params.unitSize * (params.rowBaseSpacerSize + params.spaceBetweenPins) + params.unitSize + params.unitSize * 0.5, 0, params.unitSize]),
            cube({ size: [params.unitSize, params.unitSize * 2, params.unitSize * 3] }).translate([params.unitSize * (params.rowBaseSpacerSize + params.spaceBetweenPins) + params.unitSize + params.unitSize * 0.5, 0, 0])
        );
    }

    return union(
        cube({ size: [params.unitSize, params.unitSize * 7, params.unitSize * 3] }).translate([params.unitSize * params.rowBaseSpacerSize + params.unitSize * 0.5, 0, params.unitSize]),
        cube({ size: [params.unitSize, params.unitSize * 2, params.unitSize * 3] }).translate([params.unitSize * params.rowBaseSpacerSize + params.unitSize * 0.5, 0, 0]),
        cube({ size: [params.unitSize, params.unitSize * 2, params.unitSize * 3] }).translate([params.unitSize * (params.rowBaseSpacerSize + params.spaceBetweenPins) + params.unitSize + params.unitSize * 0.5, 0, 0]),
        cube({ size: [params.unitSize, params.unitSize * 2, params.unitSize * 3] }).translate([params.unitSize * (params.rowBaseSpacerSize + params.spaceBetweenPins) + 2 * params.unitSize + params.spaceBetweenPins + params.unitSize * 0.5, 0, 0]),
        cube({ size: [params.unitSize, params.unitSize * 7, params.unitSize * 3] }).translate([params.unitSize * (params.rowBaseSpacerSize + params.spaceBetweenPins) + params.unitSize + params.unitSize * 0.5, 0, params.unitSize]),
        cube({ size: [params.unitSize, params.unitSize * 7, params.unitSize * 3] }).translate([params.unitSize * (params.rowBaseSpacerSize + params.spaceBetweenPins) + 2 * params.unitSize + params.spaceBetweenPins + params.unitSize * 0.5, 0, params.unitSize])
    )
}
  
function getRowBase(params) {
    var numberOfPins = params.isThreePin ? 3 : 2;
    var totalWidth = (params.unitSize * 2 * params.rowBaseSpacerSize) +
        (params.unitSize * numberOfPins) +
        (params.unitSize * (numberOfPins - 1) * params.spaceBetweenPins);

    var records = [];
    for (var i = 0; i < params.totalRecords; i++) {
        var row = color(html2rgb(params.rowMainBaseColor),
            difference(getRowMainBase(params, totalWidth, i==0), getRowMainBoxes(params))
        ).translate([i * params.unitSize * totalWidth, 0, 0]);
        records.push(row);
    }
    return records;
}
// Main Row Base End

// Movable Row Base Start

function getMovableLastTwoPin(params,totalWidth,spacerWidth,rightPinStart) {
    return union(
        // Base
        cube({ size: [params.unitSize * totalWidth + params.unitSize, params.unitSize * 4, params.unitSize * 0.5] }),

        // Top boxes
        cube({ size: [params.unitSize, (params.unitSize * 0.5) - params.tolerance, params.unitSize - params.tolerance] }).translate([spacerWidth - params.unitSize, params.unitSize * 4 - params.unitSize * 0.5 + params.tolerance, 0]),
        cube({ size: [params.spaceBetweenPins, (params.unitSize * 0.5) - params.tolerance, params.unitSize - params.tolerance] }).translate([spacerWidth + params.unitSize, params.unitSize * 4 - params.unitSize * 0.5 + params.tolerance, 0]),
        //cube({ size: [spacerWidth, params.unitSize * 0.5, params.unitSize] }).translate([rightPinStart, params.unitSize * 4 - params.unitSize * 0.5, 0]),

        // bottom boxes
        difference(
            cube({ size: [params.unitSize, params.unitSize * 3, params.unitSize * 1.5] }).translate([spacerWidth - params.unitSize, 0, 0]),
            cube({ size: [spacerWidth, params.unitSize * 2, params.unitSize * 3] }).translate([0, params.unitSize / 2, 0])
        ),

        // center box
        difference(
            cube({ size: [params.unitSize * params.spaceBetweenPins, params.unitSize * 3, params.unitSize * 1.5] }).translate([spacerWidth + params.unitSize, 0, 0]),
            cube({ size: [params.unitSize * params.spaceBetweenPins, params.unitSize * 2, params.unitSize * 3] }).translate([spacerWidth + params.unitSize, params.unitSize / 2, 0]),
            cube({ size: [params.unitSize * ( params.spaceBetweenPins - 2), params.unitSize * 4, params.unitSize * 3] }).translate([spacerWidth + 2 * params.unitSize, 0, 0]),
        ),

        // right box
        cube({ size: [params.unitSize * 0.5, params.unitSize * 4, params.unitSize * 1.5] }).translate([rightPinStart, 0, 0]),

        // Right Closing
        cube({ size: [params.unitSize, params.unitSize * 4, params.unitSize * 2] }).translate([params.unitSize * totalWidth + params.unitSize,0, 0])            
    );
}

function getMovableFirstTwoPin(params,totalWidth,spacerWidth,rightPinStart) {
    return union(

        // Left Closing
        cube({ size: [params.unitSize, params.unitSize * 4, params.unitSize * 2] }).translate([-2 * params.unitSize,0, 0]),
        cube({ size: [params.unitSize, params.unitSize * 4, params.unitSize * 0.5] }).translate([-1 * params.unitSize,0, 0]),

        // Base
        cube({ size: [params.unitSize * totalWidth + params.unitSize, params.unitSize * 4, params.unitSize * 0.5] }),

        // Top boxes
        cube({ size: [params.unitSize, (params.unitSize * 0.5) - params.tolerance, params.unitSize - params.tolerance] }).translate([spacerWidth - params.unitSize, params.unitSize * 4 - params.unitSize * 0.5 + params.tolerance, 0]),
        cube({ size: [params.spaceBetweenPins, (params.unitSize * 0.5) - params.tolerance, params.unitSize - params.tolerance] }).translate([spacerWidth + params.unitSize, params.unitSize * 4 - params.unitSize * 0.5 + params.tolerance, 0]),
        //cube({ size: [spacerWidth, params.unitSize * 0.5, params.unitSize] }).translate([rightPinStart, params.unitSize * 4 - params.unitSize * 0.5, 0]),

        // bottom boxes
        difference(
            cube({ size: [params.unitSize, params.unitSize * 3, params.unitSize * 1.5] }).translate([spacerWidth - params.unitSize, 0, 0]),
            cube({ size: [spacerWidth, params.unitSize * 2, params.unitSize * 3] }).translate([0, params.unitSize / 2, 0])
        ),

        // center box
        difference(
            cube({ size: [params.unitSize * params.spaceBetweenPins, params.unitSize * 3, params.unitSize * 1.5] }).translate([spacerWidth + params.unitSize, 0, 0]),
            cube({ size: [params.unitSize * params.spaceBetweenPins, params.unitSize * 2, params.unitSize * 3] }).translate([spacerWidth + params.unitSize, params.unitSize / 2, 0]),
            cube({ size: [params.unitSize * ( params.spaceBetweenPins - 2), params.unitSize * 4, params.unitSize * 3] }).translate([spacerWidth + 2 * params.unitSize, 0, 0]),
        ),

        // right box
        cube({ size: [params.unitSize * 0.5, params.unitSize * 4, params.unitSize * 1.5] }).translate([rightPinStart, 0, 0]),
    );
}

function getMovableLastThreePin(params,totalWidth,spacerWidth,rightPinStart) {
    return union(
        // Base
        cube({ size: [params.unitSize * totalWidth + params.unitSize, params.unitSize * 4, params.unitSize * 0.5] }),

        // Top boxes
        cube({ size: [params.unitSize, (params.unitSize * 0.5) - params.tolerance, params.unitSize - params.tolerance] }).translate([spacerWidth - params.unitSize, params.unitSize * 4 - params.unitSize * 0.5 + params.tolerance, 0]),
        cube({ size: [params.spaceBetweenPins, (params.unitSize * 0.5) - params.tolerance, params.unitSize - params.tolerance] }).translate([spacerWidth + params.unitSize, params.unitSize * 4 - params.unitSize * 0.5 + params.tolerance, 0]),
        cube({ size: [params.spaceBetweenPins, (params.unitSize * 0.5) - params.tolerance, params.unitSize - params.tolerance] }).translate([rightPinStart, params.unitSize * 4 - params.unitSize * 0.5 + params.tolerance, 0]),
        //cube({ size: [spacerWidth, params.unitSize * 0.5, params.unitSize] }).translate([rightPinStart + params.spaceBetweenPins + params.unitSize, params.unitSize * 4 - params.unitSize * 0.5, 0]),

        // bottom boxes
        difference(
            cube({ size: [params.unitSize , params.unitSize * 3, params.unitSize * 1.5] }).translate([spacerWidth - params.unitSize, 0, 0]),
            cube({ size: [spacerWidth, params.unitSize * 2, params.unitSize * 3] }).translate([0, params.unitSize / 2, 0])
        ),

        // center box 1
        difference(
            cube({ size: [params.unitSize * params.spaceBetweenPins, params.unitSize * 3, params.unitSize * 1.5] }).translate([spacerWidth + params.unitSize, 0, 0]),
            cube({ size: [params.unitSize * params.spaceBetweenPins, params.unitSize * 2, params.unitSize * 3] }).translate([spacerWidth + params.unitSize, params.unitSize / 2, 0]),
            cube({ size: [params.unitSize * ( params.spaceBetweenPins - 2), params.unitSize * 4, params.unitSize * 3] }).translate([spacerWidth + 2 * params.unitSize, 0, 0]),
        ),

        // center box 2
        difference(
            cube({ size: [params.unitSize * params.spaceBetweenPins, params.unitSize * 3, params.unitSize * 1.5] }).translate([rightPinStart, 0, 0]),
            cube({ size: [params.unitSize * params.spaceBetweenPins, params.unitSize * 2, params.unitSize * 3] }).translate([rightPinStart, params.unitSize / 2, 0]),
            cube({ size: [params.unitSize * ( params.spaceBetweenPins - 2), params.unitSize * 4, params.unitSize * 3] }).translate([rightPinStart + params.unitSize, 0, 0]),
        ),

        // Right Box
        cube({ size: [params.unitSize * 0.5, params.unitSize * 4, params.unitSize * 1.5] }).translate([rightPinStart + params.spaceBetweenPins + params.unitSize, 0, 0]),

        // Right Closing
        cube({ size: [params.unitSize, params.unitSize * 4, params.unitSize * 2] }).translate([params.unitSize * totalWidth + params.unitSize,0, 0])
    );
}

function getMovableFirstThreePin(params,totalWidth,spacerWidth,rightPinStart) {
    return union(
        // Left Closing
        cube({ size: [params.unitSize, params.unitSize * 4, params.unitSize * 2] }).translate([-2 * params.unitSize,0, 0]),
        cube({ size: [params.unitSize, params.unitSize * 4, params.unitSize * 0.5] }).translate([-1 * params.unitSize,0, 0]),


        // Base
        cube({ size: [params.unitSize * totalWidth + params.unitSize, (params.unitSize * 4), params.unitSize * 0.5] }),

        // Top boxes
        cube({ size: [params.unitSize, (params.unitSize * 0.5) - params.tolerance, params.unitSize - params.tolerance] }).translate([spacerWidth - params.unitSize, params.unitSize * 4 - params.unitSize * 0.5 + params.tolerance, 0]),
        cube({ size: [params.spaceBetweenPins, (params.unitSize * 0.5) - params.tolerance, params.unitSize - params.tolerance] }).translate([spacerWidth + params.unitSize, params.unitSize * 4 - params.unitSize * 0.5 + params.tolerance, 0]),
        cube({ size: [params.spaceBetweenPins, (params.unitSize * 0.5) - params.tolerance, params.unitSize - params.tolerance] }).translate([rightPinStart, params.unitSize * 4 - params.unitSize * 0.5 + params.tolerance, 0]),
        //cube({ size: [spacerWidth, params.unitSize * 0.5, params.unitSize] }).translate([rightPinStart + params.spaceBetweenPins + params.unitSize, params.unitSize * 4 - params.unitSize * 0.5, 0]),

        // bottom boxes
        difference(
            cube({ size: [params.unitSize, params.unitSize * 3, params.unitSize * 1.5] }).translate([spacerWidth - params.unitSize, 0, 0]),
            cube({ size: [spacerWidth, params.unitSize * 2, params.unitSize * 3] }).translate([0, params.unitSize / 2, 0])
        ),

        // center box 1
        difference(
            cube({ size: [params.unitSize * params.spaceBetweenPins, params.unitSize * 3, params.unitSize * 1.5] }).translate([spacerWidth + params.unitSize, 0, 0]),
            cube({ size: [params.unitSize * params.spaceBetweenPins, params.unitSize * 2, params.unitSize * 3] }).translate([spacerWidth + params.unitSize, params.unitSize / 2, 0]),
            cube({ size: [params.unitSize * ( params.spaceBetweenPins - 2), params.unitSize * 4, params.unitSize * 3] }).translate([spacerWidth + 2 * params.unitSize, 0, 0]),
        ),

        // center box 2
        difference(
            cube({ size: [params.unitSize * params.spaceBetweenPins, params.unitSize * 3, params.unitSize * 1.5] }).translate([rightPinStart, 0, 0]),
            cube({ size: [params.unitSize * params.spaceBetweenPins, params.unitSize * 2, params.unitSize * 3] }).translate([rightPinStart, params.unitSize / 2, 0]),
            cube({ size: [params.unitSize * ( params.spaceBetweenPins - 2), params.unitSize * 4, params.unitSize * 3] }).translate([rightPinStart + params.unitSize, 0, 0]),
        ),

        // Right Box
        cube({ size: [params.unitSize * 0.5, params.unitSize * 4, params.unitSize * 1.5] }).translate([rightPinStart + params.spaceBetweenPins + params.unitSize, 0, 0]),
    );
}

function getMovableBaseData(params, totalWidth, isFirstPin = false, isLastPin = false) {
    var spacerWidth = params.unitSize * params.rowBaseSpacerSize + 0.5;
    var rightPinStart = spacerWidth + params.spaceBetweenPins + 2 * params.unitSize;

    if (isFirstPin) {
        return !params.isThreePin ? getMovableFirstTwoPin(params,totalWidth,spacerWidth,rightPinStart) : getMovableFirstThreePin(params,totalWidth,spacerWidth,rightPinStart);
    }

    if (isLastPin) {
        return !params.isThreePin ? getMovableLastTwoPin(params,totalWidth,spacerWidth,rightPinStart) : getMovableLastThreePin(params,totalWidth,spacerWidth,rightPinStart);
    }


    if (!params.isThreePin) {
        return union(

            // Left Closing
            // cube({ size: [params.unitSize, params.unitSize * 4, params.unitSize * 2] }).translate([-2 * params.unitSize,0, 0]),
            // cube({ size: [params.unitSize, params.unitSize * 4, params.unitSize * 1.5] }).translate([-1 * params.unitSize,0, 0]),

            // Base
            cube({ size: [params.unitSize * totalWidth + params.unitSize, params.unitSize * 4, params.unitSize * 0.5] }),

            // Top boxes
            cube({ size: [params.unitSize, (params.unitSize * 0.5) - params.tolerance, params.unitSize - params.tolerance] }).translate([spacerWidth - params.unitSize, params.unitSize * 4 - params.unitSize * 0.5 + params.tolerance, 0]),
            cube({ size: [params.spaceBetweenPins, (params.unitSize * 0.5) - params.tolerance, params.unitSize - params.tolerance] }).translate([spacerWidth + params.unitSize, params.unitSize * 4 - params.unitSize * 0.5 + params.tolerance, 0]),
            //cube({ size: [spacerWidth, params.unitSize * 0.5, params.unitSize] }).translate([rightPinStart, params.unitSize * 4 - params.unitSize * 0.5, 0]),

            // bottom boxes
            difference(
                cube({ size: [params.unitSize, params.unitSize * 3, params.unitSize * 1.5] }).translate([spacerWidth - params.unitSize, 0, 0]),
                cube({ size: [spacerWidth, params.unitSize * 2, params.unitSize * 3] }).translate([0, params.unitSize / 2, 0])
            ),

            // center box
            difference(
                cube({ size: [params.unitSize * params.spaceBetweenPins, params.unitSize * 3, params.unitSize * 1.5] }).translate([spacerWidth + params.unitSize, 0, 0]),
                cube({ size: [params.unitSize * params.spaceBetweenPins, params.unitSize * 2, params.unitSize * 3] }).translate([spacerWidth + params.unitSize, params.unitSize / 2, 0]),
                cube({ size: [params.unitSize * ( params.spaceBetweenPins - 2), params.unitSize * 4, params.unitSize * 3] }).translate([spacerWidth + 2 * params.unitSize, 0, 0])
            ),

            // right box
            cube({ size: [params.unitSize * 0.5, params.unitSize * 4, params.unitSize * 1.5] }).translate([rightPinStart, 0, 0]),

            // Right Closing
            //cube({ size: [params.unitSize, params.unitSize * 4, params.unitSize * 2] }).translate([rightPinStart + 3.5 * params.unitSize,0, 0])            
        );
    }

    return union(
        // Left Closing
        // cube({ size: [params.unitSize, params.unitSize * 4, params.unitSize * 2] }).translate([-2 * params.unitSize,0, 0]),
        // cube({ size: [params.unitSize, params.unitSize * 4, params.unitSize * 1.5] }).translate([-1 * params.unitSize,0, 0]),


        // Base
        cube({ size: [params.unitSize * totalWidth + params.unitSize, params.unitSize * 4, params.unitSize * 0.5] }),

        // Top boxes
        cube({ size: [params.unitSize, (params.unitSize * 0.5) - params.tolerance, params.unitSize - params.tolerance] }).translate([spacerWidth - params.unitSize, params.unitSize * 4 - params.unitSize * 0.5 + params.tolerance, 0]),
        cube({ size: [params.spaceBetweenPins, (params.unitSize * 0.5) - params.tolerance, params.unitSize - params.tolerance] }).translate([spacerWidth + params.unitSize, params.unitSize * 4 - params.unitSize * 0.5 + params.tolerance, 0]),
        cube({ size: [params.spaceBetweenPins, (params.unitSize * 0.5) - params.tolerance, params.unitSize - params.tolerance] }).translate([rightPinStart, params.unitSize * 4 - params.unitSize * 0.5 + params.tolerance, 0]),
        //cube({ size: [spacerWidth, params.unitSize * 0.5, params.unitSize] }).translate([rightPinStart + params.spaceBetweenPins + params.unitSize, params.unitSize * 4 - params.unitSize * 0.5, 0]),

        // bottom boxes
        difference(
            cube({ size: [params.unitSize, params.unitSize * 3, params.unitSize * 1.5] }).translate([spacerWidth - params.unitSize, 0, 0]),
            cube({ size: [spacerWidth, params.unitSize * 2, params.unitSize * 3] }).translate([0, params.unitSize / 2, 0])
        ),

        // center box 1
        difference(
            cube({ size: [params.unitSize * params.spaceBetweenPins, params.unitSize * 3, params.unitSize * 1.5] }).translate([spacerWidth + params.unitSize, 0, 0]),
            cube({ size: [params.unitSize * params.spaceBetweenPins, params.unitSize * 2, params.unitSize * 3] }).translate([spacerWidth + params.unitSize, params.unitSize / 2, 0]),
            cube({ size: [params.unitSize * ( params.spaceBetweenPins - 2), params.unitSize * 4, params.unitSize * 3] }).translate([spacerWidth + 2 * params.unitSize, 0, 0]),
        ),

        // center box 2
        difference(
            cube({ size: [params.unitSize * params.spaceBetweenPins, params.unitSize * 3, params.unitSize * 1.5] }).translate([rightPinStart, 0, 0]),
            cube({ size: [params.unitSize * params.spaceBetweenPins, params.unitSize * 2, params.unitSize * 3] }).translate([rightPinStart, params.unitSize / 2, 0]),
            cube({ size: [params.unitSize * ( params.spaceBetweenPins - 2), params.unitSize * 4, params.unitSize * 3] }).translate([rightPinStart + params.unitSize, 0, 0]),
        ),

        // Right Box
        cube({ size: [params.unitSize * 0.5, params.unitSize * 4, params.unitSize * 1.5] }).translate([rightPinStart + params.spaceBetweenPins + params.unitSize, 0, 0]),

        // Right Closing
        //cube({ size: [params.unitSize, params.unitSize * 4, params.unitSize * 2] }).translate([rightPinStart + 7.5 * params.unitSize,0, 0])            
    );
}

function getMovableBase(params) {
    var records = [];
    var numberOfPins = params.isThreePin ? 3: 2;
    var totalWidth = (params.unitSize * 2 * params.rowBaseSpacerSize) + 
        (params.unitSize * numberOfPins) + 
        (params.unitSize * (numberOfPins - 1) * params.spaceBetweenPins);
    
    
    for (var i = 0; i < params.totalRecords; i++) {
        var row = color(html2rgb(params.movableBaseColor),
            getMovableBaseData(params,totalWidth,i===0,i===params.totalRecords-1)
        ).translate([i * params.unitSize * totalWidth, params.unitSize * 2, params.unitSize * 0.5]);
        records.push(row);
    }

    return records;
}
// Movable Row Base End

// Pins Start

function getPins(params) {
    var pinHeight = 1;
    var pins = [];
    var numberOfPins = params.isThreePin ? 3: 2;

    if (!params.isThreePin) {
        var totalWidth = (params.unitSize * 2 * params.rowBaseSpacerSize) +
            (params.unitSize * numberOfPins) +
            (params.unitSize * (numberOfPins - 1) * params.spaceBetweenPins);
        for (var i = 0; i < params.totalRecords; i++) {
            var leftPin = color(html2rgb(params.pinColor),
                difference(
                    //base
                    cube({ size: [params.unitSize * 2, params.unitSize * 2.5, params.unitSize * pinHeight] }),
                    // left cutout
                    cube({ size: [params.unitSize * 0.5, params.unitSize * 2, params.unitSize * pinHeight] }),
                    //right cutout
                    cube({ size: [params.unitSize * 0.5 + params.tolerance, params.unitSize * 2, params.unitSize * pinHeight] }).translate([params.unitSize * 1.5 - params.tolerance, 0, 0]),
                    // movable cutout
                    cube({ size: [params.unitSize, params.unitSize, params.unitSize * 0.5] }).translate([params.unitSize * 0.5, params.unitSize * 0.5, 0])
                ),
                cube({ size: [params.unitSize, params.unitSize * 1.5, params.unitSize] }).translate([params.unitSize * 0.5, params.unitSize * 2.5, 0]),
                sphere({r: params.unitSize / 2, fn: 50}).rotateX(-90).translate([params.unitSize, params.unitSize * 4, params.unitSize / 2])
            ).translate([i * totalWidth + params.unitSize * params.rowBaseSpacerSize, params.unitSize * 5, params.unitSize]);
            pins.push(leftPin);

            var rightPin = color(html2rgb(params.pinColor),
                difference(
                    //base
                    cube({ size: [params.unitSize * 2, params.unitSize * 2.5, params.unitSize * pinHeight] }),
                    // left cutout
                    cube({ size: [params.unitSize * 0.5, params.unitSize * 2, params.unitSize * pinHeight] }),
                    //right cutout
                    cube({ size: [params.unitSize * 0.5 + params.tolerance, params.unitSize * 2, params.unitSize * pinHeight] }).translate([params.unitSize * 1.5 - params.tolerance, 0, 0]),
                    // movable cutout
                    cube({ size: [params.unitSize, params.unitSize, params.unitSize * 0.5] }).translate([params.unitSize * 0.5, params.unitSize * 0.5, 0])
                ),
                cube({ size: [params.unitSize, params.unitSize * 1.5, params.unitSize] }).translate([params.unitSize * 0.5, params.unitSize * 2.5, 0]),
                sphere({r: params.unitSize / 2, fn: 50}).rotateX(-90).translate([params.unitSize, params.unitSize * 4, params.unitSize / 2])
            ).translate([i * totalWidth + params.unitSize * params.rowBaseSpacerSize + params.spaceBetweenPins + params.unitSize, params.unitSize * 5, params.unitSize]);
            pins.push(rightPin);
        }
        return pins;
    }

    var totalWidth = (params.unitSize * 2 * params.rowBaseSpacerSize) +
            (params.unitSize * numberOfPins) +
            (params.unitSize * (numberOfPins - 1) * params.spaceBetweenPins);
        for (var i = 0; i < params.totalRecords; i++) {
            var leftPin = color(html2rgb(params.pinColor),
                difference(
                    //base
                    cube({ size: [params.unitSize * 2, params.unitSize * 2.5, params.unitSize * pinHeight] }),
                    // left cutout
                    cube({ size: [params.unitSize * 0.5, params.unitSize * 2, params.unitSize * pinHeight] }),
                    //right cutout
                    cube({ size: [params.unitSize * 0.5 + params.tolerance, params.unitSize * 2, params.unitSize * pinHeight] }).translate([params.unitSize * 1.5 - params.tolerance, 0, 0]),
                    // movable cutout
                    cube({ size: [params.unitSize, params.unitSize, params.unitSize * 0.5] }).translate([params.unitSize * 0.5, params.unitSize * 0.5, 0])
                ),
                cube({ size: [params.unitSize, params.unitSize * 1.5, params.unitSize] }).translate([params.unitSize * 0.5, params.unitSize * 2.5, 0]),
                sphere({r: params.unitSize / 2, fn: 50}).rotateX(-90).translate([params.unitSize, params.unitSize * 4, params.unitSize / 2])
            ).translate([i * totalWidth + params.unitSize * params.rowBaseSpacerSize, params.unitSize * 5, params.unitSize]);
            pins.push(leftPin);

            var centerPin = color(html2rgb(params.pinColor),
                difference(
                    //base
                    cube({ size: [params.unitSize * 2, params.unitSize * 2.5, params.unitSize * pinHeight] }),
                    // left cutout
                    cube({ size: [params.unitSize * 0.5, params.unitSize * 2, params.unitSize * pinHeight] }),
                    //right cutout
                    cube({ size: [params.unitSize * 0.5 + params.tolerance, params.unitSize * 2, params.unitSize * pinHeight] }).translate([params.unitSize * 1.5 - params.tolerance, 0, 0]),
                    // movable cutout
                    cube({ size: [params.unitSize, params.unitSize, params.unitSize * 0.5] }).translate([params.unitSize * 0.5, params.unitSize * 0.5, 0])
                ),
                cube({ size: [params.unitSize, params.unitSize * 1.5, params.unitSize] }).translate([params.unitSize * 0.5, params.unitSize * 2.5, 0]),
                sphere({r: params.unitSize / 2, fn: 50}).rotateX(-90).translate([params.unitSize, params.unitSize * 4, params.unitSize / 2])
            ).translate([i * totalWidth + params.unitSize * params.rowBaseSpacerSize + params.spaceBetweenPins + params.unitSize, params.unitSize * 5, params.unitSize]);
            pins.push(centerPin);

            var rightPin = color(html2rgb(params.pinColor),
                difference(
                    //base
                    cube({ size: [params.unitSize * 2, params.unitSize * 2.5, params.unitSize * pinHeight] }),
                    // left cutout
                    cube({ size: [params.unitSize * 0.5, params.unitSize * 2, params.unitSize * pinHeight] }),
                    //right cutout
                    cube({ size: [params.unitSize * 0.5 + params.tolerance, params.unitSize * 2, params.unitSize * pinHeight] }).translate([params.unitSize * 1.5 - params.tolerance, 0, 0]),
                    // movable cutout
                    cube({ size: [params.unitSize, params.unitSize, params.unitSize * 0.5] }).translate([params.unitSize * 0.5, params.unitSize * 0.5, 0])
                ),
                cube({ size: [params.unitSize, params.unitSize * 1.5, params.unitSize] }).translate([params.unitSize * 0.5, params.unitSize * 2.5, 0]),
                sphere({r: params.unitSize / 2, fn: 50}).rotateX(-90).translate([params.unitSize, params.unitSize * 4, params.unitSize / 2])
            ).translate([i * totalWidth + 2 * params.unitSize + 2 * params.spaceBetweenPins + params.rowBaseSpacerSize, params.unitSize * 5, params.unitSize]);
            pins.push(rightPin);
        }
        return pins;
}

// Pins End

// Push Pin Start

function getPushPin(params) {
    var pins = [];
    var numberOfPins = params.isThreePin ? 3 : 2;
    var totalWidth = (params.unitSize * 2 * params.rowBaseSpacerSize) +
        (params.unitSize * numberOfPins) +
        (params.unitSize * (numberOfPins - 1) * params.spaceBetweenPins);
    if (!params.isThreePin) {
        for (var i = 0; i < params.totalRecords; i++) {
            var leftPin = color(html2rgb(params.pushPinColor),
                union(
                    cube({ size: [params.unitSize, params.unitSize * 4, params.unitSize] }),
                    cube({ size: [params.unitSize, params.unitSize, params.unitSize] }).translate([-params.unitSize, params.unitSize * 1.5, 0])
                ).translate([i * totalWidth + params.unitSize * params.rowBaseSpacerSize + params.unitSize * 0.5, params.unitSize * 1, params.unitSize])
            );
            pins.push(leftPin);

            var rightPin = color(html2rgb(params.pushPinColor),
                union(
                    cube({ size: [params.unitSize, params.unitSize * 4, params.unitSize] }),
                    cube({ size: [params.unitSize, params.unitSize, params.unitSize] }).translate([-params.unitSize, params.unitSize * 1.5, 0])
                ).translate([i * totalWidth + params.unitSize * params.rowBaseSpacerSize + params.spaceBetweenPins + params.unitSize + params.unitSize * 0.5, params.unitSize * 1, params.unitSize])
            );
            pins.push(rightPin);
        }
        return pins;
    }

    for (var i = 0; i < params.totalRecords; i++) {
        var leftPin = color(html2rgb(params.pushPinColor),
            union(
                cube({ size: [params.unitSize - params.tolerance, params.unitSize * 4, params.unitSize] }),
                cube({ size: [params.unitSize, params.unitSize, params.unitSize] }).translate([-params.unitSize, params.unitSize * 1.5, 0])
            ).translate([i * totalWidth + params.unitSize * params.rowBaseSpacerSize + params.unitSize * 0.5, params.unitSize * 1, params.unitSize])
        );
        pins.push(leftPin);

        var centerPin = color(html2rgb(params.pushPinColor),
            union(
                cube({ size: [params.unitSize - params.tolerance, params.unitSize * 4, params.unitSize] }),
                cube({ size: [params.unitSize, params.unitSize, params.unitSize] }).translate([-params.unitSize, params.unitSize * 1.5, 0])
            ).translate([i * totalWidth + params.unitSize * params.rowBaseSpacerSize + params.spaceBetweenPins + params.unitSize + params.unitSize * 0.5, params.unitSize * 1, params.unitSize])
        );
        pins.push(centerPin);

        var rightPin = color(html2rgb(params.pushPinColor),
            union(
                cube({ size: [params.unitSize - params.tolerance, params.unitSize * 4, params.unitSize] }),
                cube({ size: [params.unitSize , params.unitSize, params.unitSize] }).translate([-params.unitSize, params.unitSize * 1.5, 0])
            ).translate([i * totalWidth + 2 * params.unitSize  + 2 * params.spaceBetweenPins + params.rowBaseSpacerSize + params.unitSize * 0.5, params.unitSize * 1, params.unitSize])
        );
        pins.push(rightPin);
    }
    return pins;
}
// Push Pin End

// Row Close Panel Start

function getRowClosePanel(params) {
    if (params.hideTopPanel) {
        return [];
    }
    var numberOfPins = params.isThreePin ? 3 : 2;
    var totalWidth = (params.unitSize * 2 * params.rowBaseSpacerSize) +
        (params.unitSize * numberOfPins) +
        (params.unitSize * (numberOfPins - 1) * params.spaceBetweenPins);
        //rowClosePanelColor
    return color(html2rgb(params.rowClosePanelColor),
        //base
        cube({ size: [params.unitSize * totalWidth * params.totalRecords + params.unitSize, params.unitSize * 7, params.unitSize * 0.5] }).translate([0, 0, params.unitSize * 2]),
    );
}

// Row Close Panel End

function main(params) {
    var mainBaseRecords = getRowBase(params);
    var movableBaseRecords = getMovableBase(params);
    var rowClosePanel = getRowClosePanel(params);
    var pins = getPins(params);
    return movableBaseRecords.concat(pins);
    var pushPins = getPushPin(params);
    return mainBaseRecords.concat(movableBaseRecords).concat(rowClosePanel).concat(pins).concat(pushPins);
}
