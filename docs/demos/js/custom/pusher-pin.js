function getParameterDefinitions() {
    return [
        { name: 'unitSize', type: 'int', initial: 2, caption: 'Unit Size' },
        { name: 'totalRecords', type: 'int', initial: 1, caption: 'Total Records' }
    ];
}
function main(params) {
    var records = [];
    for(var i =0; i< params.totalRecords;i++) {
        var row =  union(
            cube({ size: [params.unitSize, params.unitSize * 4, params.unitSize] }),
            cube({ size: [params.unitSize * 0.5, params.unitSize, params.unitSize] }).translate([params.unitSize, params.unitSize * 1.5, 0])
        ).translate([i * params.unitSize * 1.5, 0, 0]);
        records.push(row);
    }
    return records;
}
