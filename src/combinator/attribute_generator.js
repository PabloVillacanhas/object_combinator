const string_possibilities = ["", 1, null]
const number_possibilities = ["", "1", null]
const boolean_possibilities = ["", "false", null]
const obj_possibilities = ["", {}, null]
const date_possibilities = ["", null]
const array_possibilities = ["", [], null]

const timezoneFormats = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/; //2018-10-17T13:34:15.226Z

function stringIsADateFormat(string) {
    if (string.match(timezoneFormats)) {
        return true;
    }
    return false
}

function getType(attr) {
    if (typeof attr.__proto__.sort === 'function') {
        return 'array'
    }
    else {
        return 'object'
    }
}

function iterationCopy(src) {
    let target = {};
    for (let prop in src) {
        if (src.hasOwnProperty(prop)) {
            if (typeof (src[prop]) === 'object') {
                switch (getType(src[prop])) {
                    case 'array':
                        target[prop] = src[prop].slice()
                        break
                    default:
                        target[prop] = iterationCopy(src[prop])
                        break;
                }
            } else {
                target[prop] = src[prop];
            }
        }
    }
    return target;
}

changer = (obj) => {
    let generated_objects = []
    generated_objects.push(obj)
    for (var attr in obj) {
        let possibilities;
        switch (typeof obj[attr]) {
            case 'string':
                stringIsADateFormat(obj[attr]) ?
                    possibilities = date_possibilities :
                    possibilities = string_possibilities;
                break;
            case 'number':
                possibilities = number_possibilities;
                break;
            case 'boolean':
                possibilities = boolean_possibilities;
                break;
            case 'object':
                switch (getType(obj[attr])) {
                    case 'array':
                        possibilities = array_possibilities;
                        break
                    default:
                        possibilities = obj_possibilities;
                        break;
                }
                break;
        }
        for (var possibility of possibilities.values()) {
            let copy = iterationCopy(obj)
            copy[attr] = possibility
            generated_objects.push(copy)
        }
    }
    return generated_objects;
}

module.exports.changer = changer;
module.exports.stringIsADateFormat = stringIsADateFormat;