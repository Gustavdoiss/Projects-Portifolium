import { currStats, modifiers } from "./dom.js";
import { countHits } from "./hits.js";
import { testEnd } from "./final.js";

export function clocking() {
    let clock, wpm;
    const hits = {
        rights: 0,
        wrongs: 0
    }
    const time = { seconds: 0 };

    if (modifiers.mode.value == 'passage') {
        let s = 1, m = 0;
        currStats.time.textContent = '0:00';
        clock = setInterval(() => {
            if (s == 60) {
                s = 0;
                m++;
            }
            currStats.time.textContent = `${m}:${s.toString().padStart(2, '0')}`;
            s++;

            countHits(hits);
            time.seconds = (s + m * 60);
            wpm = Math.floor(((hits.rights/5) / time.seconds)*60);
            currStats.wpm.textContent = wpm;
        }, 1000);
    }else {
        let s = 59, t;
        currStats.time.textContent = '0:60';
        clock = setInterval(() => {
            time.seconds = 60 - s;

            currStats.time.textContent = `0:${s.toString().padStart(2, '0')}`;
            s--;

            countHits(hits);
            wpm = Math.floor(((hits.rights/5) / time.seconds)*60);
            currStats.wpm.textContent = wpm;
            if (s < 0) {
                clearInterval(clock);
                testEnd(time.seconds, hits);
            }
        }, 1000)
    }

    return { clock, time };
}