import * as dom from './dom.js';
import { testEnd } from './final.js';
import { clocking } from './clock.js';
import { charArray, countHits } from './hits.js';
import { checkEnter } from './storage.js';

checkEnter();

dom.modifiers.mode.addEventListener('change', () => {
    if (dom.modifiers.mode.value == 'timed') {
        dom.currStats.time.textContent = '0:60';
    }else {
        dom.currStats.time.textContent = '0:00';
    }
})

charArray.length = 0;

async function searchJson() {
    let data;
    try {
        const response = await fetch('./data/data.json');
        if (!response.ok) throw new Error('404: data.json not found.');
        data = await response.json();
    } catch (error) {
        console.log(error.message);
        return;
    }

    let clockId, time2, i;

    dom.start.addEventListener('click', () => {
        clearInterval(clockId);
        charArray.length = 0;
        dom.uInput.value = "";
        i = Math.floor(Math.random() * 10);
        //Fill challenge text
        while (dom.text.firstChild) {
            dom.text.removeChild(dom.text.firstChild);
        }

        for (let char of [...data[dom.modifiers.difficulty.value][i].text]) {
            const span = document.createElement("span");
            span.innerText = char;
            dom.text.append(span);
        }
        //Concurring time
        ({ clock: clockId, time: time2 } = clocking());
    })

    dom.uInput.addEventListener('keydown', (event) => {
        const denied = ['a', 'c', 'v', 'x', 'z', 'y'];
        if ((event.ctrlKey || event.metaKey) && denied.includes(event.key.toLowerCase())) {
            event.preventDefault();
        }
    })

    dom.uInput.addEventListener('input', () => {
        let position = dom.uInput.value.length - 1;
        const hits = {
            rights: 0,
            wrongs: 0
        }
        dom.text.children[position + 1]?.classList.remove('right');
        dom.text.children[position + 1]?.classList.remove('wrong');
        dom.text.children[position + 1]?.classList.add('ketAt');

        if (dom.uInput.value[position] == dom.text.children[position]?.textContent) {
            if (charArray[position] === undefined) {
                charArray[position] = true;
            }
            dom.text.children[position]?.classList.add('right');
            dom.text.children[position]?.classList.remove('wrong');

            if (position + 1 == data[dom.modifiers.difficulty.value][i].text.length) {
                clearInterval(clockId);
                testEnd(time2.seconds, hits);
            }
        }else {
            charArray[position] = false;
            dom.text.children[position]?.classList.add('wrong');
            dom.text.children[position]?.classList.remove('right');
        }

        countHits(hits);

        dom.currStats.accuracy.textContent = `${((hits.rights/(hits.rights+hits.wrongs)) * 100).toFixed(0)}%`
    })

    dom.retry.addEventListener('click', () => {
        dom.testDiv.classList.remove('hidden');
        dom.resultsDiv.classList.add('hidden');
        while (dom.text.firstChild) {
            dom.text.removeChild(dom.text.firstChild);
        }
        dom.uInput.value = "";
        dom.currStats.accuracy.textContent = '100%';
        if (dom.modifiers.mode.value == "passage") {
            dom.currStats.time.textContent = "0:00";
        }else {
            dom.currStats.time.textContent = "0:60";
        }
        dom.currStats.wpm.textContent = '0';
    })
}

searchJson();
