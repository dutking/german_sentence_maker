//GET VERB INFO

function collectVerbInfo(verb) {
    let verbProps = {
        type: determineVerbType(verb),
        prefix: determineVerbPrefix(verb),
        prefixType: determineVerbPrefixType(verb),
        stem: determineVerbStem(verb),
        ending: determineVerbEnding(verb),
        ieren: determineIfIerenEnding(verb)
    }
    return verbProps
}

function determineVerbType(verb) {
    if (Object.keys(irregularVerbs).some(e => e === verb)) {
        return 'irregular'
    } else {
        return 'regular'
    }
}

function determineVerbPrefix(verb) {
    let prefix = ''
    if (prefixes.detach.filter(e => verb.startsWith(e)).length !== 0) {
        prefix = prefixes.detach.filter(e => verb.startsWith(e))[0]
    } else if (prefixes.attach.filter(e => verb.startsWith(e)).length !== 0) {
        prefix = prefixes.attach.filter(e => verb.startsWith(e))[0]
    } else if (prefixes.mixed.filter(e => verb.startsWith(e)).length !== 0) {
        prefix = prefixes.mixed.filter(e => verb.startsWith(e))[0]
    }
    return prefix
}

function determineVerbPrefixType(verb) {
    let currentPrefixType = ''
    if (prefixes.detach.filter(e => verb.startsWith(e)).length !== 0) {
        currentPrefixType = 'detach'
    } else if (prefixes.attach.filter(e => verb.startsWith(e)).length !== 0) {
        currentPrefixType = 'attach'
    } else if (prefixes.mixed.filter(e => verb.startsWith(e)).length !== 0) {
        currentPrefixType = 'mixed'
    }
    return currentPrefixType
}

function determineVerbEnding(verb) {
    let currentEnding = ''
    if (verb.slice(-2) === 'en') {
        currentEnding = 'en'
    } else if (verb.slice(-2) !== 'en' && verb.slice(-1) === 'n') {
        currentEnding = 'n'
    }
    return currentEnding
}

function determineIfIerenEnding(verb) {
    if (verb.slice(-5) === 'ieren') {
        return true
    } else {
        return false
    }
}

function determineVerbStem(verb) {
    let currentStem = ''
    let currentPrefix = determineVerbPrefix(verb)
    let currentEnding = determineVerbEnding(verb)
    if (currentPrefix) {
        currentStem = verb.replace(currentPrefix, '').slice(0, -currentEnding.length)
    } else {
        currentStem = verb.slice(0, -currentEnding.length)
    }
    return currentStem
}

function modifyVerbEnding(verb) {
    if (verb.slice(-2) === 'en') {
        console.log(verb.slice(0, -2) + 't')
        return verb.slice(0, -2) + 't'
    } else if (verb.slice(-1) === 'n') {
        console.log(verb.slice(0, -1) + 't')
        return verb.slice(0, -1) + 't'
    }
}

function convertVerbToParticip2(verb) {
    let verbInfo = collectVerbInfo(verb)

    if (verbInfo.type === 'irregular') {
        return irregularVerbs[verb].particip2
    } else {
        if (verbInfo.prefixType === 'detach' || verbInfo.ieren) {
            return `${verbInfo.prefix}${verbInfo.stem}t`
        } else {
            return `${verbInfo.prefix}ge${verbInfo.stem}t`
        }
    }
}

function convertVerbToPreterite(verb) {
    let verbInfo = collectVerbInfo(verb)
    if (verbInfo.type === 'irregular') {
        return irregularVerbs[verb].preterite
    } else {
        return `${verbInfo.prefix}${verbInfo.stem}ten`
    }
}

function selectRandomFromObj(obj, fieldSet) {
    let final = {}
    let current = obj
    let index = 0
    let arr
    let rand
    while (typeof current !== 'string' && Array.isArray(current) === false) {
        arr = Object.keys(current)
        rand = getRandom(arr.length)
        final[fieldSet[index]] = arr[rand]
        current = current[arr[rand]]
        index += 1
    }
    if (typeof current === 'string') {
        final[fieldSet[fieldSet.length - 1]] = current
    } else if (Array.isArray(current)) {
        final[fieldSet[fieldSet.length - 1]] = selectRandomFromArr(current)
    }
    return final
}

function selectRandomFromArr(arr) {
    let rand = getRandom(arr.length)
    return arr[rand]
}

// склоняем глагол на основе выбранного местоимения

function conjVerb(verb, pronoun, tense) {
    let verbInfo = collectVerbInfo(verb)
    let ending = verbEndings
    for (let prop in pronoun) {
        if (prop === 'finalForm') {
            break
        }
        ending = ending[pronoun[prop]]
    }
    if (verbInfo.prefixType !== 'attach') {
        return [`${verbInfo.prefix}${verbInfo.stem}${ending}`]
    } else {
        return [`${verbInfo.stem}${ending}`, `${verbInfo.prefix}`]
    }
}