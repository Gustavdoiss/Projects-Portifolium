//DOM Elements Pre-Start
export const perBestWpm = document.querySelector('.bestWpm');
export const perBestAcc = document.querySelector('.bestAcc')
export const start = document.querySelector('.startButton');
export const startOverlay = document.querySelector('.buttonOverlay');
export const text = document.querySelector('.textPassage');
export const testDiv = document.querySelector('.test');
export const uInput = document.querySelector('.userT input');
export const span = document.querySelector('span')

export const currStats = {
    wpm: document.querySelector('.wpm span'),
    accuracy: document.querySelector('.accuracy span'),
    time: document.querySelector('.time span')
}

export const modifiers = {
    difficulty: document.querySelector('#diffSelector'),
    mode: document.querySelector('#modeSelector')
}

//DOM Elements Result
export const resIcon = document.querySelector('.resultsIcon');
export const retry = document.querySelector('.retryButton');
export const resultsDiv = document.querySelector('.results');

export const compMessage = {
    headline: document.querySelector('.headline'),
    subtext: document.querySelector('.subtext')
}

export const finalStats = {
    wpm: document.querySelector('.finalWpm span'),
    accuracy: document.querySelector('.finalAccuracy span'),
    time: document.querySelector('.finalTime span'),
    characters: {
        rights: document.querySelector('.rights'),
        wrongs: document.querySelector('.wrongs')
    }
}