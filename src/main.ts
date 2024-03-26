import './style.css'
//import { setupCounter } from './counter.ts'
import { gameboardInit } from './gameboard.ts';

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
   
//     <h1>T3</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//   </div>
// `

// document.querySelector<HTMLDivElement>('#gameBoard')!.innerHTML = `
//   <div id="gameboardDiv">
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
gameboardInit(document.querySelector<HTMLDivElement>('#gameBoard')!)
