var m = require("makerjs");

function singleRowActuatorModel(
  columnActuatorWidth,
  columnActuatorHeight,
  numberOfRows,
  cellHeight,
  spaceBetweenDots,
  showRowActuators,
  showPins
) {
  var border = new m.models.Oval(
    columnActuatorWidth,
    columnActuatorHeight + cellHeight * 2
  );

  var innerWidth = columnActuatorWidth / 2;
  var topHole = new m.models.Oval(innerWidth, innerWidth * 2);
  topHole.origin = [innerWidth / 2, columnActuatorHeight + (cellHeight * 2) - (innerWidth * 2) - innerWidth / 2];

  var bottomHole = new m.models.Oval(innerWidth, innerWidth * 2);
  bottomHole.origin = [innerWidth / 2, innerWidth / 2];

  var pins = { models: {} };

  var innerPin1, innerPin2, innerPin3;
  if (showPins) {
    for (var i = 1; i <= numberOfRows; i++) {
      innerPin1 = new m.models.Oval(innerWidth, innerWidth);
      innerPin1.origin = [innerWidth / 2, i * cellHeight + 1];
      //pins.models[i + " one"] = innerPin1;

      innerPin2 = new m.models.Oval(innerWidth, innerWidth);
      innerPin2.origin = [innerWidth / 2, i * cellHeight + 4];
      //pins.models[i + " two"] = innerPin2;

      innerPin3 = new m.models.Oval(innerWidth, innerWidth);
      innerPin3.origin = [innerWidth / 2, i * cellHeight + 7];
      //pins.models[i + " three"] = innerPin3;
    }
  }

  var arcBottomLeft = new makerjs.models.Oval(innerWidth, innerWidth * 2);
  arcBottomLeft.origin = [
    0 - innerWidth / 2,
    cellHeight - spaceBetweenDots * 2
  ];

  var arcBottomRight = new makerjs.models.Oval(innerWidth, innerWidth * 2);
  arcBottomRight.origin = [
    innerWidth + innerWidth / 2,
    cellHeight - spaceBetweenDots * 2
  ];

  var arcTopLeft = new makerjs.models.Oval(innerWidth, innerWidth * 2);
  arcTopLeft.origin = [0 - innerWidth / 2, columnActuatorHeight - cellHeight];

  var arcTopRight = new makerjs.models.Oval(innerWidth, innerWidth * 2);
  arcTopRight.origin = [
    innerWidth + innerWidth / 2,
    columnActuatorHeight - cellHeight
  ];

  this.models = {
    pins: pins
  };

  if (showRowActuators) {
    this.models.border = border;
    this.models.topHole = topHole;
    this.models.bottomHole = bottomHole;
    // this.models.arcBottomLeft = arcBottomLeft;
    // this.models.arcBottomRight = arcBottomRight;
    // this.models.arcTopLeft = arcTopLeft;
    // this.models.arcTopRight = arcTopRight;
  }

  makerjs.model.combine(
    this.models.border,
    this.models.arcBottomLeft,
    false,
    true,
    true,
    false
  );
  makerjs.model.combine(
    this.models.border,
    this.models.arcBottomRight,
    false,
    true,
    true,
    false
  );
  makerjs.model.combine(
    this.models.border,
    this.models.arcTopLeft,
    false,
    true,
    true,
    false
  );
  makerjs.model.combine(
    this.models.border,
    this.models.arcTopRight,
    false,
    true,
    true,
    false
  );
}

function brailleGuide(
  spaceBetweenDots,
  numberOfRows,
  numberOfColumns,
  pageWidth,
  pageHeight,
  showPageFrame,
  showRowActuators,
  showPins
) {
  var marginTop = 10;
  var marginBottom = 10;
  var marginLeft = 10;
  var marginRight = 10;
  var cellHeight = spaceBetweenDots * 4;
  var cellWidth = spaceBetweenDots * 3;
  var columnActuatorWidth = cellWidth / 2;
  var columnActuatorHeight = cellHeight * numberOfRows;

  var singleRowActuator = new singleRowActuatorModel(
    columnActuatorWidth,
    columnActuatorHeight,
    numberOfRows,
    cellHeight,
    spaceBetweenDots,
    showRowActuators,
    showPins
  );
  this.models = {
    columnActuators: m.layout.cloneToRow(
      singleRowActuator,
      numberOfColumns * 2,
      0
    )
  };
  if (showPageFrame) {
    this.models.pageBorder = new makerjs.models.Rectangle(
      pageWidth,
      pageHeight
    );
  }
}

brailleGuide.metaParameters = [
  {
    title: "space between two dots",
    type: "range",
    min: 2,
    max: 10,
    value: 2
  },
  { title: "number of rows", type: "range", min: 1, max: 25, value: 5 },
  { title: "number of columns", type: "range", min: 1, max: 40, value: 2 },
  { title: "page width", type: "range", min: 20, max: 210, value: 210 },
  { title: "page height", type: "range", min: 20, max: 297, value: 290 },
  { title: "page frame", type: "bool", value: false },
  { title: "column actuators", type: "bool", value: true },
  { title: "show pins", type: "bool", value: true }
];

module.exports = brailleGuide;
