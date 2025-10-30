// Affixes and conjugation
window.modules = window.modules || []

if (!window.modules.includes("MainMap")) {
    throw new Error("AffixesMap requires MainMap to be loaded first.")
}

if (!window.modules.includes("CharacterMap")) {
    throw new Error("AffixesMap requires CharacterMap to be loaded first.")
}

const NOUN_SUFFIXES = {
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

const VERB_SUBJECT_PREFIXES = {
    1: {
        [NUMBERS.S]: { [GENDERS.E.NAME]: "xen", [GENDERS.R.NAME]: "xef", [GENDERS.MON.NAME]: "χħô", [GENDERS.I.NAME]: "xellu", [GENDERS.MAG.NAME]: "xo", [GENDERS.MUN.NAME]: "xyr", [GENDERS.A.NAME]: "xy" },
        [NUMBERS.D]: { [GENDERS.E.NAME]: "xyn", [GENDERS.R.NAME]: "xyf", [GENDERS.MON.NAME]: "xóħ", [GENDERS.I.NAME]: "llu", [GENDERS.MAG.NAME]: "ho", [GENDERS.MUN.NAME]: "ry", [GENDERS.A.NAME]: "hy" },
        [NUMBERS.P]: { [GENDERS.E.NAME]: "hen", [GENDERS.R.NAME]: "hef", [GENDERS.MON.NAME]: "hô", [GENDERS.I.NAME]: "llu", [GENDERS.MAG.NAME]: "ho", [GENDERS.MUN.NAME]: "ry", [GENDERS.A.NAME]: "hy" }
    },
    2: {
        [NUMBERS.S]: { [GENDERS.E.NAME]: "syn", [GENDERS.R.NAME]: "sy", [GENDERS.MON.NAME]: "sô", [GENDERS.I.NAME]: "sucu", [GENDERS.MAG.NAME]: "su", [GENDERS.MUN.NAME]: "syr", [GENDERS.A.NAME]: "su" },
        [NUMBERS.D]: { [GENDERS.E.NAME]: "són", [GENDERS.R.NAME]: "sónlli", [GENDERS.MON.NAME]: "sónq̇ħó", [GENDERS.I.NAME]: "sóncu", [GENDERS.MAG.NAME]: "thâ", [GENDERS.MUN.NAME]: "thár", [GENDERS.A.NAME]: "thá" },
        [NUMBERS.P]: { [GENDERS.E.NAME]: "tháħ", [GENDERS.R.NAME]: "tháll", [GENDERS.MON.NAME]: "tháq̇ħó", [GENDERS.I.NAME]: "thácu", [GENDERS.MAG.NAME]: "thâ", [GENDERS.MUN.NAME]: "thár", [GENDERS.A.NAME]: "thá" }
    },
    3: {
        [NUMBERS.S]: { [GENDERS.E.NAME]: "ten", [GENDERS.R.NAME]: "tolli", [GENDERS.MON.NAME]: "tô", [GENDERS.I.NAME]: "tócu", [GENDERS.MAG.NAME]: "toħ", [GENDERS.MUN.NAME]: "try", [GENDERS.A.NAME]: "to" },
        [NUMBERS.D]: { [GENDERS.E.NAME]: "q̇yn", [GENDERS.R.NAME]: "q̇yll", [GENDERS.MON.NAME]: "q̇ħó", [GENDERS.I.NAME]: "q̇ácu", [GENDERS.MAG.NAME]: "tū", [GENDERS.MUN.NAME]: "tur", [GENDERS.A.NAME]: "tu" },
        [NUMBERS.P]: { [GENDERS.E.NAME]: "tyn", [GENDERS.R.NAME]: "tyf", [GENDERS.MON.NAME]: "tuħ", [GENDERS.I.NAME]: "tīll", [GENDERS.MAG.NAME]: "tū", [GENDERS.MUN.NAME]: "tur", [GENDERS.A.NAME]: "tu" }
    }
}

const VERB_OBJECT_SUFFIXES = {
    1: {
        [NUMBERS.S]: { [GENDERS.E.NAME]: "(o)n", [GENDERS.R.NAME]: "(y)f", [GENDERS.MON.NAME]: "(u)ħó", [GENDERS.I.NAME]: "llul", [GENDERS.MAG.NAME]: "(u)χ", [GENDERS.MUN.NAME]: "(u)r", [GENDERS.A.NAME]: "(y)q̇" },
        [NUMBERS.D]: { [GENDERS.E.NAME]: "(')æ­n", [GENDERS.R.NAME]: "(')æf", [GENDERS.MON.NAME]: "(')ô", [GENDERS.I.NAME]: "(')allūl", [GENDERS.MAG.NAME]: "(')ōχ", [GENDERS.MUN.NAME]: "(')ar", [GENDERS.A.NAME]: "(y)q̇" },
        [NUMBERS.P]: { [GENDERS.E.NAME]: "(')æ­n", [GENDERS.R.NAME]: "(')æf", [GENDERS.MON.NAME]: "(')ô", [GENDERS.I.NAME]: "(')allūl", [GENDERS.MAG.NAME]: "(')ōχ", [GENDERS.MUN.NAME]: "(')ar", [GENDERS.A.NAME]: "(y)q̇" }
    },
    2: {
        [NUMBERS.S]: { [GENDERS.E.NAME]: "(u)n", [GENDERS.R.NAME]: "(u)f", [GENDERS.MON.NAME]: "(u)ħó", [GENDERS.I.NAME]: "llul", [GENDERS.MAG.NAME]: "(u)χ", [GENDERS.MUN.NAME]: "(u)r", [GENDERS.A.NAME]: "(u)q̇" },
        [NUMBERS.D]: { [GENDERS.E.NAME]: "(o)nēn", [GENDERS.R.NAME]: "nef", [GENDERS.MON.NAME]: "(á)ħó", [GENDERS.I.NAME]: "(á)llul", [GENDERS.MAG.NAME]: "(ó)nōχ", [GENDERS.MUN.NAME]: "(á)r", [GENDERS.A.NAME]: "ħóq̇" },
        [NUMBERS.P]: { [GENDERS.E.NAME]: "ħen", [GENDERS.R.NAME]: "ħáf", [GENDERS.MON.NAME]: "(á)ħó", [GENDERS.I.NAME]: "(á)llul", [GENDERS.MAG.NAME]: "(ó)nōχ", [GENDERS.MUN.NAME]: "(á)r", [GENDERS.A.NAME]: "ħóq̇" }
    },
    3: {
        [NUMBERS.S]: { [GENDERS.E.NAME]: "tón", [GENDERS.R.NAME]: "ħyf", [GENDERS.MON.NAME]: "(o)ħó", [GENDERS.I.NAME]: "llul", [GENDERS.MAG.NAME]: "ħuχ", [GENDERS.MUN.NAME]: "(u)r", [GENDERS.A.NAME]: "(ú)q̇" },
        [NUMBERS.D]: { [GENDERS.E.NAME]: "(q̇)ân", [GENDERS.R.NAME]: "(y)q̇ħáf", [GENDERS.MON.NAME]: "ħó", [GENDERS.I.NAME]: "(ú)cul", [GENDERS.MAG.NAME]: "ħúχ", [GENDERS.MUN.NAME]: "(ú)r", [GENDERS.A.NAME]: "(u)q̇" },
        [NUMBERS.P]: { [GENDERS.E.NAME]: "tun", [GENDERS.R.NAME]: "if", [GENDERS.MON.NAME]: "ħó", [GENDERS.I.NAME]: "(ú)cul", [GENDERS.MAG.NAME]: "ħúχ", [GENDERS.MUN.NAME]: "(ú)r", [GENDERS.A.NAME]: "(u)q̇" }
    }
}

const PRONOUNS = {
    // what the fuck
}

function flattenSuffixes(suffixes, type) {
    const result = {};

    function processForms(forms, moodOrPerson, genderKey, numberKey) {
        for (const formKey in forms) {
            const suf = forms[formKey];
            if (!suf) continue;

            let variants = [];
            const entries = entries_from_field(suf, ["letter"], true);
            if (entries.length && entries[0].prop) {
                if (entries[0].prop.includes(REG.OPTIONAL)) {
                    variants.push(entries_to_text(entries));
                    variants.push(entries_to_text(entries), true);
                } else if (entries[0].prop.includes(REG.VOWEL)) {
                    variants.push(suf);
                    const pyric = get_pyric_equivalent(entries[0]);
                    if (pyric != null) variants.push(entries_to_text([pyric, ...entries.slice(1)]));
                }
            } else console.log(`huh? ${suf} ${forms[formKey]} ${entries}`)

            const declensions = type === "n"
                ? Object.entries(forms).filter(([_, val]) => val === suf).map(([key]) => Number(key))
                : [Number(moodOrPerson)];

            const highestNumber = forms[NUMBERS.P] === suf ? NUMBERS.P : numberKey;

            result[suf] = [variants, declensions, type, moodOrPerson, genderKey, highestNumber];
        }
    }

    if (type === "n") {
        for (const moodKey in suffixes) {
            const genders = suffixes[moodKey];
            for (const genderKey in genders) {
                const numbers = genders[genderKey];
                for (const numberKey in numbers) {
                    processForms(numbers[numberKey], moodKey, genderKey, numberKey);
                }
            }
        }
    } else if (type === "v") {
        for (const personKey in suffixes) {
            const numbers = suffixes[personKey];
            for (const numberKey in numbers) {
                const genders = numbers[numberKey];
                for (const genderKey in genders) {
                    processForms(genders[genderKey], personKey, genderKey, numberKey);
                }
            }
        }
    }

    return result;
}


const NOUNS_SUFFIXES_MAP = flattenSuffixes(NOUN_SUFFIXES, "n");
const VERBS_SUFFIXES_MAP = flattenSuffixes(VERB_OBJECT_SUFFIXES, "v");

function matchSuffix(input, suffixMap) {
    for (const suf in suffixMap) {
        const [variants] = suffixMap[suf];
        for (const variant of variants) {
            if (typeof variant === "string" && input.endsWith(variant)) {
                return suffixMap[suf];
            }
        }
    }
    return null;
}

function connect_split(prefix = "", text = "", suffix = "") {
    let text_entries = text_to_entries(text);
    let prefix_entries = text_to_entries(prefix);
    let suffix_entries = text_to_entries(suffix);
    if (!text_entries) return [];
    const last_text = text_entries[text_entries.length - 1];
    // const first_text = text_entries[0];

    if (prefix_entries) {
        // No rules?
    }

    if (suffix_entries) {
        let first_suffix = suffix_entries[0];

        if (first_suffix) {
            if (first_suffix.prop.includes(window.REG.VOWEL)) {
                if (first_suffix.prop.includes(window.REG.OPTIONAL)) {
                    if (last_text && last_text.prop.includes(window.REG.VOWEL)) {
                        suffix_entries.shift();
                    }
                } else if (last_text && last_text.prop.includes(window.REG.VOWEL)) {
                    if (last_text.prop.includes(window.REG.PYRIC)) {
                        const pyric = get_pyric_equivalent(first_suffix);
                        if (pyric) first_suffix = pyric;
                        suffix_entries[0] = first_suffix;
                    }
                    text_entries.pop();
                }
            } else if (first_suffix.prop.includes(window.REG.CONSONANT) && first_suffix.prop.includes(window.REG.OPTIONAL)) {
                if (!last_text || !last_text.prop.includes(window.REG.VOWEL)) {
                    suffix_entries.shift();
                }
            }
        }
    }

    return [prefix_entries, text_entries, suffix_entries];
}

function connect(prefix = "", text = "", suffix = "") {
    const entries = connect_split(prefix, text, suffix);
    return entries.flat();
}

function connect_suffix(text, suffix) { return connect("", text, suffix) }
function connect_prefix(text, prefix) { return connect(prefix, text, "") }


function getAllValues(obj) {
    return Object.values(obj).flatMap(val =>
        typeof val === 'object' && val !== null ? getAllValues(val) : val
    );
}

const FLAT_NOUN_SUFFIXES = [...new Set(getAllValues(NOUN_SUFFIXES))];
const FLAT_VERB_SUBJECT_PREFIXES = [...new Set(getAllValues(VERB_SUBJECT_PREFIXES))];
const FLAT_VERB_OBJECT_SUFFIXES = [...new Set(getAllValues(VERB_OBJECT_SUFFIXES))];


window.modules.push("AffixesMap")