function getParameterDefinitions() {
    return [
        { name: 'unitSize', type: 'int', initial: 10, caption: 'Unit Size' }
    ];
}
function main(params) {
   return difference(
      cube({size: [params.unitSize * 2.5, params.unitSize * 3, params.unitSize * 3]}),
      cube({size: [params.unitSize * 0.5, params.unitSize * 2, params.unitSize * 3]}).translate([params.unitSize * 2,params.unitSize / 2,0])
    )
}
