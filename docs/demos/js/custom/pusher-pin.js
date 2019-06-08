function getParameterDefinitions() {
    return [
        { name: 'unitSize', type: 'int', initial: 10, caption: 'Unit Size' }
    ];
}
function main(params) {
   return union(
      cube({size: [params.unitSize, params.unitSize * 4, params.unitSize]}),
      cube({size: [params.unitSize * 0.5, params.unitSize , params.unitSize]}).translate([params.unitSize,params.unitSize *1.5,0])
    )
}
