import { Looper, Duration } from '../src/main';

describe('Looper', () => {
  it('should loop 4 times', async () => {
    const duration = new Duration({ milliseconds: 100 });
    const looper = new Looper(duration);
    const repeat = 4;
    const spy = jest.fn();

    looper.loop(spy, repeat); // needs > 400ms to complete.
    await new Promise((resolve) => setTimeout(resolve, duration.inMilliseconds * (repeat + 1)));

    expect(spy).toHaveBeenCalledTimes(repeat);
  });
});

describe('Duration', () => {
  it('should create a duration of 1 day', () => {
    const duration = new Duration({ days: 1 });
    expect(duration.inMilliseconds).toBe(86400000);
  });
});
