var m = require("makerjs");

function brailleGuide(
  spaceBetweenDots,
  numberOfRows,
  numberOfColumns,
  pageWidth,
  pageHeight
) {
  var marginTop = 10;
  var marginBottom = 10;
  var marginLeft = 10;
  var marginRight = 10;
  var cellHeight = spaceBetweenDots * 4;
  var cellWidth = spaceBetweenDots * 3;
  var columnActuatorWidth = cellWidth / 2;
  var columnActuatorHeight =
    cellHeight * numberOfRows + marginTop + marginBottom;

  var singleRowActuator = new m.models.Oval(
    columnActuatorWidth,
    columnActuatorHeight
  );
  this.models = {
    columnActuators: m.layout.cloneToRow(singleRowActuator, numberOfColumns * 2, 0),
    pageBorder: new makerjs.models.Rectangle(pageWidth, pageHeight)
  };
}

brailleGuide.metaParameters = [
  {
    title: "space between two dots",
    type: "range",
    min: 2,
    max: 10,
    value: 2.5
  },
  { title: "number of rows", type: "range", min: 1, max: 25, value: 5 },
  { title: "number of columns", type: "range", min: 1, max: 40, value: 2 },
  { title: "page width", type: "range", min: 20, max: 210, value: 210 },
  { title: "page height", type: "range", min: 20, max: 297, value: 290 }
];

module.exports = brailleGuide;
