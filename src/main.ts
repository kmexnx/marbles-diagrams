import { from, take } from 'rxjs';

import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Marble Reactive Diagrams!</h1>
  <div class="container"></div>
`;

const addMarble = (val: number | string) => {
  const el = app.querySelector('.container')!.appendChild(document.createElement('div'));  
  el.setAttribute('class','marble');
  el.append(`${val}`);
}

const arr = Array(10).fill(null).map(() => Math.floor(Math.random() * 100));

const observable = from(arr).pipe(take(5));

const subscription = observable.subscribe({
  next(x) {
    addMarble(x);
  }
});
subscription.unsubscribe();
console.log('After suscribe');


