var makerjs = require('makerjs');
    
function example(origin) {
    this.models = {
        rect: new makerjs.models.Rectangle(100, 400),
        oval: makerjs.model.move(new makerjs.models.Oval(100, 50), [75, 25]),
        oval2: makerjs.model.move(new makerjs.models.Oval(100, 50), [75, 200])
    };
    this.origin = origin;
}

var examples = {
    models: {
        x3: new example([400, 0])
    }
};

//save us some typing :)
var x = examples.models;

makerjs.model.combine(x.x3.models.rect, x.x3.models.oval, false, true, true, false);
makerjs.model.combine(x.x3.models.rect, x.x3.models.oval2, false, true, true, false);

var svg = makerjs.exporter.toSVG(examples);

document.write(svg);