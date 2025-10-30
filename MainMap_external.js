// Locales + identifiers idk
window.modules = window.modules || []

const GENDERS = Object.freeze({
    E: Object.freeze({ NAME: "Exalted", SHORT: "e" }),
    R: Object.freeze({ NAME: "Rational", SHORT: "r" }),
    MON: Object.freeze({ NAME: "Monstrous", SHORT: "mon" }),
    I: Object.freeze({ NAME: "Irrational", SHORT: "i" }),
    MAG: Object.freeze({ NAME: "Magical", SHORT: "mag" }),
    MUN: Object.freeze({ NAME: "Mundane", SHORT: "mun" }),
    A: Object.freeze({ NAME: "Abstract", SHORT: "a" })
})

const GENDERS_ANIMATES = Object.freeze({
    NAME: "Animates",
    AFFECTED: Object.freeze([
        GENDERS.E,
        GENDERS.R,
        GENDERS.MON,
        GENDERS.I
    ])
})

const GENDERS_INANIMATES = Object.freeze({
    NAME: "Inanimates",
    AFFECTED: Object.freeze([
        GENDERS.MAG,
        GENDERS.MUN,
        GENDERS.A
    ])
})

const GENDERS_ALL = Object.freeze({
    NAME: "All",
    AFFECTED: Object.freeze([
        ...GENDERS_ANIMATES.AFFECTED,
        ...GENDERS_INANIMATES.AFFECTED
    ])
})



const NUMBERS = Object.freeze({
    S: "Singular",
    D: "Dual",
    P: "Plural"
})

const MOODS = Object.freeze({
    D: "Directive",
    R: "Recessive",
})

const TARGETS = Object.freeze({
    S: "Subject",
    O: "Object",
})


window.modules.push("MainMap")