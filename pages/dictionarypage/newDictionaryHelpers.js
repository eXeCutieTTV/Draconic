//helper
const collectForms = function collectForms(generator, cache, entry, label) {
    const baseWord = typeof entry === 'string' ? entry : entry?.word;
    if (!baseWord) return EMPTY_FORM_SET;
    if (cache.has(baseWord)) return cache.get(baseWord);

    const forms = new Set([baseWord]);
    try {
        const generated = generator(entry) || [];
        generated.forEach(form => {
            if (typeof form !== 'string') return;
            const candidate = form.trim();
            if (candidate) forms.add(candidate);
        });
    } catch (err) {
        if (label && !failedFormGenerators.has(label)) {
            console.warn(`traceOrigin: failed to build ${label} forms`, err);
            failedFormGenerators.add(label);
        }
    }

    cache.set(baseWord, forms);
    return forms;
}
//helper
const TEMP_noun_forms_list = function TEMP_noun_forms_list(noun) {
    const word = typeof noun === 'string' ? noun : noun?.word;
    if (!word) return [];
    if (typeof connect_suffix !== 'function' || typeof entries_to_text !== 'function') return [];

    let suffixes = [];
    if (typeof FLAT_NOUNS.SUFFIXES.MAP !== 'undefined') {
        suffixes = FLAT_NOUNS.SUFFIXES.MAP;
    } else if (typeof NOUNS.SUFFIXES.MAP !== 'undefined') {
        suffixes = Object.values(NOUNS.SUFFIXES.MAP || {})
            .flatMap(mask => Object.values(mask || {}))
            .flatMap(genderMap => Object.values(genderMap || {}))
            .flatMap(numberMap => Object.values(numberMap || {}))
            .flatMap(caseMap => Object.values(caseMap || {}));
    }

    if (!Array.isArray(suffixes) || !suffixes.length) return [];

    return suffixes
        .map(suffix => {
            try {
                return entries_to_text(connect_suffix(word, suffix));
            } catch {
                return null;
            }
        })
        .filter(Boolean);
}
//helper
const TEMP_verb_forms_list = function TEMP_verb_forms_list(verb) {
    const word = typeof verb === 'string' ? verb : verb?.word;
    if (!word) return [];
    if (typeof connect_suffix !== 'function' || typeof entries_to_text !== 'function') return [];

    let suffixes = [];
    if (typeof FLAT_VERB_OBJECT_SUFFIXES !== 'undefined') {
        suffixes = FLAT_VERB_OBJECT_SUFFIXES;
    } else if (typeof VERB_OBJECT_SUFFIXES !== 'undefined') {
        if (Array.isArray(VERB_OBJECT_SUFFIXES)) {
            suffixes = VERB_OBJECT_SUFFIXES;
        } else {
            suffixes = Object.values(VERB_OBJECT_SUFFIXES || {})
                .flatMap(mask => Object.values(mask || {}))
                .flatMap(formMap => Object.values(formMap || {}));
        }
    }

    if (!Array.isArray(suffixes) || !suffixes.length) return [];

    return suffixes
        .map(suffix => {
            try {
                return CHARACTERS.entriesToText(WORD_UTILS.connectSuffix(word, suffix));
            } catch {
                return null;
            }
        })
        .filter(Boolean);
}
//helper
const getNounForms = function getNounForms(wordObj) {
    return collectForms(TEMP_noun_forms_list, nounFormCache, wordObj, 'noun');
}
//helper
const getVerbForms = function getVerbForms(wordObj) {
    return collectForms(TEMP_verb_forms_list, verbFormCache, wordObj, 'verb');
}
//helper
const findDirectMatchKey = function findDirectMatchKey(word) {
    for (const [key, wordObj] of Object.entries(ALL_WORDS)) {
        if (wordObj?.word === word) return key;
    }
    return undefined;
}
//helper
const findNounKeys = function findNounKeys(word) {
    if (!word) return undefined;
    for (const [key, wordObj] of Object.entries(NOUNS)) {
        if (!wordObj?.word) continue;
        if (word === wordObj.word) return [key];
        if (getNounForms(wordObj).has(word)) return [key];
    }
    return undefined;
}
//helper
const findVerbKeys = function findVerbKeys(word) {
    if (!word) return undefined;
    for (const [key, wordObj] of Object.entries(VERBS)) {
        if (!wordObj?.word) continue;
        if (word === wordObj.word) return [key];
        if (getVerbForms(wordObj).has(word)) return [key];
    }
    return undefined;
}
//helper
const normaliseVerbPrefix = function normaliseVerbPrefix(entry) {
    if (!entry) return '';
    if (typeof entry === 'string') return entry;
    if (typeof entry === 'object') {
        if (typeof entry.word === 'string') return entry.word;
        if (typeof entry.prefix === 'string') return entry.prefix;
        if (typeof entry.text === 'string') return entry.text;
    }
    return '';
}
//helper
const matchPrefixCollection = function matchPrefixCollection(sourceText, collection, resolveRest) {
    if (!collection) return undefined;

    const isArrayCollection = Array.isArray(collection);
    const rawEntries = isArrayCollection
        ? Array.from(collection.entries())
        : Object.entries(collection);
    const entries = rawEntries
        .map(([key, value]) => {
            const prefix = typeof value === 'string'
                ? value
                : (typeof value?.word === 'string' ? value.word : '');
            const entryKey = isArrayCollection
                ? (prefix || String(key))
                : key;
            return [entryKey, prefix];
        })
        .filter(([, prefix]) => prefix.length > 0)
        .sort((a, b) => b[1].length - a[1].length);

    for (const [key, prefix] of entries) {
        if (!prefix) continue;
        const candidates = prefix.endsWith('-')
            ? [prefix, prefix.slice(0, -1)]
            : [prefix];

        let remainder = null;
        for (const candidate of candidates) {
            if (!candidate) continue;
            if (!sourceText.startsWith(candidate)) continue;
            remainder = sourceText.slice(candidate.length);
            break;
        }

        if (remainder === null) continue;

        const nextKeys = resolveRest(remainder);
        if (!nextKeys) continue;
        return [key, ...(Array.isArray(nextKeys) ? nextKeys : [nextKeys])];
    }

    return undefined;
}
//helper
const matchVerbSubjectPrefix = function matchVerbSubjectPrefix(sourceText) {
    let prefixesSource = [];
    if (typeof FLAT_VERB_SUBJECT_PREFIXES !== 'undefined') {
        prefixesSource = Array.isArray(FLAT_VERB_SUBJECT_PREFIXES)
            ? FLAT_VERB_SUBJECT_PREFIXES
            : Object.values(FLAT_VERB_SUBJECT_PREFIXES || {});
    }
    const prefixes = prefixesSource
        .map(normaliseVerbPrefix)
        .filter(prefix => typeof prefix === 'string' && prefix.length > 0)
        .sort((a, b) => b.length - a.length);

    for (const prefix of prefixes) {
        if (!prefix) continue;
        const candidates = prefix.endsWith('-')
            ? [prefix, prefix.slice(0, -1)]
            : [prefix];

        let remainder = null;
        for (const candidate of candidates) {
            if (!candidate) continue;
            if (!sourceText.startsWith(candidate)) continue;
            remainder = sourceText.slice(candidate.length);
            break;
        }

        if (remainder === null) continue;

        const verbKeys = findVerbKeys(remainder);
        if (verbKeys) {
            return [prefix, ...verbKeys];
        }
    }

    return undefined;
}
//helper
const traceOrigin = function traceOrigin(text) {
    if (!text) return undefined;

    const directKey = findDirectMatchKey(text);
    if (directKey) return [directKey];

    const prepositionNoun = matchPrefixCollection(text, PREPOSITIONS, remainder => {
        const particleChain = matchPrefixCollection(remainder, PARTICLES, inner => findNounKeys(inner));
        if (particleChain) return particleChain;
        return findNounKeys(remainder);
    });
    if (prepositionNoun) return prepositionNoun;

    const particleNoun = matchPrefixCollection(text, PARTICLES, remainder => findNounKeys(remainder));
    if (particleNoun) return particleNoun;

    const subjectPrefVerb = matchVerbSubjectPrefix(text);
    if (subjectPrefVerb) return subjectPrefVerb;

    const nounKeys = findNounKeys(text);
    if (nounKeys) return nounKeys;

    const verbKeys = findVerbKeys(text);
    if (verbKeys) return verbKeys;

    return undefined;
}
const test = function test(word) {
    console.log(word);
}


const standard = {
    collectForms,
    TEMP_noun_forms_list,
    TEMP_verb_forms_list,
    getNounForms,
    getVerbForms,
    findDirectMatchKey,
    findNounKeys,
    findVerbKeys,
    normaliseVerbPrefix,
    matchPrefixCollection,
    traceOrigin,
    test,
}

const helperFunctions =
{
    standard,
}