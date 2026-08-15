import { testDiv, resultsDiv, finalStats, currStats, compMessage,
         perBestWpm, perBestAcc, startOverlay, text, resIcon } from "./dom.js";
import { countHits } from "./hits.js";
import { checkStorageWpm, checkStorageAcc } from './storage.js';

export function testEnd(finalTime, hits) {
    const wpm = currStats.wpm.textContent;
    const acc = currStats.accuracy.textContent;
    const newBestWpm = checkStorageWpm(Number(wpm));
    const newBestAcc = checkStorageAcc(parseInt(acc));

    countHits(hits);
    testDiv.classList.add('hidden');
    startOverlay.classList.remove('hidden');
    text.classList.remove('shown');
    resultsDiv.classList.remove('hidden');

    finalStats.wpm.textContent = wpm; 
    finalStats.accuracy.textContent = acc;
    finalStats.characters.rights.textContent = hits.rights;
    finalStats.characters.wrongs.textContent = hits.wrongs;
    if (finalTime >= 60) {
        let temp = finalTime % 60;
        finalStats.time.textContent = `${Math.floor(finalTime/60)}:${temp.toString().padStart(2, '0')}`;
    }else {
        finalStats.time.textContent = `0:${finalTime.toString().padStart(2, '0')}`;
    }

    if (newBestWpm === null) {
        perBestWpm.textContent = `${wpm} WPM`;
        perBestAcc.textContent = `${acc}`;
        resIcon.src = 'assets/images/icon-completed.svg'
        compMessage.headline.textContent = "Baseline Established!";
        compMessage.subtext.textContent  = "You've set the bar. Now the real challenge begins—time to beat it.";
    }else if (!newBestWpm) {
        resIcon.src = 'assets/images/icon-completed.svg'
        compMessage.headline.textContent = "Test Complete!";
        compMessage.subtext.textContent  = "Solid run. Keep pushing to beat your high score.";
    }else {
        perBestWpm.textContent = `${wpm} WPM`;
        perBestAcc.textContent = `${acc}`;
        resIcon.src = 'assets/images/icon-new-pb.svg'
        compMessage.headline.textContent = "High Score Smashed";
        compMessage.subtext.textContent  = "You're getting faster. That was incredible typing.";
    }
}