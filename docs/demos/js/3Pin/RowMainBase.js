function getParameterDefinitions() {
  return [
      { name: 'unitSize', type: 'int', initial: 1, caption: 'Unit Size' },
      { name: 'color', type: 'color', initial: '#F6D55C', caption: 'Color?' },
      { name: 'isTwoPin', type: 'checkbox', checked: true, caption: 'Two Pin' },
      { name: 'rowBaseSpacerSize', type: 'float', initial: 3, caption: 'Row Base Spacer Size' },
      { name: 'spaceBetweenPins', type: 'float', initial: 3, caption: 'Space Between Pins' },
      { name: 'totalRecords', type: 'int', initial: 1, caption: 'Total Records' }
  ];
}

function getBase(params,totalWidth) {
  return union(
    //base
    cube({ size: [params.unitSize * totalWidth, params.unitSize * 7, params.unitSize * 0.5] }),
    // Top boxes
    cube({ size: [params.unitSize * totalWidth, params.unitSize, params.unitSize * 2] }).translate([0, params.unitSize * 7 - params.unitSize, 0]),
    // Bottom Boxes
    cube({ size: [params.unitSize * totalWidth, params.unitSize, params.unitSize * 2] }).translate([0, 0, 0]),
    // Bottom half line
    cube({ size: [params.unitSize * totalWidth, params.unitSize, params.unitSize] }).translate([0, params.unitSize, 0])
  );
}

function getBoxes(params) {
  if(params.isTwoPin) {
    return union(
      cube({size: [params.unitSize, params.unitSize * 7, params.unitSize * 3]}).translate([params.unitSize * params.rowBaseSpacerSize,0,params.unitSize]),
      cube({size: [params.unitSize, params.unitSize * 2, params.unitSize * 3]}).translate([params.unitSize * params.rowBaseSpacerSize,0,0]),
      cube({size: [params.unitSize, params.unitSize * 2, params.unitSize * 3]}).translate([params.unitSize * (params.rowBaseSpacerSize + params.spaceBetweenPins) + params.unitSize,0,0]),
      cube({size: [params.unitSize, params.unitSize * 7, params.unitSize * 3]}).translate([params.unitSize * (params.rowBaseSpacerSize + params.spaceBetweenPins) + params.unitSize,0,params.unitSize])
    );
  }

  return union(
    cube({size: [params.unitSize, params.unitSize * 7, params.unitSize * 3]}).translate([params.unitSize * params.rowBaseSpacerSize,0,params.unitSize]),
    cube({size: [params.unitSize, params.unitSize * 2, params.unitSize * 3]}).translate([params.unitSize * params.rowBaseSpacerSize,0,0]),
    cube({size: [params.unitSize, params.unitSize * 2, params.unitSize * 3]}).translate([params.unitSize * (params.rowBaseSpacerSize + params.spaceBetweenPins) + params.unitSize,0,0]),
    cube({size: [params.unitSize, params.unitSize * 2, params.unitSize * 3]}).translate([params.unitSize * (params.rowBaseSpacerSize + params.spaceBetweenPins) + 2 * params.unitSize + params.spaceBetweenPins,0,0]),
    cube({size: [params.unitSize, params.unitSize * 7, params.unitSize * 3]}).translate([params.unitSize * (params.rowBaseSpacerSize + params.spaceBetweenPins) + params.unitSize,0,params.unitSize]),
    cube({size: [params.unitSize, params.unitSize * 7, params.unitSize * 3]}).translate([params.unitSize * (params.rowBaseSpacerSize + params.spaceBetweenPins) + 2 * params.unitSize + params.spaceBetweenPins,0,params.unitSize])
  )
}


function main(params) {
  var numberOfPins = params.isTwoPin ? 2: 3;
  var totalWidth = (params.unitSize * 2 * params.rowBaseSpacerSize) + 
      (params.unitSize * numberOfPins) + 
      (params.unitSize * (numberOfPins - 1) * params.spaceBetweenPins);

  var records = [];
    for(var i =0; i< params.totalRecords;i++) {
      var row =  color(html2rgb(params.color),
            difference(getBase(params,totalWidth),getBoxes(params)
          )
      ).translate([i * params.unitSize * totalWidth, 0, 0]);
      records.push(row);
    }
    return records;
}
