import { testDiv, resultsDiv, finalStats, currStats } from "./dom.js";
import { countHits } from "./hits.js";

export function testEnd(finalTime, hits) {
    countHits(hits);
    testDiv.classList.add('hidden');
    resultsDiv.classList.remove('hidden');

    finalStats.wpm.textContent = currStats.wpm.textContent; 
    finalStats.accuracy.textContent = currStats.accuracy.textContent;
    finalStats.characters.rights.textContent = hits.rights;
    finalStats.characters.wrongs.textContent = hits.wrongs;
    if (finalTime >= 60) {
        let temp = finalTime % 60;
        finalStats.time.textContent = `${Math.floor(finalTime/60)}:${temp.toString().padStart(2, '0')}`;
    }else {
        finalStats.time.textContent = `0:${finalTime.toString().padStart(2, '0')}`;
    }
}