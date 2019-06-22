function getParameterDefinitions() {
    return [
        { name: 'rowActuatorColor', type: 'color', initial: '#173F5F', caption: 'Row Actuator Color' },
    ];
}
function main(params) {
    var xValue = 17.5;
    var yValue = 13.4;
    var zValue = 1;
    var movableSpaceWidth = 7.8;
    var movableSpaceHeight = 2.4;
    var movableSpaceStartX = (10 - movableSpaceWidth) / 2;

    return color(html2rgb(params.rowActuatorColor),
        union(
        difference(
            //base
            cube({ size: [xValue, yValue, zValue] }),
            cube({ size: [10, yValue, zValue] }).translate([0, 3.4, 0]),
            cube({ size: [movableSpaceWidth, movableSpaceHeight, zValue] }).translate([movableSpaceStartX, 0.5, 0])
        ),
        cube({ size: [2, 2, 5] }).translate([xValue, 7,0]),
        )
    );
}
