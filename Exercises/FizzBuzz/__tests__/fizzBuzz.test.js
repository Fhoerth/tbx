import test from 'tape';
import sinon from 'sinon';
import * as fizzBuzzModule from '../fizzBuzz';
import * as isFizzModule from '../lib/isFizz';
import * as isBuzzModule from '../lib/isBuzz';
import * as isFizzBuzzModule from '../lib/isFizzBuzz';

test('isFizz', function (t) {
  t.true(isFizzModule.default(0));
  t.true(isFizzModule.default(3));
  t.true(isFizzModule.default(6));
  // Altough 13 is not divisible by 3, it contains number 3
  t.true(isFizzModule.default(13));

  t.false(isFizzModule.default(1));
  t.false(isFizzModule.default(2));
  t.false(isFizzModule.default(4));

  t.end();
});

test('isBuzz', function (t) {
  t.true(isBuzzModule.default(0));
  t.true(isBuzzModule.default(5));
  t.true(isBuzzModule.default(10));
  // Altough 51 is not divisible by 5, it contains number 5
  t.true(isBuzzModule.default(51));

  t.false(isBuzzModule.default(1));
  t.false(isBuzzModule.default(2));
  t.false(isBuzzModule.default(3));
  t.false(isBuzzModule.default(4));
  t.false(isBuzzModule.default(6));

  t.end();
});

test('isFizzBuzz', function (t) {
  t.true(isFizzBuzzModule.default(15));
  t.false(isFizzBuzzModule.default(51));
  t.false(isFizzBuzzModule.default(13));

  t.end();
});

test('fizzBuzz (input check)', function (t) {
  t.plan(5);
  const input = ['3', 6, 9];
  let errorThrown = false;

  try {
    fizzBuzzModule.default.fizzBuzz(input);
  } catch (e) {
    t.equal(e.message, fizzBuzzModule.default.ST_FIZZ_BUZZ.NAN_ERROR);
    errorThrown = true;
  }

  t.true(errorThrown);

  const input2 = [3, 6, 9];
  errorThrown = false;
  try {
    fizzBuzzModule.default.fizzBuzz(input2);
  } catch (e) {
    errorThrown = true;
  }

  t.false(errorThrown);

  const input3 = 'NotAnArray';
  errorThrown = false;
  try {
    fizzBuzzModule.default.fizzBuzz(input3);
  } catch (e) {
    t.equal(e.message, fizzBuzzModule.default.ST_FIZZ_BUZZ.INPUT_ERROR);
    errorThrown = true;
  }

  t.true(errorThrown);

  t.end();
});

test('fizzBuzz (fizz numbers input)', function (t) {
  const ST_FIZZ_BUZZ = fizzBuzzModule.default.ST_FIZZ_BUZZ;
  const stub = sinon.stub(isFizzModule, 'default');

  // Filter
  stub.onCall(0).returns(true);
  stub.onCall(1).returns(false);
  // Map
  stub.onCall(2).returns(true);
  stub.onCall(3).returns(false);

  const fizzInput = [1, 1];
  const output = fizzBuzzModule.default.fizzBuzz(fizzInput);

  t.deepEqual(output, [ST_FIZZ_BUZZ.FIZZ]);
  isFizzModule.default.restore();
  t.end();
});

test('fizzBuzz (buzz numbers input)', function (t) {
  const ST_FIZZ_BUZZ = fizzBuzzModule.default.ST_FIZZ_BUZZ;
  const stub = sinon.stub(isBuzzModule, 'default');

  // Filter
  stub.onCall(0).returns(true);
  stub.onCall(1).returns(false);
  // Map
  stub.onCall(2).returns(true);

  const buzzInput = [1, 1];
  const output = fizzBuzzModule.default.fizzBuzz(buzzInput);

  isBuzzModule.default.restore();

  t.deepEqual(output, [ST_FIZZ_BUZZ.BUZZ]);
  t.end();
});

test('fizzBuzz (fizzBuzz numbers input)', function (t) {
  const ST_FIZZ_BUZZ = fizzBuzzModule.default.ST_FIZZ_BUZZ;
  const stub = sinon.stub(isFizzBuzzModule, 'default');

  // Filter
  stub.onCall(0).returns(true);
  stub.onCall(1).returns(false);
  // Map
  stub.onCall(2).returns(true);

  const fizzBuzzInput = [1, 1];
  const output = fizzBuzzModule.default.fizzBuzz(fizzBuzzInput);

  isFizzBuzzModule.default.restore();

  t.deepEqual(output, [ST_FIZZ_BUZZ.FIZZ_BUZZ]);
  t.end();
});

test('Integration test', function (t) {
  const ST_FIZZ_BUZZ = fizzBuzzModule.default.ST_FIZZ_BUZZ;
  const input = [0, 1, 2, 3, 5, 10, 13, 15, 52];
  const output = fizzBuzzModule.default.fizzBuzz(input);

  t.deepEqual(output, [
    ST_FIZZ_BUZZ.FIZZ_BUZZ,
    ST_FIZZ_BUZZ.FIZZ,
    ST_FIZZ_BUZZ.BUZZ,
    ST_FIZZ_BUZZ.BUZZ,
    ST_FIZZ_BUZZ.FIZZ,
    ST_FIZZ_BUZZ.FIZZ_BUZZ,
    ST_FIZZ_BUZZ.BUZZ
  ]);

  t.end();
});
