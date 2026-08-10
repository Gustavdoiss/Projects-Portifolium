import { perBestAcc, perBestWpm } from "./dom.js";

export function checkStorageWpm(wpm) {
  if (!localStorage.getItem('personalBestWpm')) {
      localStorage.setItem('personalBestWpm', wpm);
      return null;
  }
  if (wpm > Number(localStorage.getItem('personalBestWpm'))) {
      localStorage.setItem('personalBestWpm', wpm);
      return true;
  }else {
      return false;
  }
}

export function checkStorageAcc(acc) {
  if (!localStorage.getItem('personalBestAcc')) {
    localStorage.setItem('personalBestAcc', acc);
    return null;
}
if (acc > Number(localStorage.getItem('personalBestAcc'))) {
    localStorage.setItem('personalBestAcc', acc);
    return true;
}else {
    return false;
}
}

export function checkEnter() {
  if ( localStorage.getItem('personalBestAcc') && localStorage.getItem('personalBestWpm') ){
      perBestWpm.textContent = localStorage.getItem('personalBestWpm');
      perBestAcc.textContent = `${localStorage.getItem('personalBestAcc')}%`;
  }
}