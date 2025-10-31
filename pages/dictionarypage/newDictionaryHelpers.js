const test = function test(word) {
    console.log(word);
}
const clearPageById = function clearPageById(id) {
    const page = document.getElementById(id);
    if (!page) return
    if (page) {
        page.remove();
        console.log('removed page by id: ' + id);
    }
}
const createPageById = function createPageById(id, html) {
    let page = document.getElementById(id);
    if (!page) {
        page = document.createElement('div');
        page.id = id;
        page.className = 'page';
    }
    page.innerHTML = html;

    const pagewrapper = document.querySelector('.pages');

    if (!pagewrapper) {
        console.error("no div with class '.pages'");
        return;
    }

    pagewrapper.appendChild(page);
}
const createDivById = function createDivById(id, wrapper, html) {
    let div = document.getElementById(id);
    if (!div) {
        div = document.createElement('div');
    }
    if (id.length > 0) {
        div.id = id;
    }
    div.innerHTML = html;

    const divwrapper = wrapper;

    if (!divwrapper) {
        console.error("no div wrapper");
        return;
    }

    divwrapper.appendChild(div);
}

const sliceKeyword = function sliceKeyword(keyword, x) {
    const slice1 = keyword.slice(0, -x);
    const slice2 = keyword.slice(-x);
    return { slice1, slice2 };
}

const standard = {
    test,
    clearPageById,
    createPageById,
    createDivById,
    sliceKeyword
}


const neoSuffixChecker = function neoSuffixChecker(keyword, map, resultArray) {
    const array = WORD_UTILS.matchSuffix(keyword, map);
    if (!array) return null;

    const suffixes = array[0] || [];
    const Suffixtype = array[2];
    const Suffixperson = array[3];
    const Suffixgender = array[4];
    const Suffixnumber = array[5];
    const Suffixdeclensions = array[1] || [];

    const appliedSuffix = suffixes[0] || '';
    const unappliedSuffix = suffixes[1] || '';

    let usedSuffix = '';
    if (appliedSuffix && unappliedSuffix) {
        if (keyword.endsWith(appliedSuffix) && keyword.endsWith(unappliedSuffix)) {
            usedSuffix = appliedSuffix;
        } else if (keyword.endsWith(unappliedSuffix)) {
            usedSuffix = unappliedSuffix;
        } else return null;
    } else if (appliedSuffix) usedSuffix = appliedSuffix;
    else if (unappliedSuffix) usedSuffix = unappliedSuffix;
    if (!usedSuffix) return null;

    const suffixLength = usedSuffix.length;
    const { slice1, slice2 } = helperFunctions.standard.sliceKeyword(keyword, suffixLength);
    const Suffixstem = slice1;

    const result = {
        Suffixtype,
        Suffixperson,
        Suffixgender,
        Suffixnumber,
        Suffixdeclensions,
        appliedSuffix,
        unappliedSuffix,
        usedSuffix,
        Suffixstem,
        slice2
    };

    // push into provided array if it is a real array
    if (Array.isArray(resultArray)) resultArray.push(result);

    // also return the result so caller can use it immediately
    return result;
};





const neoPrefixChecker = function neoPrefixChecker(keyword, map, resultArray) {
    const array = WORD_UTILS.matchPrefix(keyword, map);
    console.log(array);
    if (!array) {
        return;
    }
    const prefix = array[0];
    //const Prefixtype = array[1];
    const Prefixperson = array[1];
    const Prefixgender = array[2];
    const Prefixnumber = array[3];
    const Prefixdeclension = array[1] || [];
    console.log(Prefixdeclension);

    console.log(
        'Prefixperson | ', Prefixperson,
        'Prefixgender | ', Prefixgender,
        'Prefixnumber | ', Prefixnumber
    )

    const usedPrefix = prefix; // no variants

    if (!usedPrefix) {
        return;
    }

    const prefixLength = usedPrefix.length;
    const { slice1, slice2 } = helperFunctions.standard.sliceKeyword(keyword, prefixLength);
    const Prefixstem = slice1;
    console.log(prefix, usedPrefix); // worked earlier - havent changed anything:q


    const result = {
        Prefixperson,
        Prefixgender,
        Prefixnumber,
        Prefixdeclension,
        usedPrefix,
        Prefixstem,
        slice2
    }
    // push into provided array if it is a real array
    if (Array.isArray(resultArray)) resultArray.push(result);

    return result;
    //neoPrefixChecker('xenæf', VERBS.PREFIXES.FLAT_MATCHES);
}

const affixHelpers = {
    neoSuffixChecker,
    neoPrefixChecker
}

const helperFunctions =
{
    standard,
    affixHelpers
}