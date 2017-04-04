import invariant from 'invariant';
import isFizz from './lib/isFizz';
import isBuzz from './lib/isBuzz';
import isFizzBuzz from './lib/isFizzBuzz';

const ST_FIZZ_BUZZ = {
  FIZZ: 'Fizz',
  BUZZ: 'Buzz',
  FIZZ_BUZZ: 'FizzBuzz',
  INPUT_ERROR: 'InputError',
  NAN_ERROR: 'NaNError'
};

const isNumber = x => typeof x === 'number';
const isArray = x => Array.isArray(x);

const fizzBuzz = (input) => {
  invariant(isArray(input), ST_FIZZ_BUZZ.INPUT_ERROR);

  return input.map(x => {
    invariant(isNumber(x), ST_FIZZ_BUZZ.NAN_ERROR);
    return x;
  })

  .filter(x => isFizzBuzz(x) || isFizz(x) || isBuzz(x))

  .map(x => {
    if (isFizzBuzz(x)) {
      return ST_FIZZ_BUZZ.FIZZ_BUZZ;

    } else if (isFizz(x)) {
      return ST_FIZZ_BUZZ.FIZZ;

    } else {
      return ST_FIZZ_BUZZ.BUZZ;
    }
  });
};

export default {
  ST_FIZZ_BUZZ,
  fizzBuzz
};
