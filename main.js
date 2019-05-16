// get length

function getLength(obj) {
    if (Array.isArray(obj)) {
        return obj.length
    } else {
        return Object.keys(obj).length
    }
}

// getting random 

function getRandom(int) {
    return Math.floor(Math.random() * (int)) // (int + 1)
}

function getItem(obj) {
    let length = getLength(obj)
    let random = getRandom(length)
    if (Array.isArray(obj)) {
        return obj[random]
    } else {
        let arr = Object.keys(obj)
        return obj[arr[random]]
    }
}

let sentenceP = document.querySelector('#sentence p')
let btnNewSentence = document.querySelector('#newSentence')

btnNewSentence.addEventListener('click', function (event) {
    event.preventDefault()
    let person = selectRandomFromObj(pronouns, fieldSets.pronouns)
    let verb = conjVerb(getItem(regularVerbs), person)
    let object = getItem(nouns).singular
    if (verb.length === 1) {
        sentenceP.innerHTML = `${person.finalForm} ${verb[0]} ${object}.`
    } else {
        sentenceP.innerHTML = `${person.finalForm} ${verb[0]} ${object} ${verb[1]}.`
    }
})