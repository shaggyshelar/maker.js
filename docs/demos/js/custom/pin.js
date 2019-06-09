function getParameterDefinitions() {
    return [
        { name: 'unitSize', type: 'int', initial: 2, caption: 'Unit Size' },
        { name: 'totalRecords', type: 'int', initial: 1, caption: 'Total Records' },
        { name: 'pinColor', type: 'color', initial: '#173F5F', caption: 'Pin Color' },
    ];
}
function main(params) {
    var pinHeight = 1;
    var records = [];
    for(var i =0; i< params.totalRecords;i++) {
        var row = color(html2rgb(params.pinColor),
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
    ).translate([i * params.unitSize * 2, 0, 0]);
        records.push(row);
    }
    return records;
}
