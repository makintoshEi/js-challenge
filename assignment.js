const task1 = document.querySelector('#task-1')
task1.setAttribute('style', 'background-color: black; color: white')

const task2 = document.querySelector('ol li')

const documentTitle = document.head.querySelector('title')
documentTitle.innerText = 'Assignment - Solved!'

document.querySelector('h1').textContent = 'Assigment - Solved!!'


// Meta-Programming
// Use cases: Creator of Third Party Library
const uid = Symbol()
console.log('uid ::', uid)

const user = {
    [uid]: 'p1',
    name: 'Asael',
    age: 31
}

// user land
console.log(user)


// well known JS Symbols
// Reflect API work with objects has some adventages over Object
const courseUid = Symbol()
const course = {
    [courseUid]: 'xyz',
    name: 'Angular the complete guide',
    year: 2023,
    company: 'Udemy',
    instructor: 'Max'
}


const courseWrapper = new Proxy(course, {
    get(obj, propertyName) {
        return obj[propertyName] || 'PROPERTY_NOT_FOUND ' + propertyName
    },
    set(obj, propertyName, newValue) {
        switch (propertyName) {
            case 'instructor':
            case 'company':
                console.error('you are not allowed to modify this property')
                return
            case 'year':
                console.warn('year should not be modified be cautious with it')
            default:
                obj[propertyName] = newValue
        }
        obj[propertyName] = newValue
    }
})

console.log(courseWrapper.length)
courseWrapper.instructor = 'Asael'
courseWrapper.year = 2024
console.log(':: instructor ', courseWrapper)


// Recursive function
// It's like climbing down a ladder, each step down is a function call 
// UNTIL you reach the base, when you clim back up to the top (resolving each call)

const personA = {
    name: 'Asael Tello B.',
    friends: ['Daniel', 'Duvan', 'Gato', 'Arlet'],
    relative: {
        name: 'Arlet',
        friends: ['Sarita', 'Abigail', 'Armandito'],
        relative: {
            name: 'Kenny',
            friends: ['Byron', 'Aemond'],
            relative: {
                name: 'Michlle',
                friends: ['Abisai', 'Lyanna', 'Maegor']
            }
        }
    }
}

function showFriends(person) {
    if (!person) { // base conditional
        return
    }
    console.log('personName: ' + person.name + ' friends [] ', person.friends)
    showFriends(person.relative) // climbing down the ladder
}

showFriends(personA)
