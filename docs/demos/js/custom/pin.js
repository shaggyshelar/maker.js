function getParameterDefinitions() {
    return [
        { name: 'unitSize', type: 'int', initial: 10, caption: 'Unit Size' }
    ];
}
function main(params) {
   return difference(
       //base
      cube({size: [params.unitSize * 2, params.unitSize * 4, params.unitSize * 3]}),
      // left cutout
      cube({size: [params.unitSize * 0.5, params.unitSize * 2 , params.unitSize * 3]}),
      //right cutout
      cube({size: [params.unitSize * 0.5, params.unitSize * 2 , params.unitSize * 3]}).translate([params.unitSize * 1.5,0,0]),
      // top cutout
      cube({size: [params.unitSize, params.unitSize * 0.5, params.unitSize * 0.5]}).translate([params.unitSize * 0.5,params.unitSize * 0.5,params.unitSize *2.5])
    )
}
