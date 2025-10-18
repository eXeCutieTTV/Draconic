// when you press the first search button, then the id of the first field and button gets replaces, and those ids are placed into the onpage search button and field?
// hi 16-10-2025
// === DATA ===
const GENDERS = {
    E: { NAME: "exhalted", SHORT: "e", INCLUDED: ["animates", "all"] },
    R: { NAME: "rational", SHORT: "r", INCLUDED: ["animates", "all"] },
    MON: { NAME: "monstrous", SHORT: "mon", INCLUDED: ["animates", "all"] },
    I: { NAME: "irrational", SHORT: "i", INCLUDED: ["animates", "all"] },
    MAG: { NAME: "magical", SHORT: "mag", INCLUDED: ["inanimates", "all"] },
    MUN: { NAME: "mundane", SHORT: "mun", INCLUDED: ["inanimates", "all"] },
    A: { NAME: "abstract", SHORT: "a", INCLUDED: ["inanimates", "all"] }// /\(/o.o\)/\ - Spooky the spider
}

const NUMBERS = {
    S: "singular",
    D: "dual",
    P: "plural"
}

// === NOUN DATA ===
const MOODS = {
    D: "directive",
    R: "recessive",
}

const CONJUGATIONS = { // /\(/o.o\)/\ - Spooky the spider
    [MOODS.D]: {
        [GENDERS.E.NAME]: {
            [NUMBERS.S]: { 1: "ēn", 2: "æn", 3: "ēn", 4: "ħán" },
            [NUMBERS.D]: { 1: "(ē)χen", 2: "(y)χen", 3: "(o)χen", 4: "ħóχħon" },
            [NUMBERS.P]: { 1: "illyn", 2: "ān", 3: "ē'yn", 4: "q̇yn" }
        },
        [GENDERS.R.NAME]: {
            [NUMBERS.S]: { 1: "ēf", 2: "(a)xef", 3: "lef", 4: "lef" },
            [NUMBERS.D]: { 1: "eχef", 2: "hyf", 3: "(o)χef", 4: "(o)χef" },
            [NUMBERS.P]: { 1: "yf", 2: "hyf", 3: "'yf", 4: "'yf" }
        },
        [GENDERS.MON.NAME]: {
            [NUMBERS.S]: { 1: "ô", 2: "ô", 3: "ô", 4: "ô" },
            [NUMBERS.D]: { 1: "yħq̇ô", 2: "q̇ô", 3: "q̇ô", 4: "ûq̇ô" },
            [NUMBERS.P]: { 1: "oħô", 2: "q̇ô", 3: "q̇ô", 4: "ûq̇ô" }
        },
        [GENDERS.I.NAME]: {
            [NUMBERS.S]: { 1: "llūl", 2: "cūl", 3: "cūl", 4: "cūl" },
            [NUMBERS.D]: { 1: "(æ)llūl", 2: "(')illūl", 3: "(')illūl", 4: "(')illūl" },
            [NUMBERS.P]: { 1: "(æ)llūl", 2: "(')illūl", 3: "(')illūl", 4: "(')illūl" } // /\(/o.o\)/\ - Spooky the spider
        },
        [GENDERS.MAG.NAME]: {
            [NUMBERS.S]: { 1: "(ō)χ", 2: "huχ", 3: "huχ", 4: "q̇ħúχ" },
            [NUMBERS.D]: { 1: "uχ", 2: "'ūχ", 3: "'ūχ", 4: "(')ūχ" },
            [NUMBERS.P]: { 1: "uχ", 2: "'ūχ", 3: "'ūχ", 4: "(')ūχ" }
        },
        [GENDERS.MUN.NAME]: {
            [NUMBERS.S]: { 1: "(e)rk", 2: "tyk", 3: "tyk", 4: "(á)rk" },
            [NUMBERS.D]: { 1: "ōrk", 2: "ōrk", 3: "ōrk", 4: "(')urk" },
            [NUMBERS.P]: { 1: "ōrk", 2: "ōrk", 3: "ōrk", 4: "(')urk" }
        },
        [GENDERS.A.NAME]: {
            [NUMBERS.S]: { 1: "(y)q̇", 2: "(o)q̇", 3: "(o)q̇", 4: "(ú)ħáq̇" },
            [NUMBERS.D]: { 1: "āq̇", 2: "ōq̇", 3: "ōq̇", 4: "ūq̇" },
            [NUMBERS.P]: { 1: "āq̇", 2: "ōq̇", 3: "ōq̇", 4: "ūq̇" }
        }
    },
    [MOODS.R]: {
        [GENDERS.E.NAME]: {
            [NUMBERS.S]: { 1: "oħân", 2: "ħân", 3: "ēqân", 4: "qân" },
            [NUMBERS.D]: { 1: "ħân", 2: "(ō)n", 3: "on", 4: "ħûn" },
            [NUMBERS.P]: { 1: "illyrn", 2: "(ō)rn", 3: "ē'yrn", 4: "q̇yrn" }
        },
        [GENDERS.R.NAME]: {
            [NUMBERS.S]: { 1: "oħâf", 2: "ħâf", 3: "(o)qâf", 4: "(o)qâf" },
            [NUMBERS.D]: { 1: "īllyf", 2: "(')ūllef", 3: "yf", 4: "yf" },
            [NUMBERS.P]: { 1: "īllyf", 2: "(')ūllef", 3: "ūlef", 4: "'ūlef" }
        },
        [GENDERS.MON.NAME]: {
            [NUMBERS.S]: { 1: "oħô", 2: "qâħó", 3: "qâħó", 4: "ô" },
            [NUMBERS.D]: { 1: "ūħó", 2: "q̇ô", 3: "q̇ô", 4: "ûq̇ô" },
            [NUMBERS.P]: { 1: "ōq̇ô", 2: "q̇ô", 3: "q̇ô", 4: "ûq̇ô" }
        },
        [GENDERS.I.NAME]: {
            [NUMBERS.S]: { 1: "llūl", 2: "qâllūl", 3: "qâllūl", 4: "qâllūl" },
            [NUMBERS.D]: { 1: "(y)ll'ūl", 2: "(')llūl", 3: "(')llūl", 4: "(')llūl" },
            [NUMBERS.P]: { 1: "(y)ll'ūl", 2: "(')ūcūl", 3: "(')ūcūl", 4: "(')ūcūl" }
        },
        [GENDERS.MAG.NAME]: {
            [NUMBERS.S]: { 1: "(ō)ħúχħ", 2: "(y)q̇ħôχ", 3: "(y)q̇ħôχ", 4: "q̇ħôχ" },
            [NUMBERS.D]: { 1: "(a)lluχ", 2: "(y)lūrχ", 3: "(y)lūrχ", 4: "(')ūrχ" },
            [NUMBERS.P]: { 1: "(a)lluχ", 2: "(y)lūrχ", 3: "(y)lūrχ", 4: "(')ūrχ" }
        },
        [GENDERS.MUN.NAME]: {
            [NUMBERS.S]: { 1: "(o)ħárk	", 2: "ħárk	", 3: "ħárk	", 4: "q̇ħárk" },
            [NUMBERS.D]: { 1: "ōrk", 2: "ōrk", 3: "ōrk", 4: "(')urk	" },
            [NUMBERS.P]: { 1: "ōrk", 2: "ōrk", 3: "ōrk", 4: "(')urk	" }
        },  // /\(/o.o\)/\ - Spooky the spider
        [GENDERS.A.NAME]: {
            [NUMBERS.S]: { 1: "aħôq̇", 2: "(y)q̇ħôq̇", 3: "(y)q̇ħôq̇", 4: "áq̇ħôq̇" },
            [NUMBERS.D]: { 1: "āq̇", 2: "ōq̇", 3: "ōq̇", 4: "ūq̇" },
            [NUMBERS.P]: { 1: "āq̇", 2: "ōq̇", 3: "ōq̇", 4: "ūq̇" }
        }
    }
}
// === VERB DATA ===
const person = {
    1: "1. Person",
    2: "2. Person",
    3: "3. Person"
}

const affixState = {
    P: "isPrefix",
    S: "isSuffix"
}

const AFFIXSTATE = {
    [affixState.P]: {
        [GENDERS.E.NAME]: {
            [NUMBERS.S]: { [person[1]]: "xen-", [person[2]]: "syn-", [person[3]]: "ten-" },
            [NUMBERS.D]: { [person[1]]: "xyn-", [person[2]]: "són-", [person[3]]: "q̇yn-" },
            [NUMBERS.P]: { [person[1]]: "hen-", [person[2]]: "tháħ-", [person[3]]: "tyn-" }
        },
        [GENDERS.R.NAME]: {
            [NUMBERS.S]: { [person[1]]: "xef-", [person[2]]: "sy-", [person[3]]: "tolli-" },
            [NUMBERS.D]: { [person[1]]: "xyf-", [person[2]]: "sónlli-", [person[3]]: "q̇yll-" },
            [NUMBERS.P]: { [person[1]]: "hef-", [person[2]]: "tháll-", [person[3]]: "tyf-" }
        },
        [GENDERS.MON.NAME]: {
            [NUMBERS.S]: { [person[1]]: "χħô-", [person[2]]: "sô-", [person[3]]: "tô-" },
            [NUMBERS.D]: { [person[1]]: "xóħ-", [person[2]]: "sónq̇ħó-", [person[3]]: "q̇ħó-" },
            [NUMBERS.P]: { [person[1]]: "hô-", [person[2]]: "tháq̇ħó-", [person[3]]: "tuħ-" }
        },
        [GENDERS.I.NAME]: {
            [NUMBERS.S]: { [person[1]]: "xellu-", [person[2]]: "sucu-", [person[3]]: "tócu-" },
            [NUMBERS.D]: { [person[1]]: "llu-", [person[2]]: "sóncu-", [person[3]]: "q̇ácu-" },
            [NUMBERS.P]: { [person[1]]: "llu-", [person[2]]: "thácu-", [person[3]]: "tīll-" }
        },
        [GENDERS.MAG.NAME]: {
            [NUMBERS.S]: { [person[1]]: "xo-", [person[2]]: "su-", [person[3]]: "toħ-" },
            [NUMBERS.D]: { [person[1]]: "ho-", [person[2]]: "thâ-", [person[3]]: "tū-" },
            [NUMBERS.P]: { [person[1]]: "ho-", [person[2]]: "thâ-", [person[3]]: "tū-" }
        },
        [GENDERS.MUN.NAME]: {
            [NUMBERS.S]: { [person[1]]: "xyr-", [person[2]]: "syr-", [person[3]]: "try-" },
            [NUMBERS.D]: { [person[1]]: "ry-", [person[2]]: "thár-", [person[3]]: "tur-" },
            [NUMBERS.P]: { [person[1]]: "ry-", [person[2]]: "thár-", [person[3]]: "tur-" }
        },
        [GENDERS.A.NAME]: {
            [NUMBERS.S]: { [person[1]]: "xy-", [person[2]]: "su-", [person[3]]: "to-" },
            [NUMBERS.D]: { [person[1]]: "hy-", [person[2]]: "thá-", [person[3]]: "tu-" },
            [NUMBERS.P]: { [person[1]]: "hy-", [person[2]]: "thá-", [person[3]]: "tu-" }
        }
    },
    [affixState.S]: {
        [GENDERS.E.NAME]: {
            [NUMBERS.S]: { [person[1]]: "-(o)n", [person[2]]: "-(u)n", [person[3]]: "-tón" },
            [NUMBERS.D]: { [person[1]]: "-(')æn", [person[2]]: "-(o)nēn", [person[3]]: "-(q̇)ân" },
            [NUMBERS.P]: { [person[1]]: "-(')æn", [person[2]]: "-ħen", [person[3]]: "-tun" }
        },
        [GENDERS.R.NAME]: {
            [NUMBERS.S]: { [person[1]]: "-(y)f", [person[2]]: "-(u)f", [person[3]]: "-ħyf" },
            [NUMBERS.D]: { [person[1]]: "-(')æf", [person[2]]: "-nef", [person[3]]: "-(y)q̇ħáf" },
            [NUMBERS.P]: { [person[1]]: "-(')æf", [person[2]]: "-ħáf", [person[3]]: "-if" }
        },
        [GENDERS.MON.NAME]: {
            [NUMBERS.S]: { [person[1]]: "-(u)ħó", [person[2]]: "-(u)ħó", [person[3]]: "-(o)ħó" },
            [NUMBERS.D]: { [person[1]]: "-(')ô", [person[2]]: "-(á)ħó", [person[3]]: "-ħó" },
            [NUMBERS.P]: { [person[1]]: "-(')ô", [person[2]]: "-(á)ħó", [person[3]]: "-ħó" }
        },
        [GENDERS.I.NAME]: {
            [NUMBERS.S]: { [person[1]]: "-llul", [person[2]]: "-llul", [person[3]]: "-llul" },
            [NUMBERS.D]: { [person[1]]: "-(')allūl", [person[2]]: "-(á)llul", [person[3]]: "-(ú)cul" },
            [NUMBERS.P]: { [person[1]]: "-(')allūl", [person[2]]: "-(á)llul", [person[3]]: "-(ú)cul" }
        },
        [GENDERS.MAG.NAME]: {
            [NUMBERS.S]: { [person[1]]: "-(u)χ", [person[2]]: "-(u)χ", [person[3]]: "-ħuχ" },
            [NUMBERS.D]: { [person[1]]: "-(')ōχ", [person[2]]: "-(ó)nōχ", [person[3]]: "-ħúχ" },
            [NUMBERS.P]: { [person[1]]: "-(')ōχ", [person[2]]: "-(ó)nōχ", [person[3]]: "-ħúχ" }
        },
        [GENDERS.MUN.NAME]: {
            [NUMBERS.S]: { [person[1]]: "-(u)r", [person[2]]: "-(u)r", [person[3]]: "-(u)r" },
            [NUMBERS.D]: { [person[1]]: "-(')ar", [person[2]]: "-(á)r", [person[3]]: "-(ú)r" },
            [NUMBERS.P]: { [person[1]]: "-(')ar", [person[2]]: "-(á)r", [person[3]]: "-(ú)r" }
        },
        [GENDERS.A.NAME]: {
            [NUMBERS.S]: { [person[1]]: "-(y)q̇", [person[2]]: "-(u)q̇", [person[3]]: "-(ú)q̇" },
            [NUMBERS.D]: { [person[1]]: "-(y)q̇", [person[2]]: "-ħóq̇", [person[3]]: "-(u)q̇" },
            [NUMBERS.P]: { [person[1]]: "-(y)q̇", [person[2]]: "-ħóq̇", [person[3]]: "-(u)q̇" }
        }
    }
}

let dictionaryData = {
    raw: [],
    sorted: {
        adjectives: [],
        adverbs: [],
        auxiliaries: [],
        conjunctions: [],
        determiners: [],
        nouns: [],
        particles: [],
        prepositions: [],
        verbs: [],
    },
};

//isSuffix[GENDERS.E.NAME][NUMBERS.S][person[1]]


// Produces NounWithSuffix array for a single base word
function generateNounWithSuffixes(keyword, options = {}) {
    const moodsToInclude = options.moodsToInclude || Object.keys(CONJUGATIONS);
    const useAttachAsSuffix = options.useAttachAsSuffix !== undefined ? options.useAttachAsSuffix : true;
    const result = [];

    moodsToInclude.forEach(moodKey => {
        const moodTbl = CONJUGATIONS[moodKey];
        if (!moodTbl) return;

        Object.keys(moodTbl).forEach(genderName => {
            const genderTbl = moodTbl[genderName];
            if (!genderTbl) return;

            Object.keys(genderTbl).forEach(numberKey => {
                const numberTbl = genderTbl[numberKey];
                if (!numberTbl) return;

                Object.keys(numberTbl).forEach(personKey => {
                    const rawSuffix = (numberTbl[personKey] || "").toString().trim();
                    if (!rawSuffix) return;

                    const entries = useAttachAsSuffix
                        ? connect_split("", keyword, rawSuffix)
                        : connect_split(rawSuffix, keyword, "");

                    const html = `<strong>${entries_to_text(entries[0])}</strong>${entries_to_text(entries[1])}<strong>${entries_to_text(entries[2])}</strong>`;
                    const fullText = `${entries_to_text(entries[0])}${entries_to_text(entries[1])}${entries_to_text(entries[2])}`;
                    const keywordStem = `${entries_to_text(entries[1])}`;

                    result.push({
                        mood: moodKey,
                        gender: genderName,
                        number: numberKey,
                        person: personKey,
                        rawSuffix,
                        html,
                        fullText,
                        keyword,
                        keywordStem
                    });
                });
            });
        });
    });

    return result;
}
let NounResults;
//NounResults = generateNounWithSuffixes("æklu", { useAttachAsSuffix: true });// find one matching entry and print its html

// Allowed output keys (must match properties pushed into each item)
const ALLOWED_NOUN_FIELDS = new Set(
    [
        'mood',
        'gender',
        'number',
        'person',
        'rawSuffix',
        'html',
        'fullText',
        'all',
        'keywordStem',
        'keyword'
    ]
);

// main function: choose which property to return/log from the matched entry
function getNounResult(genderIn, moodIn, numberIn, personIn, field = 'all', nounArray = window.NounResults) {
    if (!Array.isArray(nounArray)) {
        console.error('NounWithSuffix not found or not an array');
        return null;
    }

    // Normalise inputs (same helper as before)
    function normaliseInputs(genderIn, moodIn, numberIn, personIn) {
        // gender -> short (e, r, mon, ...)
        let genderShort = null;
        if (!genderIn) return null;
        const g = String(genderIn);
        if (Object.keys(GENDERS).includes(g)) genderShort = GENDERS[g].SHORT;
        else {
            const foundG = Object.values(GENDERS).find(v => v.NAME === g || v.SHORT === g || Object.keys(GENDERS).find(k => k === g));
            genderShort = foundG ? foundG.SHORT : g;
        }

        // mood -> key 'D' or 'R'
        let moodKey = null;
        const m = String(moodIn);
        if (MOODS[m]) moodKey = m;
        else {
            const foundMood = Object.entries(MOODS).find(([k, name]) => name === m || k === m);
            moodKey = foundMood ? foundMood[0] : m;
        }

        // number -> key 'S'/'D'/'P'
        let numberKey = null;
        const n = String(numberIn);
        if (NUMBERS[n]) numberKey = n;
        else {
            const foundNum = Object.entries(NUMBERS).find(([k, name]) => name === n || k === n);
            numberKey = foundNum ? foundNum[0] : n;
        }

        const person = Number(personIn);
        if (!Number.isFinite(person) || person < 1 || person > 4) return null;

        return { genderShort, moodKey, numberKey, person };
    }

    const norm = normaliseInputs(genderIn, moodIn, numberIn, personIn);
    if (!norm) {
        console.error('Invalid inputs');
        return null;
    }
    const { genderShort, moodKey, numberKey, person } = norm;

    // Build the map programmatically (keeps sync with GENDERS/NUMBERS/MOODS)
    function buildNounResultMap() {
        const gendersOrder = Object.keys(GENDERS);
        const genderShorts = gendersOrder.map(k => GENDERS[k].SHORT);
        const blockSize = Object.keys(NUMBERS).length * 4; // 12
        const map = {};

        // Directive
        let base = 0;
        genderShorts.forEach(short => {
            map[`${short}_D`] = [base, base + blockSize - 1];
            base += blockSize;
        });

        // Recessive
        base = genderShorts.length * blockSize; // 84
        genderShorts.forEach(short => {
            map[`${short}_R`] = [base, base + blockSize - 1];
            base += blockSize;
        });

        return map;
    }

    const NounResultMap = buildNounResultMap();
    const mapKey = `${genderShort}_${moodKey}`;
    const range = NounResultMap[mapKey];
    if (!range) {
        console.error('No range for', mapKey);
        return null;
    }

    const numbersOrder = Object.keys(NUMBERS); // ['S','D','P']
    const numberIndex = numbersOrder.indexOf(numberKey);
    if (numberIndex === -1) {
        console.error('Invalid number', numberKey);
        return null;
    }

    const perNumberCount = 4;
    const offsetWithinGender = numberIndex * perNumberCount + (person - 1);
    const index = range[0] + offsetWithinGender;
    const item = nounArray[index];

    if (!item) {
        console.error('No noun entry at index', index);
        return null;
    }

    // validate requested field
    const f = String(field || 'html');
    if (!ALLOWED_NOUN_FIELDS.has(f)) {
        console.error('Invalid field requested:', f, 'Allowed:', Array.from(ALLOWED_NOUN_FIELDS).join(','));
        return null;
    }

    const output = (f === 'all') ? item : item[f];
    //console.log(output);
    return output;
}

// example usage
// getNounResult('e','D','S',1,'fullText', NounResults);


/*
<div class="declensiontables">
    <table>
        <tr>
            <th colspan="4" style="font-size: 24px; background-color: rgb(202, 79, 79)">
                <enbolden>Irrational Directive</enbolden>
            </th>
        </tr>
        <tr>
            <th style="width: 10px;">
                <lilbold>Dec.</lilbold>
            </th>
            <th>Singular</th>
            <th>Dual</th>
            <th>Plural</th>
        </tr>
        <th>1.</th>
        <td>llūl</td>
        <td>(æ)llūl</td>
        <td>(æ)llūl</td>
        </tr>
        <th>2.</th>
        <td>cūl</td>
        <td>cūl</td>
        <td>(')illūl</td>
        </tr>
        <th>3.</th>
        <td>cūl</td>
        <td>cūl</td>
        <td>(')illūl</td>
        </tr>
        <th>4.</th> 
        </tr>
    </table>
</div>
*/ // /\(/o.o\)/\ - Spooky the spider
function generateDeclensionTables(mood, gender) {// generateDeclensionTables(MOODS.R, GENDERS.E.NAME)
    const data = CONJUGATIONS[mood][gender];
    const text = `
    <div class="declensiontables">
        <table>
            <thead>
                <tr>
                    <th colspan="4" style="font-size: 24px; background-color: rgb(202, 79, 79)">
                        <enbolden>${gender} ${mood}</enbolden>
                    </th>
                </tr>
                <tr>
                    <th style="width: 10px;">
                        <lilbold>Dec.</lilbold>
                    </th>
                    <th>${NUMBERS.S}</th>
                    <th>${NUMBERS.D}</th>
                    <th>${NUMBERS.P}</th>
                </tr>
            </thead>
            <tbody>
                ${[1, 2, 3, 4].map(i => `
                <tr>
                    <th>${i}</th>
                    <td>${data[NUMBERS.S][i]}</td>
                    <td>${data[NUMBERS.D][i]}</td> 
                    <td>${data[NUMBERS.P][i]}</td>
                </tr>
                `).join('')} 
            </tbody>
        </table>
    </div>
    `// /\(/o.o\)/\ - Spooky the spider
    /*
    const dirTable = document.getElementById("dirSummaryTableDiv");
    dirTable.innerHTML = targetRow;
    */
    // console.log(text);
    return text;
}// setNounArrays(); // /\(/o.o\)/\ - Spooky the spider


//isSuffix[GENDERS.E.NAME][NUMBERS.S][person[1]]


// Produces VerbWithAffix array for a single base word
function generateVerbAffixes(keyword) {
    const result = [];

    const prefixes = [];
    const suffixes = [];

    // Separate prefix and suffix forms
    Object.keys(AFFIXSTATE).forEach(state => {
        const stateTbl = AFFIXSTATE[state];
        if (!stateTbl) return;

        const useAttachAsSuffix = state === "isSuffix";

        Object.keys(stateTbl).forEach(genderName => {
            const genderTbl = stateTbl[genderName];
            if (!genderTbl) return;

            Object.keys(genderTbl).forEach(numberKey => {
                const numberTbl = genderTbl[numberKey];
                if (!numberTbl) return;

                Object.keys(numberTbl).forEach(personKey => {
                    const rawAffix = (numberTbl[personKey] || "").toString().trim();
                    if (!rawAffix) return;

                    const entries = useAttachAsSuffix
                        ? connect_split("", keyword, rawAffix)
                        : connect_split(rawAffix, keyword, "");

                    const html = `<strong>${entries_to_text(entries[0])}</strong>${entries_to_text(entries[1])}<strong>${entries_to_text(entries[2])}</strong>`;
                    const fullText = `${entries_to_text(entries[0])}${entries_to_text(entries[1])}${entries_to_text(entries[2])}`;
                    const keywordStem = `${entries_to_text(entries[1])}`;

                    const affixObj = {
                        state,
                        type: useAttachAsSuffix ? "suffix" : "prefix",
                        gender: genderName,
                        number: numberKey,
                        person: personKey,
                        rawAffix,
                        html,
                        fullText,
                        keywordStem
                    };

                    if (useAttachAsSuffix) suffixes.push(affixObj);
                    else prefixes.push(affixObj);
                });
            });
        });
    });

    // Helper to create entries/fullText/html for a given combination
    function makeEntries(prefixRaw, stem, suffixRaw) {
        const entries = connect_split(prefixRaw || "", stem, suffixRaw || "");
        const html = `<strong>${entries_to_text(entries[0])}</strong>${entries_to_text(entries[1])}<strong>${entries_to_text(entries[2])}</strong>`;
        const fullText = `${entries_to_text(entries[0])}${entries_to_text(entries[1])}${entries_to_text(entries[2])}`;
        const keywordStem = entries_to_text(entries[1]);
        return { entries, html, fullText, keywordStem };
    }

    // Generate all prefix+suffix combinations
    prefixes.forEach(pref => {
        suffixes.forEach(suff => {
            const { entries, html, fullText, keywordStem } = makeEntries(pref.rawAffix, keyword, suff.rawAffix);
            result.push({
                combinationType: "prefix+suffix",
                html,
                fullText,
                keywordStem,
                keyword,
                prefix: pref,
                suffix: suff
            });
        });
    });

    // Single prefix-only forms
    prefixes.forEach(pref => {
        const { entries, html, fullText, keywordStem } = makeEntries(pref.rawAffix, keyword, "");
        result.push({
            combinationType: "prefix-only",
            html,
            fullText,
            keywordStem,
            keyword,
            prefix: pref,
            suffix: null
        });
    });

    // Single suffix-only forms
    suffixes.forEach(suff => {
        const { entries, html, fullText, keywordStem } = makeEntries("", keyword, suff.rawAffix);
        result.push({
            combinationType: "suffix-only",
            html,
            fullText,
            keywordStem,
            keyword,
            prefix: null,
            suffix: suff
        });
    });

    return result;
} let VerbResults;
// Example usage: VerbResults = generateVerbAffixes("æf");// find one matching entry and print its html


// Allowed output keys (must match properties pushed into each item)
const ALLOWED_VERB_FIELDS = new Set(
    [
        'state',
        'gender',
        'number',
        'person',
        'rawAffix',
        'html',
        'fullText',
        'all',
        'keywordStem',
        'keyword',
        'combinationType',
    ]
);

/*
function getVerbResult(prefixSpec, suffixSpec, field = 'all', verbArray = window.VerbResults) {
    if (!Array.isArray(verbArray)) {
        console.error('VerbAffix not found or not an array');
        return null;
    }

    // Helper: normalizes each spec's gender, state, number, person
    function normalizeSpec(spec) {
        if (!spec) return null;
        const { gender, state, number, person } = spec;

        let genderShort = null;
        if (gender) {
            const g = String(gender);
            if (Object.keys(GENDERS).includes(g)) genderShort = GENDERS[g].SHORT;
            else {
                const foundG = Object.values(GENDERS).find(v => v.NAME === g || v.SHORT === g || Object.keys(GENDERS).find(k => k === g));
                genderShort = foundG ? foundG.SHORT : g;
            }
        }

        let stateKey = null;
        if (state) {
            const s = String(state);
            stateKey = affixState[s] ? s : (Object.entries(affixState).find(([k, name]) => name === s || k === s) || [s])[0];
        }

        let numberKey = null;
        if (number) {
            const n = String(number);
            numberKey = NUMBERS[n] ? n : (Object.entries(NUMBERS).find(([k, name]) => name === n || k === n) || [n])[0];
        }

        const personNum = person ? Number(person) : null;

        return { genderShort, state: stateKey, numberKey, person: personNum };
    }

    const prefixNorm = normalizeSpec(prefixSpec);
    const suffixNorm = normalizeSpec(suffixSpec);

    // Search for matching entry
    const entry = verbArray.find(v => {
        let prefixMatch = true;
        let suffixMatch = true;

        if (prefixNorm) {
            prefixMatch = v.prefix &&
                (prefixNorm.genderShort ? v.prefix.gender === prefixNorm.genderShort : true) &&
                (prefixNorm.state ? v.prefix.state === prefixNorm.state : true) &&
                (prefixNorm.numberKey ? v.prefix.number === prefixNorm.numberKey : true) &&
                (prefixNorm.person ? Number(v.prefix.person) === prefixNorm.person : true);
        } else {
            prefixMatch = v.prefix === null;
        }

        if (suffixNorm) {
            suffixMatch = v.suffix &&
                (suffixNorm.genderShort ? v.suffix.gender === suffixNorm.genderShort : true) &&
                (suffixNorm.state ? v.suffix.state === suffixNorm.state : true) &&
                (suffixNorm.numberKey ? v.suffix.number === suffixNorm.numberKey : true) &&
                (suffixNorm.person ? Number(v.suffix.person) === suffixNorm.person : true);
        } else {
            suffixMatch = v.suffix === null;
        }

        return prefixMatch && suffixMatch;
    });

    if (!entry) {
        console.error('No verb entry matches the specified prefix/suffix');
        return null;
    }

    if (!ALLOWED_VERB_FIELDS.has(field)) {
        console.error('Invalid field requested:', field);
        return null;
    }

    const output = (field === 'all') ? entry : entry[field];
    console.log(output);
    return output;
}
*/

// main function: choose which property to return/log from the matched entry
function getVerbResult
    (
        prefixSpec,
        suffixSpec,
        field = 'all',
        verbArray = window.VerbResults
    ) {
    if (!Array.isArray(verbArray)) {
        console.error('VerbAffix not found or not an array'); //"verb with the affix"+affix?
        return null;
    }
    function normalizeSpec(spec, type) { // type = 'prefix' or 'suffix'
        if (!spec) return null;
        const { gender, state, number, person } = spec;

        // Map gender input to the full gender string like in verbArray
        let genderName = null;
        if (gender) {
            const g = String(gender);
            const foundG = Object.values(GENDERS).find(v => v.SHORT === g || v.NAME === g);
            genderName = foundG ? foundG.NAME : g;
        }

        // Map number input to full number string like 'singular', 'plural', etc.
        let numberName = null;
        if (number) {
            const n = String(number);
            const foundNum = Object.entries(NUMBERS).find(([k, name]) => k === n || name === n);
            numberName = foundNum ? foundNum[1] : n;
        }

        // Map person input to full string like '1. Person', '2. Person', etc.
        let personName = null;
        if (person) {
            personName = `${person}. Person`;
        }

        return {
            type: type,
            gender: genderName,
            number: numberName,
            person: personName
        };
    }
    const prefixNorm = normalizeSpec(prefixSpec, 'prefix');
    const suffixNorm = normalizeSpec(suffixSpec, 'suffix');
    console.log(prefixNorm, suffixNorm);
    console.log(prefixNorm.gender, ':', suffixNorm.gender);


    // Search for matching entry
    const entry = verbArray.find(v => {
        let prefixMatch = true;
        let suffixMatch = true;

        if (prefixNorm) {
            prefixMatch = v.prefix &&
                (prefixNorm.gender ? v.prefix.gender === prefixNorm.gender : true) &&
                (prefixNorm.state ? v.prefix.state === prefixNorm.state : true) &&
                (prefixNorm.number ? v.prefix.number === prefixNorm.number : true) &&
                (prefixNorm.person ? v.prefix.person === prefixNorm.person : true);
        } else {
            prefixMatch = v.prefix === null;
        }

        if (suffixNorm) {
            suffixMatch = v.suffix &&
                (suffixNorm.gender ? v.suffix.gender === suffixNorm.gender : true) &&
                (suffixNorm.state ? v.suffix.state === suffixNorm.state : true) &&
                (suffixNorm.number ? v.suffix.number === suffixNorm.number : true) &&
                (suffixNorm.person ? v.suffix.person === suffixNorm.person : true);
        } else {
            suffixMatch = v.suffix === null;
        }

        // Only log if both prefix and suffix match
        if (prefixMatch && suffixMatch) {
            console.log(`MATCH FOUND: ${v.fullText}`);
            if (v.prefix && prefixNorm) console.log('  Prefix expected:', prefixNorm, '| actual:', v.prefix);
            if (v.suffix && suffixNorm) console.log('  Suffix expected:', suffixNorm, '| actual:', v.suffix);
        }

        return prefixMatch && suffixMatch;
    });

    if (!entry) {
        console.error('No verb entry matches the specified affix');
        return null;
    }

    // Extract raw affixes from the matching entry
    const appliedPrefix = entry.prefix ? entry.prefix.rawAffix : '';
    const appliedSuffix = entry.suffix ? entry.suffix.rawAffix : '';

    // Apply to the keyword
    const finalWord = `${appliedPrefix}${entry.keyword}${appliedSuffix}`;

    // Log applied affixes and final word
    console.log('Applied Prefix:', appliedPrefix);
    console.log('Applied Suffix:', appliedSuffix);
    console.log('Keyword:', entry.keyword);
    console.log('Final word:', finalWord);
    console.log('FullText:', entry.fullText);

    // Validate requested field
    const f = String(field || 'all');
    if (!ALLOWED_VERB_FIELDS.has(f) && f !== 'fullWord') {
        console.error('Invalid field requested:', f, 'Allowed:', Array.from(ALLOWED_VERB_FIELDS).join(','));
        return null;
    }

    // Return either the requested field, the full entry with finalWord, or the finalWord itself
    const output = (f === 'all') ? { ...entry, finalWord } :
        (f === 'fullWord') ? finalWord :
            entry[f];

    console.log("parrent array:");
    return output;

}
/* 
    usage: getVerbResult(
    { gender: 'e', number: 'S', person: '1' },
    { gender: 'e', number: 'S', person: '1' },
    'all',
    VerbResults);
*/









// search field dropdown
let examples = [];

// Adjust this to where your file is served in the repository
const EXCEL_URL = '22-09-2025.xlsx';

// Helper to populate a datalist (optional)
function populateDatalist(items) {
    const dl = document.getElementById('examplesList');
    dl.innerHTML = '';
    items.forEach(v => {
        const opt = document.createElement('option');
        opt.value = v;
        dl.appendChild(opt);
    });
}

// Fetch the XLSX, parse and extract column A from row 2 onward
async function loadExamplesFromXlsx(url) { // so this is just for grabbing all the words from first column?
    const res = await fetch(url, { credentials: 'same-origin' });
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
    const arrayBuffer = await res.arrayBuffer(); // not used anywhere else
    const workbook = XLSX.read(arrayBuffer, { type: 'array' }); // move buffer here?

    const sheetName = workbook.SheetNames[0]; // not used anywhere else
    const worksheet = workbook.Sheets[sheetName]; // not used anywhere else

    // Convert to rows (array of arrays)
    const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false });  // move here?

    // rows[0] is header (A1); collect column A starting at rows[1] (A2)
    const values = [];
    for (let r = 1; r < rows.length; r++) {
        const row = rows[r];
        if (!row) continue;
        const val = (row[0] ?? '').toString().trim();
        if (val) values.push(val);
    }

    examples = Array.from(new Set(values))
        .map(w => String(w).replace(/\s*\([1-4]\)\s*$/g, '').trim()) // remove " (n)"
        .filter(Boolean); // drop empty strings if any
    populateDatalist(examples);
    return examples;
}

// Kick off load (call this once on page load)
loadExamplesFromXlsx(EXCEL_URL)
    .then(list => console.log('Loaded examples:', list.length))
    .catch(err => console.error(err));

const input = document.getElementById('search_field');
const suggestions = document.getElementById('suggestions');

let highlighted = -1;

function showSuggestions(items) {
    suggestions.innerHTML = '';
    if (!items.length) {
        suggestions.hidden = true;
        return;
    }
    items.forEach((text, idx) => {
        const li = document.createElement('li');
        li.textContent = text;
        li.tabIndex = -1;
        li.setAttribute('role', 'option');
        li.style.padding = '6px 8px';
        li.style.cursor = 'pointer';
        li.addEventListener('mousedown', e => {
            // use mousedown so input doesn't lose focus before click handling
            e.preventDefault();
            selectSuggestion(text);
        });
        suggestions.appendChild(li);
    });
    highlighted = -1;
    suggestions.hidden = false;
}

function selectSuggestion(text) {
    input.value = text;
    suggestions.hidden = true;
    input.focus();
}

function filterExamples(q) {
    if (!q) return examples.slice(0, 5000); // show some examples when empty
    const low = q.toLowerCase();
    return examples.filter(w => w.toLowerCase().includes(low)).slice(0, 5000); // how many examples are shown? 
}

input.addEventListener('input', () => {
    const list = filterExamples(input.value);
    showSuggestions(list);
});

input.addEventListener('keydown', (e) => {
    const items = suggestions.querySelectorAll('li');
    if (suggestions.hidden) return;
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        highlighted = Math.min(highlighted + 1, items.length - 1);
        updateHighlight(items);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        highlighted = Math.max(highlighted - 1, 0);
        updateHighlight(items);
    } else if (e.key === 'Enter') {
        if (highlighted >= 0 && items[highlighted]) {
            e.preventDefault();
            selectSuggestion(items[highlighted].textContent);
        } // /\(/o.o\)/\ - Spooky the spider
    } else if (e.key === 'Escape') {
        suggestions.hidden = true;
    }
});

function updateHighlight(items) {
    items.forEach((li, i) => {
        if (i === highlighted) {
            li.style.background = '#0366d6';
            li.style.color = '#fff';
            li.scrollIntoView({ block: 'nearest' });
        } else {
            li.style.background = '';
            li.style.color = '';
        }
    });
}

// hide suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!e.composedPath().includes(input) && !e.composedPath().includes(suggestions)) {
        suggestions.hidden = true;
    }
});



// loadDictionaryData

function loadDictionaryData() {
    const APIfield = document.getElementById("api_field");

    if (APIfield && APIfield.value) {
        const userKey = APIfield.value.trim();
        if (userKey) {
            loadFromGoogleSheets(userKey);
            console.log("loaded from official sheet");
        } else {
            loadFromExcelFile("22-09-2025.xlsx");
            console.log("loaded from excel file(may be outdated)");
        }
    } else {
        loadFromExcelFile("22-09-2025.xlsx");
        console.log("loaded from excel file(may be outdated)");
    }
}

// loadFromGoogleSheets
function loadFromGoogleSheets(apiKey) {
    const SHEET_ID = "168-Rzwk2OjxKJfHy-xNYvwPmDTi5Olv9KTgAs4v33HE";
    const RANGE = "Dictionary!A2:E999";
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(RANGE)}?key=${apiKey}`;

    const container = document.getElementById("sheet-data");
    container.textContent = "Loading...";

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            dictionaryData.raw = data.values;
            renderTable(dictionaryData.raw);
        })
        .catch(error => {
            console.error("Failed to load sheet:", error);
            container.textContent = "Error loading sheet.";
        });
}

// loadFromExcelFile
function loadFromExcelFile(filename) {
    const container = document.getElementById("sheet-data");
    container.textContent = "Loading local Excel file…";

    fetch(filename)
        .then(response => response.arrayBuffer())
        .then(data => {
            // Read workbook
            const workbook = XLSX.read(data, { type: "array" });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];

            // Convert to 2D array (rows & columns)
            const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            // Skip header row, store the rest in dictionaryData.raw
            dictionaryData.raw = json.slice(1);

            console.log("Loaded raw data:", dictionaryData.raw.length, "rows");
            renderTable(dictionaryData.raw); // optional — displays the unprocessed version
        })
        .catch(error => {
            console.error("Failed to load Excel file:", error);
            container.textContent = "Error loading local file.";
        });
}

// show dictionary printout
function showDictionaryPrintout() {
    openPageOld('page98');
}
setTimeout(() => {
    console.log("'showDictionaryPrintout();' to go to dictionary print page")
}, 250); // mention the command in the console, so you know how to find the dictionary list. also, on delay, so its at the bottom of the console.

function renderTable(data) {
    const container = document.getElementById("sheet-data");
    const table = document.createElement("table");
    table.id = "sheet-data-table";

    data.forEach(row => {
        const tr = document.createElement("tr");

        const paddedRow = [];
        for (let i = 0; i < 5; i++) {
            paddedRow[i] = row[i] || "";
        }

        let word = paddedRow[0];
        const wordclass = paddedRow[1];
        let extractedNumber = "";

        if ((wordclass === "adj" || wordclass === "n") && /\(\d\)/.test(word)) { // /\(/o.o\)/\ - Spooky the spider
            const match = word.match(/\((\d)\)/);
            if (match) {
                extractedNumber = match[1];
                word = word.replace(/\(\d\)/, "").trim();
            }
        }
        const cells = [
            word,
            extractedNumber,
            paddedRow[2],
            paddedRow[3],
            paddedRow[4],
            wordclass
        ];

        cells.forEach(cell => {
            const td = document.createElement("td");
            td.textContent = cell;
            tr.appendChild(td);
        });

        table.appendChild(tr);
    });

    container.innerHTML = "";
    container.appendChild(table);

    // Build pages1 and dictionaryData from table
    buildFromDictionaryTable();

    // Continue with declension logic
    processDictionaryTable(data);
}

// Helper: make a safe string for IDs/selectors (words containing the ax symbol can now still be converted into ids)
function safeIdPart(str) {
    return str.replace(/[^a-z0-9_-]/gi, '_'); // replace anything not alphanumeric, underscore, or dash '_'
}

function declensionsInDictionary() {
    // give dictionary table cells unique ids. // i need ${word} to be the textcontent of the first cell in the row. this is to make unique ids. // remember that the ax symbol (') isnt allowed as an id, and needs a fix. its somewhere else too.
    function newids() {
        const table = document.getElementById('sheet-data-table');
        if (!table) return;
        table.querySelectorAll('tr').forEach((tr, rowIdx) => {
            const first = tr.querySelector('td');
            const word = first ? entries_to_rom(text_to_entries(first.textContent.trim().replace(/`/g, "_ax_").replace(/'/g, "_ax_"))).replace(/[^\w-]+/g, '-') || 'cell' : 'row' + rowIdx;
            tr.querySelectorAll('td').forEach((td, cellIdx) => {
                td.id = `${rowIdx}-${word}-dicCell-${cellIdx}`;
            });
        });
    } // remember that entries_to_rom is used.
    newids();


    // expanded tables for affix searchability
    const table = document.getElementById('sheet-data-table');
    table.querySelectorAll('tr').forEach((tr, rowIdx) => {
        const first = tr.querySelector('td');
        const word = first ? entries_to_rom(text_to_entries(first.textContent.trim().replace(/`/g, "_ax_").replace(/'/g, "_ax_"))).replace(/[^\w-]+/g, '-') || 'cell' : 'row' + rowIdx;
        tr.querySelectorAll('td').forEach(td => {
            if (td.id === `${rowIdx}-${word}-dicCell-5`) {
                const wordclass = document.getElementById(`${rowIdx}-${word}-dicCell-5`).textContent;
                switch (wordclass) {
                    case 'n':
                        const uniquePrefix = `${rowIdx}-${word}`;
                        createNounSummaryTables("test", uniquePrefix).then(() => { // reused function eg.if you want to make it arrays, then youll need to remake another function for this. etc.

                            // Add classes to the created tables
                            const dirTable = document.getElementById(`${uniquePrefix}-dirSummaryTable`);
                            const recTable = document.getElementById(`${uniquePrefix}-recSummaryTable`);
                            const dirHeader = document.getElementById(`${uniquePrefix}-dirSummaryTable-header`);
                            const recHeader = document.getElementById(`${uniquePrefix}-recSummaryTable-header`);

                            if (dirTable) dirTable.className = "dictionaryDirTables";
                            if (recTable) recTable.className = "dictionaryRecTables";
                            if (dirHeader) dirHeader.className = "dictionaryDirHeaders";
                            if (recHeader) recHeader.className = "dictionaryRecHeaders";

                            // Now load the declension data using existing logic
                            const cell3 = document.getElementById(`${rowIdx}-${word}-dicCell-3`);
                            const cell1 = document.getElementById(`${rowIdx}-${word}-dicCell-1`);

                            if (cell3 && cell1) {
                                const cellText = cell3.textContent.toLowerCase();
                                const Declension = parseInt(cell1.textContent.trim(), 10);

                                if (!isNaN(Declension) && Declension > 0) {
                                    const loadPromises = [];
                                    const loadedStems = new Set(); //tf are stems

                                    // Load from groupMap 
                                    for (const [groupId, stems] of Object.entries(groupMap)) {
                                        const pattern = new RegExp(`\\b${groupId}\\b`, "i");
                                        if (pattern.test(cellText)) {
                                            stems.forEach(stem => {
                                                if (!loadedStems.has(stem)) {                              // vvv\?? where is gender in the function
                                                    loadPromises.push(loadTableFilesForWord(stem, Declension, stem, uniquePrefix)); // the issue is that the fetches break???
                                                    loadedStems.add(stem); // it works perfectly for a while though. it only breaks after like 75% completion.
                                                    console.log(stem, Declension, stem, uniquePrefix); //the function is broken, so i cant even check with console.log... and i havent commited enough earlier xd.

                                                }
                                            });
                                        }
                                    }

                                    // Load from tableMap 
                                    for (const [id, stem] of Object.entries(tableMap)) {
                                        if (cellText.includes(id.toLowerCase()) && !loadedStems.has(stem)) {
                                            loadPromises.push(loadTableFilesForWord(stem, Declension, stem, uniquePrefix));
                                            loadedStems.add(stem);
                                            console.log(stem, Declension, stem, uniquePrefix);

                                        }

                                    }

                                    Promise.all(loadPromises).then(() => { // what line // Load from groupMap && // Load from tableMap its loadTableFilesForWord(); sure thingthey are the issues i mean. the entire case is making tables though, if you want to remake it to arrys, then youll have to redo alot xd.
                                        const actualWord = first.textContent.trim().replace(/\(\d\)/, "").trim();
                                        populateSummaryTables(actualWord, {
                                            [`${uniquePrefix}-dirSummaryTable`]: false,
                                            [`${uniquePrefix}-recSummaryTable`]: false
                                        });
                                    });

                                    // hide
                                    function hideEmptySummaryRowsDic(summaryTableId) {
                                        const table = document.getElementById(summaryTableId);
                                        if (!table) return;

                                        const rows = table.querySelectorAll("tbody tr");
                                        rows.forEach(row => {
                                            const cells = Array.from(row.querySelectorAll("td"));
                                            const hasData = cells.some(td => {
                                                const text = td.textContent.replace(/\u00a0/g, " ").trim().replace();
                                                return text !== "";
                                            });

                                            // Force visibility for filled rows, hide empty ones
                                            row.style.display = hasData ? "table-row" : "none";
                                        });
                                    }

                                    hideEmptySummaryRowsDic(`${uniquePrefix}-dirSummaryTable`);
                                    hideEmptySummaryRowsDic(`${uniquePrefix}-recSummaryTable`);
                                }
                            }
                        }).catch(error => {
                            console.error(`Error creating noun tables for ${word}:`, error);
                        });

                        break;
                    case 'v':
                        console.log("verb");
                        break;
                    case 'adj':
                        console.log("adjective");
                        break;
                    case 'adv':
                        console.log("adverb");
                        break;
                    case 'aux':
                        console.log("auxiliary");
                        break;
                    case 'pp':
                        console.log("preposition");
                        break;
                    case 'part':
                        console.log("particle");
                        break;
                }
            }
        });
    })
}

// dictionary tables
// === Create the summary tables ===
let CurrentWordClassAsText = "";
let dictionaryPageReference = "";

// if page with number between 10000 and 12000 exists, then delete it.
function removePageDivsExceptKeyword(keyword, start, end) {
    const keepId = `page${keyword}`;
    let removed = 0;

    // normalize numeric bounds and cap to reasonable limits
    start = Math.max(0, Number(start) || 0);
    end = Math.min(10000000, Number(end) || 0);
    if (end < start) return 0;

    for (let i = start; i <= end; i++) {
        const id = `page${i}`;
        if (id === keepId) continue;
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.tagName && el.tagName.toUpperCase() !== 'DIV') continue;
        el.remove();
        removed++;
    }

    return removed;
}

function createSummaryTables() {

    switch (getCurrentWordClass()) {
        case 'n':
            createNounSummaryTables("leftleftdivdictionary");
            setTimeout(() => {
                populateSummaryTables(keyword, { dirSummaryTable: false, recSummaryTable: false });
            }, 100);
            CurrentWordClassAsText = "noun";
            dictionaryPageReference = () => openPageOld('page3', document.querySelector('.tab-bar .tab:nth-child(5)'));
            break;

        case 'v':
            createVerbSummaryTables();
            setTimeout(() => {
                populateSummaryTables(keyword, { dictionaryVerbPrefixTable: true, dictionaryVerbSuffixTable: false });
            }, 100);
            CurrentWordClassAsText = "verb";
            dictionaryPageReference = () => openPageOld('page4', document.querySelector('.tab-bar .tab:nth-child(6)'));
            break;

        case 'adv':
            createAdverbSummaryTables();
            CurrentWordClassAsText = "adverb";
            dictionaryPageReference = () => openPageOld('page5', document.querySelector('.tab-bar .tab:nth-child(7)'));
            break;

        case 'aux':
            createAuxiliarySummaryTables();
            CurrentWordClassAsText = "auxiliary";
            dictionaryPageReference = () => openPageOld('page6', document.querySelector('.tab-bar .tab:nth-child(8)'));
            break;

        case 'pp':
            createPrepositionSummaryTables();
            CurrentWordClassAsText = "preposition";
            dictionaryPageReference = () => openPageOld('page0', document.querySelector('.tab-bar .tab:nth-child(0)'));
            break;

        case 'part':
            createParticleSummaryTables();
            CurrentWordClassAsText = "particle";
            dictionaryPageReference = () => openPageOld('page0', document.querySelector('.tab-bar .tab:nth-child(0)'));
            break;

        case 'adj':
            createAdjectiveSummaryTables();
            CurrentWordClassAsText = "adjective";
            dictionaryPageReference = () => openPageOld('page7', document.querySelector('.tab-bar .tab:nth-child(9)'));
            break;
    }
} // /\(/o.o\)/\ - Spooky the spider

// Helper function to get current word class from the displayed table
function getCurrentWordClass() {
    const cell5 = document.getElementById('cell5'); // wordclass is in cell5 (6th column)
    if (!cell5) return null;
    return cell5.textContent.trim();
}

// populateSummaryTables
function populateSummaryTables(keyword, tables) {
    Object.keys(tables).forEach(tableId => {
        const table = document.getElementById(tableId);
        if (!table) return;
        const tds = table.querySelectorAll("tbody td");
        tds.forEach(td => {
            // prefer original stored raw suffix (data-raw) if present 
            const textInCell = (td.dataset.raw && td.dataset.raw.trim()) ? td.dataset.raw : td.textContent.trim();
            // console.log(td.innerHTML);

            // process raw
            let entries;
            if (tables[tableId]) entries = connect_split(textInCell, keyword, "");
            else entries = connect_split("", keyword, textInCell);
            td.innerHTML = `<strong>${entries_to_text(entries[0])}</strong>${entries_to_text(entries[1])}<strong>${entries_to_text(entries[2])}</strong>`;
            // place keyword as prefix or suffix (you can change behavior per table)
        });
    });
}

// === Create noun summary tables (existing functionality) ===
function createNounSummaryTables(inDivById, uniquePrefix = "") {
    return new Promise((resolve, reject) => {
        const DivId = document.getElementById(`${inDivById}`);
        if (!DivId) {
            return reject(new Error(`div by id ${DivId} not found`));
        }

        const genders = ["Exhalted", "Rational", "Monstrous", "Irrational", "Magical", "Mundane", "Abstract"];
        const numbers = ["Singular", "Dual", "Plural"];

        // internal builder that sets data-raw on each TD
        function buildTable(id, label, containerId) {
            const wrapper = document.createElement("div");
            const table = document.createElement("table");
            table.id = id;

            const thead = document.createElement("thead");

            // Merged header row
            const mergedRow = document.createElement("tr");
            const mergedCell = document.createElement("th");
            mergedCell.id = id + "-header";
            mergedCell.colSpan = 4;
            mergedCell.textContent = label;
            mergedRow.appendChild(mergedCell);
            thead.appendChild(mergedRow);

            // Column header row
            const headerRow = document.createElement("tr");
            headerRow.innerHTML = `<th class="GenderTh";>Gender</th>` + numbers.map(n => `<th>${n}</th>`).join("");
            thead.appendChild(headerRow);

            table.appendChild(thead);

            const tbody = document.createElement("tbody");
            Object.values(GENDERS).forEach(gender => {
                const row = document.createElement("tr");
                const cellsHtml = numbers.map(() => `<td data-raw=""></td>`).join("");
                row.innerHTML = `<th>${gender.NAME}</th>` + cellsHtml;
                tbody.appendChild(row);
            });
            table.appendChild(tbody);

            wrapper.appendChild(table);

            const container = document.getElementById(containerId);
            if (!container) return;
            container.appendChild(wrapper);
        }

        // create wrapper divs with unique IDs if prefix provided
        const dirsummarytablefinalwrapper = document.createElement("div");
        const recsummarytablefinalwrapper = document.createElement("div");

        if (uniquePrefix) {
            dirsummarytablefinalwrapper.id = `${uniquePrefix}-dirTableDiv`;
            recsummarytablefinalwrapper.id = `${uniquePrefix}-recTableDiv`;
            dirsummarytablefinalwrapper.className = "dirTableDivs";
            recsummarytablefinalwrapper.className = "recTableDivs";
        } else {
            dirsummarytablefinalwrapper.id = "dirSummaryTablediv";
            recsummarytablefinalwrapper.id = "recSummaryTablediv";
        }

        DivId.appendChild(dirsummarytablefinalwrapper);
        DivId.appendChild(recsummarytablefinalwrapper);

        const dirTableId = uniquePrefix ? `${uniquePrefix}-dirSummaryTable` : "dirSummaryTable";
        const recTableId = uniquePrefix ? `${uniquePrefix}-recSummaryTable` : "recSummaryTable";

        buildTable(dirTableId, "Directive", dirsummarytablefinalwrapper.id);
        buildTable(recTableId, "Recessive", recsummarytablefinalwrapper.id);

        // Allow a paint cycle so the DOM is actually available to queries/measurements
        requestAnimationFrame(() => resolve());
    });
}

// === Create verb summary tables ===
function createVerbSummaryTables() {
    const leftleftdivdictionary = document.getElementById("leftleftdivdictionary");
    if (!leftleftdivdictionary) {
        console.error("leftleftdivdictionary element not found");
        return;
    }

    // Create verb conjugation table
    const verbConjWrapper = document.createElement("div");
    verbConjWrapper.id = "verbPrefixTablediv";
    leftleftdivdictionary.appendChild(verbConjWrapper);

    const verbFormsWrapper = document.createElement("div");
    verbFormsWrapper.id = "verbSuffixTablediv";
    leftleftdivdictionary.appendChild(verbFormsWrapper);

    buildVerbTable("pages/dictionarypage/tables/subjectprefix.html", "verbPrefixTablediv");
    buildVerbTable("pages/dictionarypage/tables/objectsuffix.html", "verbSuffixTablediv");
}

// === Create adverb summary tables ===
function createAdverbSummaryTables() {
    const leftleftdivdictionary = document.getElementById("leftleftdivdictionary");
    if (!leftleftdivdictionary) {
        console.error("leftleftdivdictionary element not found");
        return;
    }

    const adverbWrapper = document.createElement("div");
    adverbWrapper.id = "adverbFormsTablediv";
    leftleftdivdictionary.appendChild(adverbWrapper);

    buildAdverbTable("adverbFormsTable", "Adverb Forms", "adverbFormsTablediv");
    // populate the created td
    const baseSource = document.getElementById("cell0");
    const elativeSource = document.getElementById("cell3");

    const baseTd = document.getElementById(`adverbFormsTable-base-form`);
    const elativeTd = document.getElementById(`adverbFormsTable-elative-form`);

    if (baseTd && baseSource) baseTd.textContent = baseSource.textContent;
    if (elativeTd && elativeSource) elativeTd.textContent = elativeSource.textContent;
}

// === Create auxiliary summary tables ===
function createAuxiliarySummaryTables() {
    const leftleftdivdictionary = document.getElementById("leftleftdivdictionary");
    if (!leftleftdivdictionary) {
        console.error("leftleftdivdictionary element not found");
        return;
    } // /\(/o.o\)/\ - Spooky the spider

    const auxWrapper = document.createElement("div");
    auxWrapper.id = "auxiliaryFormsTablediv";
    leftleftdivdictionary.appendChild(auxWrapper);

    buildAuxiliaryTable("auxiliaryFormsTable", "Auxiliary Forms", "auxiliaryFormsTablediv");
    // populate the created td
    const EpiNonSource = document.getElementById("cell0");
    const tripleSource = document.getElementById("cell3");

    const EpiNonTd = document.getElementById(`auxiliaryFormsTable-episodic-non-past`);
    const EpiPastTd = document.getElementById(`auxiliaryFormsTable-episodic-past`);
    const GnoNonTd = document.getElementById(`auxiliaryFormsTable-gnomic-non-past`);
    const GnoPastTd = document.getElementById(`auxiliaryFormsTable-gnomic-past`);

    // copy single-value sources
    if (EpiNonTd && EpiNonSource) EpiNonTd.textContent = EpiNonSource.textContent;
    if (EpiPastTd && tripleSource) {
        EpiPastTd.textContent = tripleSource.textContent;
    }
    // split cell3 into three parts and populate the three target TDs
    if (tripleSource) {
        const parts = tripleSource.textContent.split(",").map(s => s.trim());
        if (GnoNonTd) GnoNonTd.textContent = parts[1] ?? "";
        if (GnoPastTd) GnoPastTd.textContent = parts[2] ?? "";
        if (EpiPastTd && parts[0] != null) EpiPastTd.textContent = parts[0];
    }
    const isDefective = EpiPastTd.textContent.trim();
    if (isDefective === "defective") {
        const EpiNonText = EpiNonTd.textContent.trim();
        console.log(`${EpiNonText} is defective`);
        EpiPastTd.textContent = `${EpiNonText}`;
        GnoNonTd.textContent = `${EpiNonText}`;
        GnoPastTd.textContent = `${EpiNonText}`;
    }
}

// === Create preposition summary tables ===
function createPrepositionSummaryTables() {
    const leftleftdivdictionary = document.getElementById("leftleftdivdictionary");
    if (!leftleftdivdictionary) {
        console.error("leftleftdivdictionary element not found");
        return;
    }

    const ppWrapper = document.createElement("div");
    ppWrapper.id = "prepositionFormsTablediv";
    leftleftdivdictionary.appendChild(ppWrapper);

    buildPrepositionTable("prepositionFormsTable", "Preposition Forms", "prepositionFormsTablediv");
    // populate the created td
    const EpiNonSource = document.getElementById("cell0");
    const tripleSource = document.getElementById("cell3");

    const EpiNonTd = document.getElementById(`auxiliaryFormsTable-episodic-non-past`);
    const EpiPastTd = document.getElementById(`auxiliaryFormsTable-episodic-past`);
    const GnoNonTd = document.getElementById(`auxiliaryFormsTable-gnomic-non-past`);
    const GnoPastTd = document.getElementById(`auxiliaryFormsTable-gnomic-past`);

    // copy single-value sources
    if (EpiNonTd && EpiNonSource) EpiNonTd.textContent = EpiNonSource.textContent;
    if (EpiPastTd && tripleSource) {
        EpiPastTd.textContent = tripleSource.textContent;
    }
    // split cell3 into three parts and populate the three target TDs
    if (tripleSource) {
        const parts = tripleSource.textContent.split(",").map(s => s.trim());
        if (GnoNonTd) GnoNonTd.textContent = parts[1] ?? "";
        if (GnoPastTd) GnoPastTd.textContent = parts[2] ?? "";
        if (EpiPastTd && parts[0] != null) EpiPastTd.textContent = parts[0];
    }
}

// === Create particle summary tables ===
function createParticleSummaryTables() {
    const leftleftdivdictionary = document.getElementById("leftleftdivdictionary");
    if (!leftleftdivdictionary) {
        console.error("leftleftdivdictionary element not found");
        return;
    }

    const ppWrapper = document.createElement("div");
    ppWrapper.id = "particleFormsTablediv";
    leftleftdivdictionary.appendChild(ppWrapper);

    buildParticleTable("particleFormsTable", "Particle Forms", "particleFormsTablediv");
    // populate the created td
    const EpiNonSource = document.getElementById("cell0");
    const tripleSource = document.getElementById("cell3");

    const EpiNonTd = document.getElementById(`auxiliaryFormsTable-episodic-non-past`);
    const EpiPastTd = document.getElementById(`auxiliaryFormsTable-episodic-past`);
    const GnoNonTd = document.getElementById(`auxiliaryFormsTable-gnomic-non-past`);
    const GnoPastTd = document.getElementById(`auxiliaryFormsTable-gnomic-past`);

    // copy single-value sources
    if (EpiNonTd && EpiNonSource) EpiNonTd.textContent = EpiNonSource.textContent;
    if (EpiPastTd && tripleSource) {
        EpiPastTd.textContent = tripleSource.textContent;
    }
    // split cell3 into three parts and populate the three target TDs
    if (tripleSource) {
        const parts = tripleSource.textContent.split(",").map(s => s.trim());
        if (GnoNonTd) GnoNonTd.textContent = parts[1] ?? "";
        if (GnoPastTd) GnoPastTd.textContent = parts[2] ?? "";
        if (EpiPastTd && parts[0] != null) EpiPastTd.textContent = parts[0];
    }
}

// === Create adjective summary tables ===
function createAdjectiveSummaryTables() {
    const leftleftdivdictionary = document.getElementById("leftleftdivdictionary");
    if (!leftleftdivdictionary) {
        console.error("leftleftdivdictionary element not found");
        return;
    }

    const ppWrapper = document.createElement("div");
    ppWrapper.id = "adjectiveFormsTablediv";
    leftleftdivdictionary.appendChild(ppWrapper);

    buildAdjectiveTable("adjectiveFormsTable", "Adjective Forms", "adjectiveFormsTablediv");
    // populate the created td
    const EpiNonSource = document.getElementById("cell0");
    const tripleSource = document.getElementById("cell3");

    const EpiNonTd = document.getElementById(`auxiliaryFormsTable-episodic-non-past`);
    const EpiPastTd = document.getElementById(`auxiliaryFormsTable-episodic-past`);
    const GnoNonTd = document.getElementById(`auxiliaryFormsTable-gnomic-non-past`);
    const GnoPastTd = document.getElementById(`auxiliaryFormsTable-gnomic-past`);

    // copy single-value sources
    if (EpiNonTd && EpiNonSource) EpiNonTd.textContent = EpiNonSource.textContent;
    if (EpiPastTd && tripleSource) {
        EpiPastTd.textContent = tripleSource.textContent;
    }
    // split cell3 into three parts and populate the three target TDs
    if (tripleSource) {
        const parts = tripleSource.textContent.split(",").map(s => s.trim());
        if (GnoNonTd) GnoNonTd.textContent = parts[1] ?? "";
        if (GnoPastTd) GnoPastTd.textContent = parts[2] ?? "";
        if (EpiPastTd && parts[0] != null) EpiPastTd.textContent = parts[0];
    } // /\(/o.o\)/\ - Spooky the spider
}

// Define your  glyph classes
const conlangVowels = ["i", "ī", "e", "ē", "æ", "y", "u", "ū", "o", "ō", "a", "ā", "ú", "û", "ó", "ô", "á", "â"];
const conlangConsonants = ["t", "k", "q", "q̇", "'", "c", "f", "d", "s", "z", "g", "χ", "h", "l", "r", "ɾ", "m", "n", "ŋ"];
console.log(`Vowels = ${conlangVowels}`);
console.log(`Consonants = ${conlangConsonants}`);

// will redo -lirox
// function isConlangVowel(char) {
//     return text_to_entries(char)[0].properties.includes(window.REG.VOWEL);
// }

// function isConlangConsonant(char) {
//     return text_to_entries(char)[0].properties.includes(window.REG.CONSONANT);
// } // unused

function buildVerbTable(sourcePath, containerId) {
    fetch(sourcePath)
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load ${sourcePath}: ${response.status}`);
            return response.text();
        })
        .then(html => {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = html;
            }
        })
        .catch(error => {
            console.error("Error loading table:", error);
        });
}// this is really just a fetch and paste. should it be kept, just for consistency with the other builders, or directly implemented in createVerbSummaryTables?

// Helper function to build adverb tables
function buildAdverbTable(id, label, containerId) {
    const wrapper = document.createElement("div");
    const table = document.createElement("table");
    table.id = id;

    // fixed column width via colgroup
    const colgroup = document.createElement("colgroup");
    const col1 = document.createElement("col");
    col1.style.width = "120px";
    const col2 = document.createElement("col");
    colgroup.append(col1, col2);
    table.appendChild(colgroup);

    const thead = document.createElement("thead");
    const mergedRow = document.createElement("tr");
    const mergedCell = document.createElement("th");
    mergedCell.id = id + "-header";
    mergedCell.colSpan = 2;
    mergedCell.textContent = label;
    mergedRow.appendChild(mergedCell);
    thead.appendChild(mergedRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    const forms = ["Base Form", "Elative Form"];
    forms.forEach((form) => {
        const formz = form;
        // create a safe id fragment from the form text
        const safe = formz.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-_]/g, '').toLowerCase();
        const rowIdBase = `${id}-${safe}`;

        const row = document.createElement("tr");

        const th = document.createElement("th");
        th.textContent = form;

        const td = document.createElement("td");
        td.id = `${rowIdBase}`; // e.g. "myTable-base-form-0-value"

        row.appendChild(th);
        row.appendChild(td);
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    wrapper.appendChild(table);
    const container = document.getElementById(containerId);
    if (container) container.appendChild(wrapper);
}

// Helper function to build auxiliary tables
function buildAuxiliaryTable(id, label, containerId) {
    const wrapper = document.createElement("div");
    const table = document.createElement("table");
    table.id = id;

    const thead = document.createElement("thead");
    const mergedRow = document.createElement("tr");
    const mergedCell = document.createElement("th");
    mergedCell.id = id + "-header";
    mergedCell.colSpan = 5;
    mergedCell.textContent = label;
    mergedRow.appendChild(mergedCell);
    thead.appendChild(mergedRow);


    const headerRow = document.createElement("tr");
    // keep the visible header texts
    const headers = ["Form", "Episodic Non-Past", "Episodic Past", "Gnomic Non-Past", "Gnomic Past"];
    headers.forEach(h => {
        const th = document.createElement("th");
        th.textContent = h;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    const row = document.createElement("tr");

    // first cell is the row label
    const thLabel = document.createElement("th");
    thLabel.textContent = "Forms";
    row.appendChild(thLabel);

    // create a TD for each remaining header and assign an id derived from the header text
    headers.slice(1).forEach(hdr => {
        const td = document.createElement("td");
        // sanitize header text to form a valid id fragment
        const safe = hdr.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-_]/g, '').toLowerCase();
        td.id = `${id}-${safe}`;
        row.appendChild(td);
    });

    tbody.appendChild(row);
    table.appendChild(tbody);

    wrapper.appendChild(table);
    const container = document.getElementById(containerId);
    if (container) container.appendChild(wrapper);
}

// Helper function to build auxiliary tables
function buildPrepositionTable(id, label, containerId) {
    const wrapper = document.createElement("div");
    const table = document.createElement("table");
    table.id = id;

    const thead = document.createElement("thead");
    const mergedRow = document.createElement("tr");
    const mergedCell = document.createElement("th");
    mergedCell.id = id + "-header";
    mergedCell.colSpan = 5;
    mergedCell.textContent = label;
    mergedRow.appendChild(mergedCell);
    thead.appendChild(mergedRow);


    const headerRow = document.createElement("tr");
    // keep the visible header texts
    const headers = ["Form", "Episodic Non-Past", "Episodic Past", "Gnomic Non-Past", "Gnomic Past"];
    headers.forEach(h => {
        const th = document.createElement("th");
        th.textContent = h;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    const row = document.createElement("tr");

    // first cell is the row label
    const thLabel = document.createElement("th");
    thLabel.textContent = "Forms";
    row.appendChild(thLabel);

    // create a TD for each remaining header and assign an id derived from the header text
    headers.slice(1).forEach(hdr => {
        const td = document.createElement("td");
        // sanitize header text to form a valid id fragment
        const safe = hdr.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-_]/g, '').toLowerCase();
        td.id = `${id}-${safe}`;
        row.appendChild(td);
    });

    tbody.appendChild(row);
    table.appendChild(tbody);

    wrapper.appendChild(table);
    const container = document.getElementById(containerId);
    if (container) container.appendChild(wrapper);
}

// Helper function to build auxiliary tables
function buildParticleTable(id, label, containerId) {
    const wrapper = document.createElement("div");
    const table = document.createElement("table");
    table.id = id;

    const thead = document.createElement("thead");
    const mergedRow = document.createElement("tr");
    const mergedCell = document.createElement("th");
    mergedCell.id = id + "-header";
    mergedCell.colSpan = 5;
    mergedCell.textContent = label;
    mergedRow.appendChild(mergedCell);
    thead.appendChild(mergedRow);


    const headerRow = document.createElement("tr");
    // keep the visible header texts
    const headers = ["Form", "Episodic Non-Past", "Episodic Past", "Gnomic Non-Past", "Gnomic Past"];
    headers.forEach(h => {
        const th = document.createElement("th");
        th.textContent = h;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    const row = document.createElement("tr");

    // first cell is the row label
    const thLabel = document.createElement("th");
    thLabel.textContent = "Forms";
    row.appendChild(thLabel);

    // create a TD for each remaining header and assign an id derived from the header text
    headers.slice(1).forEach(hdr => {
        const td = document.createElement("td");
        // sanitize header text to form a valid id fragment
        const safe = hdr.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-_]/g, '').toLowerCase();
        td.id = `${id}-${safe}`;
        row.appendChild(td);
    });

    tbody.appendChild(row);
    table.appendChild(tbody);

    wrapper.appendChild(table);
    const container = document.getElementById(containerId);
    if (container) container.appendChild(wrapper);
} // /\(/o.o\)/\ - Spooky the spider

// Helper function to build adjective tables
function buildAdjectiveTable(id, label, containerId) {
    const wrapper = document.createElement("div");
    const table = document.createElement("table");
    table.id = id;

    const thead = document.createElement("thead");
    const mergedRow = document.createElement("tr");
    const mergedCell = document.createElement("th");
    mergedCell.id = id + "-header";
    mergedCell.colSpan = 5;
    mergedCell.textContent = label;
    mergedRow.appendChild(mergedCell);
    thead.appendChild(mergedRow);


    const headerRow = document.createElement("tr");
    // keep the visible header texts
    const headers = ["Form", "Episodic Non-Past", "Episodic Past", "Gnomic Non-Past", "Gnomic Past"];
    headers.forEach(h => {
        const th = document.createElement("th");
        th.textContent = h;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    const row = document.createElement("tr");

    // first cell is the row label
    const thLabel = document.createElement("th");
    thLabel.textContent = "Forms";
    row.appendChild(thLabel); // /\(/o.o\)/\ - Spooky the spider

    // create a TD for each remaining header and assign an id derived from the header text
    headers.slice(1).forEach(hdr => {
        const td = document.createElement("td");
        // sanitize header text to form a valid id fragment
        const safe = hdr.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-_]/g, '').toLowerCase();
        td.id = `${id}-${safe}`;
        row.appendChild(td);
    });

    tbody.appendChild(row);
    table.appendChild(tbody);

    wrapper.appendChild(table);
    const container = document.getElementById(containerId);
    if (container) container.appendChild(wrapper);
}

// === Map of identifiers to stems ===
const tableMap = {
    "e.": GENDERS.E.NAME,
    "r.": GENDERS.R.NAME,
    "mon.": GENDERS.MON.NAME,
    "i.": GENDERS.I.NAME,
    "mag.": GENDERS.MAG.NAME,
    "mun.": GENDERS.MUN.NAME,
    "a.": GENDERS.A.NAME,
}; // TODO: uhhhh remove cause we got GENDERS at home. xd
// need to implement it where its called though. eh. whatever, try it

const groupMap = { // ah
    all: [GENDERS.MAG.NAME, GENDERS.MUN.NAME, GENDERS.A.NAME, GENDERS.E.NAME, GENDERS.MON.NAME, GENDERS.I.NAME, GENDERS.R.NAME],
    animates: [GENDERS.E.NAME, GENDERS.MON.NAME, GENDERS.I.NAME, GENDERS.R.NAME],
    inanimates: [GENDERS.MAG.NAME, GENDERS.MUN.NAME, GENDERS.A.NAME]
};

const loaded = new Set();

// === Fetch a stem's dir/rec tables and paste into summary ===
function loadTableFiles(rowNumber, gender) {
    const dirPromise = pasteFromHTML(generateDeclensionTables(MOODS.D, gender), rowNumber, gender, "dir");
    const recPromise = pasteFromHTML(generateDeclensionTables(MOODS.R, gender), rowNumber, gender, "rec");
    return Promise.all([dirPromise, recPromise]);//how does it know where to paste it? well, its returning the thing, so another function place it
}

// === Fetch a stem's dir/rec tables for a specific word and paste into word-specific summary tables ===
// function loadTableFilesForWord(stem, rowNumber, gender, wordId) {
//     const dirPromise = fetch(`pages/dictionarypage/tables/declensiontables/${stem}dir.html`)
//         .then(res => res.text())
//         .then(html => pasteFromHTMLForWord(html, rowNumber, gender, "dir", wordId));

//     const recPromise = fetch(`pages/dictionarypage/tables/declensiontables/${stem}rec.html`)
//         .then(res => res.text())
//         .then(html => pasteFromHTMLForWord(html, rowNumber, gender, "rec", wordId));

//     return Promise.all([dirPromise, recPromise]);
// } // old

function loadTableFilesForWord(stem, rowNumber, gender, wordId) {  // nope
    const dirPromise = pasteFromHTMLForWord(generateDeclensionTables(MOODS.D, gender), rowNumber, gender, "dir", wordId);

    const recPromise = pasteFromHTMLForWord(generateDeclensionTables(MOODS.R, gender), rowNumber, gender, "rec", wordId);

    return Promise.all([dirPromise, recPromise]);
}


// === Normalize text and hide empty rows ===
function normalizeText(s) {
    return (s || "").replace(/\u00a0/g, " ").trim();

}

function hideEmptySummaryRowsIn(summaryTableId) {
    const table = document.getElementById(summaryTableId);
    if (!table) return;

    const rows = table.querySelectorAll("tbody tr");
    rows.forEach(row => {
        const cells = Array.from(row.querySelectorAll("td"));
        const hasData = cells.some(td => {
            const text = td.textContent.replace(/\u00a0/g, " ").trim();
            return text !== "";
        });

        // Force visibility for filled rows, hide empty ones
        row.style.display = hasData ? "table-row" : "none";
    });
}

// === Extract the correct row from fetched HTML and paste into summary table ===
function pasteFromHTML(html, rowNumber, gender, type) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const table = doc.querySelector("table");
    if (!table) return;

    const allRows = Array.from((table.querySelector("tbody") || table).querySelectorAll("tr"));
    const dataRows = allRows.slice(2); // skip first two header rows
    const targetRow = dataRows[rowNumber - 1];
    if (!targetRow) return;

    // Expand colspans so we always get 3 values
    let cells = [];
    Array.from(targetRow.cells)
        .slice(1) // skip label
        .forEach(cell => {
            const span = parseInt(cell.getAttribute("colspan") || "1", 10);
            const text = normalizeText(cell.textContent);
            for (let i = 0; i < span; i++) {
                cells.push(text);
            }
        });

    const summaryTableId = type === "dir" ? "dirSummaryTable" : "recSummaryTable";
    const summaryTable = document.getElementById(summaryTableId);

    //console.log(summaryTable); // does not find any - null / underfined

    // how do you do populate the thing? //initially using the fetched data. for setting the initial data, ie the declension. then using the keyword is inserted - using the logic we developped together the first time.

    if (!summaryTable) return; // so it return // it did before though?

    const summaryRows = Array.from(summaryTable.querySelectorAll("tbody tr"));
    const summaryRow = summaryRows.find(r =>
        normalizeText(r.querySelector("th").textContent).toLowerCase() === gender.toLowerCase()
    );
    /*
    console.log(summaryRows);
    console.log(summaryRow);
    */
    if (!summaryRow) return;

    const summaryCells = summaryRow.querySelectorAll("td");
    //console.log(summaryCells);
    cells.forEach((val, idx) => {
        if (summaryCells[idx]) {
            summaryCells[idx].textContent = val;
        }
    });
    //console.log(summaryCells);

    // Hide all empty rows in this summary table
    hideEmptySummaryRowsIn(summaryTableId);
}

// === Extract row from fetched HTML and paste into word-specific summary table ===
function pasteFromHTMLForWord(html, rowNumber, gender, type, wordId) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const table = doc.querySelector("table");
    if (!table) return;

    const allRows = Array.from((table.querySelector("tbody") || table).querySelectorAll("tr"));
    const dataRows = allRows.slice(2); // skip first two header rows
    const targetRow = dataRows[rowNumber - 1];
    if (!targetRow) return;

    // Expand colspans so we always get 3 values
    let cells = [];
    Array.from(targetRow.cells)
        .slice(1) // skip label
        .forEach(cell => {
            const span = parseInt(cell.getAttribute("colspan") || "1", 10);
            const text = normalizeText(cell.textContent);
            for (let i = 0; i < span; i++) {
                cells.push(text);
            }
        });

    const summaryTableId = type === "dir" ? `${wordId}-dirSummaryTable` : `${wordId}-recSummaryTable`;
    const summaryTable = document.getElementById(summaryTableId);
    if (!summaryTable) return;

    const summaryRows = Array.from(summaryTable.querySelectorAll("tbody tr"));
    const summaryRow = summaryRows.find(r =>
        normalizeText(r.querySelector("th").textContent).toLowerCase() === gender.toLowerCase()
    );
    if (!summaryRow) return;

    const summaryCells = summaryRow.querySelectorAll("td");
    cells.forEach((val, idx) => {
        if (summaryCells[idx]) {
            summaryCells[idx].textContent = val;
            summaryCells[idx].dataset.raw = val; // Store raw value for later population
        }
    });



    // Hide all empty rows in this summary table
    hideEmptySummaryRowsIn(summaryTableId);
}

// processDictionaryTable
function processDictionaryTable(data) {
    const rows = data || dictionaryData?.raw;
    if (!rows || rows.length === 0) {
        console.warn("No dictionary data available.");
        return;
    }

    rows.forEach((row, index) => {
        const paddedRow = [];
        for (let i = 0; i < 5; i++) {
            paddedRow[i] = row[i] || "";
        }

        let word = paddedRow[0];
        const wordclass = paddedRow[1];
        let extractedNumber = "";

        if ((wordclass === "n") && /\(\d\)/.test(word)) {
            const match = word.match(/\((\d)\)/);
            if (match) {
                extractedNumber = match[1];
                word = word.replace(/\(\d\)/, "").trim();
            }
        }

        const stemPrefix = paddedRow[4]; // assuming column 5 holds the identifier like "mag.", "r.", etc.
        const stem = tableMap[stemPrefix];
        const gender = paddedRow[3]; // assuming column 4 holds gender
        const rowNumber = parseInt(extractedNumber, 10);

        if (stem && gender && rowNumber) {
            loadTableFiles(rowNumber, gender); // there be stem, in fucntion there aint
        }// ???
    });
}

// === runTableLoader ===
function runTableLoader() {
    const currentWordClass = getCurrentWordClass(); // /\(/o.o\)/\ - Spooky the spider

    // Only run the existing noun declension logic for nouns
    if (currentWordClass !== 'n') {
        gender
        return;
    }

    loaded.clear();

    const cell3 = document.getElementById('cell3');
    const cell1 = document.getElementById('cell1');
    if (!cell3 || !cell1) return;

    const cellText = cell3.textContent.toLowerCase();
    const rowNumber = parseInt(cell1.textContent.trim(), 10);
    if (isNaN(rowNumber) || rowNumber <= 0) return;

    const loadPromises = [];

    for (const [groupId, stems] of Object.entries(groupMap)) {
        const pattern = new RegExp(`\\b${groupId}\\b`, "i");
        if (pattern.test(cellText)) {
            stems.forEach(stem => {
                if (!loaded.has(stem)) {
                    loadPromises.push(loadTableFiles(rowNumber, stem));
                    loaded.add(stem);
                    setTimeout(() => {
                        console.log(stem, rowNumber, stem);
                    }, 1200);
                }
            });
        }
    }

    for (const [id, stem] of Object.entries(tableMap)) {
        if (cellText.includes(id.toLowerCase()) && !loaded.has(stem)) {
            loadPromises.push(loadTableFiles(rowNumber, stem));
            loaded.add(stem);
        }
    }

    Promise.all(loadPromises).then(() => {
        console.log("Summary tables updated.");
        hideEmptySummaryRowsIn("dirSummaryTable");
        hideEmptySummaryRowsIn("recSummaryTable");
    });
}

// === Build pages1 and update dictionaryData ===
function buildFromDictionaryTable() {
    if (!dictionaryData.raw || dictionaryData.raw.length === 0) {
        console.warn("No dictionary data available.");
        return;
    }

    pages1 = {};

    let pageNumber = 10000; // Start counting up from 10000

    dictionaryData.raw.forEach((row, index) => {
        const paddedRow = [];
        for (let i = 0; i < 5; i++) {
            paddedRow[i] = row[i] || "";
        }

        const wordRaw = paddedRow[0];
        const word = wordRaw.replace(/\(\d\)/, "").trim().toLowerCase();
        const wordClass = paddedRow[1];
        let declensionsArray = [];

        if (word) {
            pages1[word] = `page${pageNumber}`;
            pageNumber++; // Count upward
        }
        // Determine declensions array based on wordclass
        switch (wordClass) {
            case 'n':
                declensionsArray = generateNounWithSuffixes(word, { useAttachAsSuffix: true });
                break;
            case 'v':
                declensionsArray = generateVerbAffixes(word);
                break;
        }
        // Convert array row into an object with labels
        const rowObject = {
            word: paddedRow[0],
            wordclass: wordClass,
            definition: paddedRow[2],
            forms: paddedRow[3],
            notes: paddedRow[4],
            "pageId(for html)": pages1[word],
            "all declensions": declensionsArray
        };
        switch (wordClass) {
            case "n":
                dictionaryData.sorted.nouns.push(rowObject);
                //declensionsArray = generateNounWithSuffixes(word, { useAttachAsSuffix: true });
                break;
            case "v":
                dictionaryData.sorted.verbs.push(rowObject);
                //declensionsArray = generateVerbAffixes(word);
                break;
            case "adj":
                dictionaryData.sorted.adjectives.push(rowObject);
                break;
            case "adv":
                dictionaryData.sorted.adverbs.push(rowObject);
                break;
            case "aux":
                dictionaryData.sorted.auxiliaries.push(rowObject);
                break;
            case "pp":
                dictionaryData.sorted.prepositions.push(rowObject);
                break;
            case "part":
                dictionaryData.sorted.particles.push(rowObject);
                break;
            case "con":
                dictionaryData.sorted.conjunctions.push(rowObject);
                break;
            case "det":
                dictionaryData.sorted.determiners.push(rowObject);
                break;


            default:
                console.warn(`Unknown word class: '${wordClass}' for word '${word}'`);
                break;
        }
    });

    finalizeDictionaryData();
    //console.log("pages1 mapping:", pages1);
    //console.log("dictionaryData:", dictionaryData);
}

function finalizeDictionaryData() {
    if (!dictionaryData) return;

    // First, remove raw[]
    delete dictionaryData.raw;

    // Bring all word class arrays from sorted{} to top-level
    if (dictionaryData.sorted) {
        for (const key in dictionaryData.sorted) {
            if (dictionaryData.sorted.hasOwnProperty(key)) {
                dictionaryData[key] = dictionaryData.sorted[key];
            }
        }
    }

    // Remove the sorted{} object
    delete dictionaryData.sorted;

    // get keyword data

    let field1 = document.getElementById('search_field');
    keyword = field1?.value.trim().toLowerCase();
    const keywordData =
    {
        keyword,
    };
    dictionaryData.keyword = keywordData;

    console.log("Final dictionaryData structure:", dictionaryData);
}


// === Create table inside a given container ===
function createTable(keyword, container) {
    // Remove any existing table in this container
    const existing = container.querySelector('table');
    if (existing) existing.remove();

    const table = document.createElement('table');
    table.id = 'resultTable'; // no keyword in ID

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ["Word", "Declension", "Definition", "Forms", "Usage Notes", "Word Class"];
    headers.forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    const row = document.createElement('tr');

    // Create 6 cells with stable IDs (no keyword) - added one for word class
    for (let i = 0; i < 6; i++) {
        const td = document.createElement('td');
        td.id = `cell${i}`;
        row.appendChild(td);
    }

    tbody.appendChild(row);
    table.appendChild(tbody);

    container.appendChild(table);
    return table;
}

// === Fill table from Excel data ===
function fillTable(keyword, table) {
    const kw = String(keyword).toLowerCase();
    const sourceTable = document.querySelector("#sheet-data table");
    if (!sourceTable) {
        alert("Source table not found.");
        return;
    }

    const rows = Array.from(sourceTable.querySelectorAll("tbody tr, tr")); // support both tbody and flat tables
    let foundRow = null;

    for (const row of rows) {
        const cells = Array.from(row.querySelectorAll("td"));
        if (cells.length < 6) continue; // Now expecting 6 cells including word class

        const word = cells[0].textContent.trim().toLowerCase();
        if (word === kw) {
            foundRow = cells;
            break;
        }
    }

    if (!foundRow) {
        alert("No matching row found.");
        return;
    }

    for (let i = 0; i < 6; i++) { // Now filling 6 cells including word class
        const td = table.querySelector(`#cell${i}`);
        if (td) {
            const raw = foundRow[i].textContent;

            let count = 0;
            const html = raw.replace(/-/g, () => {
                count += 1;
                return count === 1 ? "- " : "<br>- ";
            });

            td.innerHTML = html;
        }
    }
}

// Helper function to wait for element to exist
function waitForElement(selector, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();

        function check() {
            const element = document.querySelector(selector);
            if (element) {
                resolve(element);
            } else if (Date.now() - startTime > timeout) {
                reject(new Error(`Element ${selector} not found within ${timeout}ms`));
            } else {
                setTimeout(check, 50);
            }
        }

        check();
    });
}

// Helper function to setup search functionality for a page
function setupPageSearchHandlers(pageId) {
    const searchFieldSelector = `#${pageId} #search_field1`; // those are not used anywhere else
    const searchButtonSelector = `#${pageId} #search_button1`;

    Promise.all([
        waitForElement(searchFieldSelector), // move them here?
        waitForElement(searchButtonSelector)
    ]).then(([searchField, searchButton]) => {
        // Remove any existing listeners to prevent duplicates
        const newSearchButton = searchButton.cloneNode(true);
        searchButton.parentNode.replaceChild(newSearchButton, searchButton);

        const newSearchField = searchField.cloneNode(true);
        searchField.parentNode.replaceChild(newSearchField, searchField);

        // Add click listener to button
        newSearchButton.addEventListener('click', (e) => {
            e.preventDefault();
            doSearchFromPage(pageId);
        });

        // Add enter key listener to field
        newSearchField.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                doSearchFromPage(pageId);
            }
        });

        console.log(`Search handlers setup for ${pageId}`);
    }).catch(error => {
        console.error(`Failed to setup search handlers for ${pageId}:`, error);
    });
}

// Function to handle search from a specific page
function doSearchFromPage(pageId) {
    const searchField = document.querySelector(`#${pageId} #search_field1`);
    if (!searchField) return;
    // /\(/o.o\)/\ - Spooky the spider
    const searchTerm = searchField.value.trim();
    if (!searchTerm) return;

    // Update the global search field and trigger search
    const mainSearchField = document.getElementById('search_field');
    if (mainSearchField) {
        mainSearchField.value = searchTerm;
    }

    doSearch();
}
function appendAndOpenPage(pageId, container, htmlContent) {
    return new Promise((resolve, reject) => {
        if (!container) return reject("No container to append the page to");

        // Check if the page already exists
        let pageEl = document.getElementById(pageId);
        if (!pageEl) {
            pageEl = document.createElement('div');
            pageEl.id = pageId;
            pageEl.className = 'page';
            pageEl.innerHTML = htmlContent;

            container.appendChild(pageEl);

            // Wait for the next animation frame to ensure it's in the DOM
            requestAnimationFrame(() => {
                if (document.getElementById(pageId)) {
                    resolve(pageEl); // exists, resolve promise
                } else {
                    reject(`Page ${pageId} did not append correctly`);
                }
            });
        } else {
            resolve(pageEl); // already exists
        }
    });
}

// === dosearch function ===
function doSearch() {
    // Auto-load dictionary data if not already loaded
    if (!dictionaryData.raw || dictionaryData.raw.length === 0) {
        loadDictionaryData();
        // Wait for data to load before continuing
        const checkDataLoaded = setInterval(() => {
            if (dictionaryData.raw && dictionaryData.raw.length > 0) {
                clearInterval(checkDataLoaded);
                performSearch();
            }
        }, 100);
        return;
    }

    performSearch(); // why am i doing this twice? line 958
}

let innerHTML = '';
function performSearch() {
    // Prefer value from #search_field if not empty, else #search_field1
    //let field1 = document.getElementById('search_field');
    //let field2 = document.getElementById('search_field1');
    //keywordDisplay = (field1?.value.trim() || field2?.value.trim());
    keyword = dictionaryData.keyword.keyword;


    // remove page10000..page12000 except page matching current keyword variable
    const removedCount = removePageDivsExceptKeyword(keyword, 10000, 12000);
    console.log('removed', removedCount, 'dictionary pages');

    if (keyword) {
        const result = WordDictionary.get();
        const occurrences = WordDictionary.findOccurrences(keyword);


        if (occurrences.length > 0) {
            // verb innerHTML
            if (occurrences[0].type === "verb") {
                const parentArray = generateVerbAffixes(occurrences[0].baseWord);

                // Only keep items where fullText === keyword
                const matchingItems = parentArray.filter(item => item.fullText === keyword);

                if (matchingItems.length > 0) {
                    innerHTML = matchingItems[0].html;
                    console.log(innerHTML);
                }

                console.log("parentArray of keyword:", parentArray);
            }
            // noun innerHTML
            if (occurrences[0].type === "noun") {
                const parentArray = generateNounWithSuffixes(occurrences[0].baseWord, { useAttachAsSuffix: true });

                // Only keep items where fullText === keyword
                const matchingItems = parentArray.filter(item => item.fullText === keyword);

                if (matchingItems.length > 0) {
                    innerHTML = matchingItems[0].html;
                    console.log(innerHTML);
                }

                console.log("parentArray of keyword:", parentArray);
            }
            console.log("All occurrences of keyword:", occurrences);
        }

        if (occurrences.length > 0) {
            // create the page for keyword
            const page = document.createElement('div');
            page.id = 'page11998';
            page.className = 'page';

            //inner htmlget NounResult('e', 'D', 'S', 1, 'html', NounResults);

            const container = document.getElementsByClassName('pages')[0];
            appendAndOpenPage('page11998', container, innerHTML)
                .then(() => openPageOld('page11998'))
                .catch(err => console.error(err));
        } else {
            console.warn(`Keyword "${keyword}" not found in any forms.`);
        }

    }

    if (!keyword || dictionaryData.raw.length === 0) {
        alert('Please enter a search term and ensure the file is loaded.');
        console.error('No keyword for generateNounWithSuffixes()');
        return;
    }

    const targetPageId = pages1[keyword];
    if (!targetPageId) {
        if (document.getElementById("page11998")) return; // dont show if page11998 exists
        alert('No page found for that word.');
        return;
    }

    // Find or create the .pages wrapper
    let pagesWrap = document.querySelector('.pages');
    if (!pagesWrap) {
        pagesWrap = document.createElement('div');
        pagesWrap.className = 'pages';
        document.body.appendChild(pagesWrap);
    }

    // Create the page if it doesn't exist
    const existingPage = document.getElementById(targetPageId);
    if (!existingPage) {
        // create pageDiv
        const pageDiv = document.createElement('div');
        pageDiv.id = targetPageId;
        pageDiv.className = 'page';
        pageDiv.innerHTML = `<include-html src="pages/dictionarypage/dictionary.html"></include-html>`;

        pagesWrap.appendChild(pageDiv); // append pageDiv in pagesWrap

        // Setup search handlers for the new page after a short delay
        setTimeout(() => {
            setupPageSearchHandlers(targetPageId);
        }, 100);
    }

    // Go to the correct page
    openPageOld(targetPageId);

    // Wait for the page content to load, then setup the table
    waitForElement(`#${targetPageId} .tablesContainer`).then(pageContainer => {
        // Create and fill the table
        const table = createTable(keyword, pageContainer);
        fillTable(keyword, table);

        // Update keyword <p>s
        const keywordp = document.getElementById("keywordp");
        if (keywordp) {
            keywordp.innerHTML = keywordDisplay;
        }
        cloneKeywordText();

        // Update wordclass <p>s
        setTimeout(() => {
            const wordclassp = document.getElementById("wordclassp");
            if (wordclassp) {
                wordclassp.innerHTML = CurrentWordClassAsText;
            }
            cloneWordclassText();
        }, 0);

        // Load appropriate content based on word class
        const currentWordClass = getCurrentWordClass();
        loadWordClassContent(currentWordClass, targetPageId);

        // Clear and refocus whichever field was used
        if (field1 && field1.value.trim() !== '') {
            field1.value = '';
            field1.focus();
        } else if (field2) {
            field2.value = '';
            field2.focus();
        }

        createSummaryTables(); // declensiontable
        runTableLoader(); // call your declension table logic here

    }).catch(error => {
        console.error(`Error creating summary tables`, error);

        // Clear and refocus even if there's an error
        if (field1 && field1.value.trim() !== '') {
            field1.value = '';
            field1.focus();
        } else if (field2) {
            field2.value = '';
            field2.focus();
        }

    }).catch(error => {
        console.error(`Failed to find page container for ${targetPageId}:`, error);
    });
}


// check if noun matches ANY other possible noun




// Global cached dictionary
const WordDictionary = (() => {
    let cached = null;

    //const allNounArrays = [];
    //const allVerbArrays = [];

    function buildDictionary() {
        if (cached) return cached;
        const dictionaryMap = {};
        const table = document.getElementById('sheet-data-table');
        if (!table) return { dictionaryMap };

        table.querySelectorAll("tr").forEach(row => {
            const cells = row.querySelectorAll("td");
            if (cells.length < 6) return;

            const keyword = cells[0].textContent.trim();
            const type = cells[5].textContent.trim(); // "n" or "v"

            if (type === "n") {
                dictionaryMap[keyword] = { type: "noun", forms: [] };
                const NounResults = generateNounWithSuffixes(keyword, { useAttachAsSuffix: true });
                //allNounArrays.push({ word: keyword, entries: NounResults });
                //console.log("Added noun array:", { word: keyword, entries: NounResults });

                Object.keys(MOODS).forEach(mood => {
                    Object.keys(GENDERS).forEach(genderKey => {
                        const gender = GENDERS[genderKey].SHORT;
                        Object.keys(NUMBERS).forEach(numberKey => {
                            for (let decl = 1; decl <= 4; decl++) {
                                const affixedWord = getNounResult(gender, mood, numberKey, decl, "fullText", NounResults);
                                const innerHTML = getNounResult(gender, mood, numberKey, decl, "html", NounResults);
                                dictionaryMap[keyword].forms.push({ word: affixedWord, mood, gender, number: numberKey, declension: decl });
                            }
                        });
                    });
                });

            } else if (type === "v") {
                dictionaryMap[keyword] = { type: "verb", forms: [] };
                const VerbResults = generateVerbAffixes(keyword);
                //allVerbArrays.push({ word: keyword, entries: VerbResults });
                //console.log("Added verb array:", { word: keyword, entries: VerbResults });

                VerbResults.forEach(entry => {
                    const prefixKey = entry.prefix ? `${entry.prefix.gender}_${entry.prefix.number}_${entry.prefix.person}` : "none";
                    const suffixKey = entry.suffix ? `${entry.suffix.gender}_${entry.suffix.number}_${entry.suffix.person}` : "none";

                    dictionaryMap[keyword].forms.push({ word: entry.fullText, prefixKey, suffixKey });
                });


            }
        });

        cached = { dictionaryMap };
        return cached;
    }
    /*
        return {
        get: function () {
            if (!cached) cached = buildDictionary();
            return {
                ...cached,
                allNounArrays,
                allVerbArrays
            }; // <- expose them here
        },
    */
    return {
        get: function () {
            if (!cached) cached = buildDictionary();
            return cached;
        },
        findOccurrences: function (keyword) {
            if (!cached) cached = buildDictionary();
            const { dictionaryMap } = cached;
            const occurrences = [];
            for (const baseWord in dictionaryMap) {
                const entry = dictionaryMap[baseWord];
                entry.forms.forEach(form => {
                    if (form.word === keyword) {
                        occurrences.push({ baseWord, type: entry.type, ...form });
                    }
                });
            }
            return occurrences;
        }
    };
})();

// usage
// const { dictionaryMap } = NounAffixChecker();

// numberMap[0];                   // → "æklū"
// dictionaryMap["æklū"]          // → { type: "n", word: "æklū", number: 0 }

// dictionaryMap.æklū.D.a.P[0]; // → 'æklāq̇' // diretictive, abstract, plural, declension 0

function attachOriginalArraysToWorkbook() {
    const { allNounArrays, allVerbArrays } = WordDictionary.get();

    dictionaryData.forEach(entry => {
        // Match nouns
        const nounMatch = allNounArrays.find(n => n.word === entry.word);
        // Match verbs
        const verbMatch = allVerbArrays.find(v => v.word === entry.word);

        // Only attach if either exists
        if (nounMatch || verbMatch) {
            entry.originalData = {};
            if (nounMatch) entry.originalData.nouns = nounMatch.entries;
            if (verbMatch) entry.originalData.verbs = verbMatch.entries;

            console.log(`Attached original arrays to dictionaryData for word: ${entry.word}`, entry.originalData);
        }
    });
}



// Load appropriate HTML content based on word class
function loadWordClassContent(wordClass, pageId) {
    const rightDiv = document.querySelector(`#${pageId} #textBoxContainer`);
    if (!rightDiv) return;

    let contentFile = '';
    switch (wordClass) {
        case 'n':
            contentFile = 'pages/dictionarypage/text/nountextbox.html'; // nouns text
            break;
        case 'v':
            contentFile = 'pages/dictionarypage/text/verbtextbox.html'; // verbs text
            break;
        case 'adv':
            contentFile = 'pages/dictionarypage/text/adverbtextbox.html'; // adverbs text
            break;
        case 'aux':
            contentFile = 'pages/dictionarypage/text/auxiliarytextbox.html'; // auxiliaries text
            break;
        default:
            contentFile = 'pages/dictionarypage/text/nountextbox.html'; // Default fallback text
    }

    // Load the appropriate content
    rightDiv.innerHTML = `<include-html src="${contentFile}"></include-html>`;

    // Trigger the include-html custom element to load the content
    const includeElement = rightDiv.querySelector('include-html');
    if (includeElement && includeElement.connectedCallback) {
        includeElement.connectedCallback();
    }
}

// clone <p> element with keyword data
function cloneKeywordText() {
    const source = document.getElementById('keywordp');
    if (!source) return;

    const sourceText = source.textContent;

    for (let i = 1; i <= 100; i++) { // Adjust 100 to your max expected number
        const target = document.getElementById('keywordp' + i);
        if (target) {
            target.textContent = sourceText;
        }
    }
}

// clone <p> element with wordclass data
function cloneWordclassText() {
    const source = document.getElementById('wordclassp');
    if (!source) return;

    const sourceText = source.textContent;

    for (let i = 1; i <= 100; i++) { // Adjust 100 to your max expected number
        const target = document.getElementById('wordclassp' + i);
        if (target) {
            target.textContent = sourceText;
        }
    }
}

// put buttons on index.js?
// === Search button click ===
document.getElementById('search_button').addEventListener('click', () => {
    doSearch(); // /\(/o.o\)/\ - Spooky the spider
});

document.addEventListener('click', (e) => {
    if (e.target.id === 'search_button1') {
        doSearch();
    }
});

// === Trigger search on Enter key ===
document.getElementById('search_field').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // prevent form submission
        doSearch();
    }
});