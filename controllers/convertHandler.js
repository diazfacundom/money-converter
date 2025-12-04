const inputUnits = ['gal','l','lbs','kg','mi','km'];

function ConvertHandler() {

  this.getNum = function(input) {
    const numRegex = /^[^a-zA-Z]*/;
    const numStr = input.match(numRegex)[0];
    if (!numStr) return 1; // default 1
    if (numStr.split('/').length > 2) return 'invalid number'; // doble fracción
    try {
      const result = eval(numStr);
      return parseFloat(result.toFixed(5));
    } catch {
      return 'invalid number';
    }
  };

  this.getUnit = function(input) {
    const unitMatch = input.match(/[a-zA-Z]+$/);
    if (!unitMatch) return 'invalid unit';
    const unit = unitMatch[0].toLowerCase();
    if (unit === 'l') return 'L';
    if (!inputUnits.includes(unit)) return 'invalid unit';
    return unit;
  };

  this.getReturnUnit = function(initUnit) {
    switch(initUnit.toLowerCase()){
      case 'gal': return 'L';
      case 'l': return 'gal';
      case 'lbs': return 'kg';
      case 'kg': return 'lbs';
      case 'mi': return 'km';
      case 'km': return 'mi';
    }
  };

  this.spellOutUnit = function(unit) {
    switch(unit.toLowerCase()){
      case 'gal': return 'gallons';
      case 'l': return 'liters';
      case 'lbs': return 'pounds';
      case 'kg': return 'kilograms';
      case 'mi': return 'miles';
      case 'km': return 'kilometers';
    }
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    switch(initUnit.toLowerCase()){
      case 'gal': return parseFloat((initNum * galToL).toFixed(5));
      case 'l': return parseFloat((initNum / galToL).toFixed(5));
      case 'lbs': return parseFloat((initNum * lbsToKg).toFixed(5));
      case 'kg': return parseFloat((initNum / lbsToKg).toFixed(5));
      case 'mi': return parseFloat((initNum * miToKm).toFixed(5));
      case 'km': return parseFloat((initNum / miToKm).toFixed(5));
    }
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
