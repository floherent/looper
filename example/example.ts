import { Duration, Looper } from '../src/main';

function main() {
  const looper = new Looper(new Duration({ seconds: 1 }));

  const action = () => console.log('Hello, Looper!');

  looper.loop(action); // loop 5 times by default every second.
}

main();
