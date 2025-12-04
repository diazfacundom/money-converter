const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  test('Whole number input', function(){
    assert.equal(convertHandler.getNum('32L'),32);
  });
  test('Decimal number input', function(){
    assert.equal(convertHandler.getNum('3.1mi'),3.1);
  });
  test('Fractional input', function(){
    assert.equal(convertHandler.getNum('1/2km'),0.5);
  });
  test('Fractional input with decimal', function(){
    assert.equal(convertHandler.getNum('4.5/3lbs'),1.5);
  });
  test('Double-fraction input', function(){
    assert.equal(convertHandler.getNum('3/2/3kg'),'invalid number');
  });
  test('Default numerical input', function(){
    assert.equal(convertHandler.getNum('kg'),1);
  });
  test('Valid input units', function(){
    const units = ['gal','L','mi','km','lbs','kg'];
    units.forEach(u => assert.equal(convertHandler.getUnit('5'+u),u==='L'?'L':u.toLowerCase()));
  });
  test('Invalid input unit', function(){
    assert.equal(convertHandler.getUnit('32g'),'invalid unit');
  });
  test('Correct return unit', function(){
    assert.equal(convertHandler.getReturnUnit('gal'),'L');
    assert.equal(convertHandler.getReturnUnit('L'),'gal');
    assert.equal(convertHandler.getReturnUnit('mi'),'km');
    assert.equal(convertHandler.getReturnUnit('km'),'mi');
    assert.equal(convertHandler.getReturnUnit('lbs'),'kg');
    assert.equal(convertHandler.getReturnUnit('kg'),'lbs');
  });
  test('Spelled-out unit', function(){
    assert.equal(convertHandler.spellOutUnit('gal'),'gallons');
    assert.equal(convertHandler.spellOutUnit('L'),'liters');
    assert.equal(convertHandler.spellOutUnit('mi'),'miles');
    assert.equal(convertHandler.spellOutUnit('km'),'kilometers');
    assert.equal(convertHandler.spellOutUnit('lbs'),'pounds');
    assert.equal(convertHandler.spellOutUnit('kg'),'kilograms');
  });
  test('Convert gal to L', function(){
    assert.approximately(convertHandler.convert(1,'gal'),3.78541,0.1);
  });
  test('Convert L to gal', function(){
    assert.approximately(convertHandler.convert(3.78541,'L'),1,0.1);
  });
  test('Convert mi to km', function(){
    assert.approximately(convertHandler.convert(1,'mi'),1.60934,0.1);
  });
  test('Convert km to mi', function(){
    assert.approximately(convertHandler.convert(1.60934,'km'),1,0.1);
  });
  test('Convert lbs to kg', function(){
    assert.approximately(convertHandler.convert(1,'lbs'),0.453592,0.1);
  });
  test('Convert kg to lbs', function(){
    assert.approximately(convertHandler.convert(0.453592,'kg'),1,0.1);
  });
});
