function getParameterDefinitions() {
  return [
      { name: 'unitSize', type: 'int', initial: 10, caption: 'Unit Size' },
      { name: 'color', type: 'color', initial: '#F6D55C', caption: 'Color?' }
  ];
}
function main(params) {
 return  color(html2rgb(params.color),
      difference(
          union(
              //base
            cube({size: [params.unitSize * 9, params.unitSize * 7, params.unitSize * 0.5]}),
            // Top boxes
            cube({size: [params.unitSize * 9, params.unitSize , params.unitSize * 2]}).translate([0,params.unitSize * 7 - params.unitSize,0]),
            // Bottom Boxes
            cube({size: [params.unitSize * 9, params.unitSize , params.unitSize * 2]}).translate([0,0,0]),
            // Bottom half line
            cube({size: [params.unitSize * 9, params.unitSize , params.unitSize]}).translate([0,params.unitSize,0]),
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
