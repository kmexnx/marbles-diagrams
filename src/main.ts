import { from, fromEvent, take } from 'rxjs';

import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Marble Reactive Diagrams!</h1>
  <div class="container"></div>
  <div class="sum"></div>
`;

let val = 0;
const addMarble = (val: number | string, element?: string) => {
  const el = app.querySelector(element ? element : '.container')!.appendChild(document.createElement('div'));  
  el.setAttribute('class','marble');
  el.appendChild(document.createElement('div')).append(`${val}`);
}

const arr = Array(10).fill(null).map(() => Math.floor(Math.random() * 100));

const observable = from(arr).pipe(take(10));

const subscription = observable.subscribe({
  next(x) {
    addMarble(x);
  }
});

const click$ = fromEvent(app.querySelectorAll('.marble')!, 'click');

click$.subscribe(x => {
  const el = x.target as HTMLDivElement;
  addMarble(val = val + Number(el.innerText), '.sum');
});

subscription.unsubscribe();
console.log('After suscribe');


