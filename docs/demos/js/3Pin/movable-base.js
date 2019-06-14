function getParameterDefinitions() {
    return [
        { name: 'unitSize', type: 'int', initial: 1, caption: 'Unit Size' },
        { name: 'color', type: 'color', initial: '#3CAEA3', caption: 'Color?' },
        { name: 'totalRecords', type: 'int', initial: 1, caption: 'Total Records' }
    ];
}
function main(params) {
    var records = [];
    for(var i =0; i< params.totalRecords;i++) {
        var row =  color(html2rgb(params.color),
        difference(
            union(
                // Base
              cube({size: [params.unitSize * 9, params.unitSize * 4, params.unitSize * 0.5]}),
              
              // Top boxes
              cube({size: [params.unitSize * 2.5, params.unitSize * 0.5 , params.unitSize]}).translate([0,params.unitSize * 4 - params.unitSize * 0.5,0]),
              cube({size: [params.unitSize * 2, params.unitSize * 0.5, params.unitSize]}).translate([params.unitSize * 3 + params.unitSize * 0.5,params.unitSize * 4 - params.unitSize * 0.5,0]),
              cube({size: [params.unitSize * 2.5, params.unitSize * 0.5, params.unitSize]}).translate([params.unitSize * 6 + params.unitSize * 0.5,params.unitSize * 4 - params.unitSize * 0.5,0]),
              
              // bottom boxes
              difference(
                cube({size: [params.unitSize * 2.5, params.unitSize * 3 , params.unitSize * 1.5]}).translate([0,0,0]),
                cube({size: [params.unitSize * 0.5, params.unitSize * 2, params.unitSize * 3]}).translate([params.unitSize * 2,params.unitSize / 2,0])
              ),
              cube({size: [params.unitSize * 2, params.unitSize * 3, params.unitSize * 1.5]}).translate([params.unitSize * 3 + params.unitSize * 0.5,0,0]),
              difference(
                cube({size: [params.unitSize * 2.5, params.unitSize * 3, params.unitSize * 1.5]}).translate([params.unitSize * 6 + params.unitSize * 0.5,0,0]),
                cube({size: [params.unitSize * 0.5, params.unitSize * 2, params.unitSize * 3]}).translate([params.unitSize * 6 + params.unitSize * 0.5,params.unitSize / 2,0])
                )
                )
            )
        ).translate([i * params.unitSize * 9, 0, 0]);
        records.push(row);   
    }
    
    return records;
}
