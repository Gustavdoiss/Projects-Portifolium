export let charArray = [];

export function countHits(hits) {
    hits.rights = 0, hits.wrongs = 0;
    for (let ans of charArray) {
        if (ans) {
            hits.rights++;
        }else {
            hits.wrongs++;
        }
    }
}
