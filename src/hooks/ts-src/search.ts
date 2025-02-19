import { CORPUS } from './corpus.js';
import { sourcesNewToOld } from './linkMap.js';
import { Lang } from '@/consts/lang.js';
import { Result } from '@/consts/types.js';

export const corpusNewToOld = [...CORPUS].toSorted((a, b) => sourcesNewToOld.indexOf(a.source) - sourcesNewToOld.indexOf(b.source))


export async function getMatches(regex_str: string, lang: Lang): Promise<Result[]> {
    const l = lang === 'x-pmcp' ? 'pmcp' : lang;
    return corpusNewToOld.filter(item => item[l].match(new RegExp(regex_str, 'gi'))).map(item => {
        const matchedPortions = [];
        /* 
        g - global 
        i - case insensitive
        d - get the indices */
        const myRe = new RegExp(regex_str, 'gid');
        let myArray: RegExpExecArray | null;
        while ((myArray = myRe.exec(item[l])) !== null) {
            matchedPortions.push({
                match: myArray[0],
                beginIndex: myArray.indices![0][0],
                endIndex: myRe.lastIndex
            });

            // zero-width match
            if (myArray.indices![0][0] === myRe.lastIndex) {
                // According to MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec
                // > If the regex may match zero-length characters (e.g. /^/gm), increase its lastIndex manually each time to avoid being stuck in the same place.
                myRe.lastIndex++;
            }
        }
        return { item, matchedPortions: matchedPortions };
    });
}
