function getParameterDefinitions() {
    return [
        { name: 'unitSize', type: 'int', initial: 1, caption: 'Unit Size' },
        { name: 'movableBaseColor', type: 'color', initial: '#3CAEA3', caption: 'Row Movable Base Color' },
        { name: 'isTwoPin', type: 'checkbox', checked: true, caption: 'Two Pin' },
        { name: 'rowBaseSpacerSize', type: 'float', initial: 3, caption: 'Row Base Spacer Size' },
        { name: 'spaceBetweenPins', type: 'float', initial: 3, caption: 'Space Between Pins' },
        { name: 'totalRecords', type: 'int', initial: 1, caption: 'Total Records' }
    ];
}

function getData(params, totalWidth) {
    var spacerWidth = params.unitSize * params.rowBaseSpacerSize + 0.5;
    var rightPinStart = spacerWidth + params.spaceBetweenPins + 2 * params.unitSize;

    if (params.isTwoPin) {
        return union(
            // Base
            cube({ size: [params.unitSize * totalWidth + params.unitSize, params.unitSize * 4, params.unitSize * 0.5] }),

            // Top boxes
            cube({ size: [spacerWidth, params.unitSize * 0.5, params.unitSize] }).translate([0, params.unitSize * 4 - params.unitSize * 0.5, 0]),
            cube({ size: [params.spaceBetweenPins, params.unitSize * 0.5, params.unitSize] }).translate([spacerWidth + params.unitSize, params.unitSize * 4 - params.unitSize * 0.5, 0]),
            cube({ size: [spacerWidth, params.unitSize * 0.5, params.unitSize] }).translate([rightPinStart, params.unitSize * 4 - params.unitSize * 0.5, 0]),

            // bottom boxes
            difference(
                cube({ size: [spacerWidth, params.unitSize * 3, params.unitSize * 1.5] }).translate([0, 0, 0]),
                cube({ size: [params.unitSize * 0.5, params.unitSize * 2, params.unitSize * 3] }).translate([spacerWidth - 0.5, params.unitSize / 2, 0])
            ),

            // center box
            cube({ size: [params.unitSize * params.spaceBetweenPins, params.unitSize * 3, params.unitSize * 1.5] }).translate([spacerWidth + params.unitSize, 0, 0]),

            difference(
                cube({ size: [spacerWidth, params.unitSize * 3, params.unitSize * 1.5] }).translate([rightPinStart, 0, 0]),
                cube({ size: [params.unitSize * 0.5, params.unitSize * 2, params.unitSize * 3] }).translate([rightPinStart, params.unitSize / 2, 0])
            )
        );
    }

    return union(
        // Base
        cube({ size: [params.unitSize * totalWidth + params.unitSize, params.unitSize * 4, params.unitSize * 0.5] }),

        // Top boxes
        cube({ size: [spacerWidth, params.unitSize * 0.5, params.unitSize] }).translate([0, params.unitSize * 4 - params.unitSize * 0.5, 0]),
        cube({ size: [params.spaceBetweenPins, params.unitSize * 0.5, params.unitSize] }).translate([spacerWidth + params.unitSize, params.unitSize * 4 - params.unitSize * 0.5, 0]),
        cube({ size: [params.spaceBetweenPins, params.unitSize * 0.5, params.unitSize] }).translate([rightPinStart, params.unitSize * 4 - params.unitSize * 0.5, 0]),
        cube({ size: [spacerWidth, params.unitSize * 0.5, params.unitSize] }).translate([rightPinStart + params.spaceBetweenPins + params.unitSize, params.unitSize * 4 - params.unitSize * 0.5, 0]),

        // bottom boxes
        difference(
            cube({ size: [spacerWidth, params.unitSize * 3, params.unitSize * 1.5] }).translate([0, 0, 0]),
            cube({ size: [params.unitSize * 0.5, params.unitSize * 2, params.unitSize * 3] }).translate([spacerWidth - 0.5, params.unitSize / 2, 0])
        ),

        // center box
        cube({ size: [params.unitSize * params.spaceBetweenPins, params.unitSize * 3, params.unitSize * 1.5] }).translate([spacerWidth + params.unitSize, 0, 0]),
        cube({ size: [params.unitSize * params.spaceBetweenPins, params.unitSize * 3, params.unitSize * 1.5] }).translate([rightPinStart, 0, 0]),

        difference(
            cube({ size: [spacerWidth, params.unitSize * 3, params.unitSize * 1.5] }).translate([rightPinStart + params.spaceBetweenPins + params.unitSize, 0, 0]),
            cube({ size: [params.unitSize * 0.5, params.unitSize * 2, params.unitSize * 3] }).translate([rightPinStart + params.spaceBetweenPins + params.unitSize, params.unitSize / 2, 0])
        )
    );
}

function main(params) {
    var records = [];
    var numberOfPins = params.isTwoPin ? 2: 3;
    var totalWidth = (params.unitSize * 2 * params.rowBaseSpacerSize) + 
        (params.unitSize * numberOfPins) + 
        (params.unitSize * (numberOfPins - 1) * params.spaceBetweenPins);
    
    
    for (var i = 0; i < params.totalRecords; i++) {
        var row = color(html2rgb(params.movableBaseColor),
            getData(params,totalWidth)
        ).translate([i * params.unitSize * totalWidth, 0, 0]);
        records.push(row);
    }

    return records;
}
