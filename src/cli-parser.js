'use strict'

const FlagIdentifier = '--'
const DefaultValue   = true
const BadResultValue = null

/**
*   Transform str input to 
*   ary input if needed
*/
function str2ary (args) {
    return Array.isArray(args) === true ? args : args.match(/\S+/g)
}

/**
*   Is a flag if it start with *FlagIdentifier* 
*   and there is at least one char after the identifier.
*   So for instance -- is not a valid flag
*/
function isFlag (arg) {
    return (arg.startsWith(FlagIdentifier) && arg.length > FlagIdentifier.length) || false  
}

/**
*   Remove the *FlagIdentifier* 
*   from flag
*/
function flag2key (arg) {
    return arg.split(FlagIdentifier)[1] 
}

/**
*   Try to cast an "integer string" to integer.
*   First detect if is a number, than verify if
*   the module 1 is zero (a.k.a integer)
*/
function str2Int (value) {
    return isNaN(value) ? value : (value % 1 === 0 ? parseInt(value) : value)
}

/**
*   Rules:
*   1. There is at least one flag
*   2. The first arg is a flag
*/
function preCheck (args) {
    return args !== null && args.length !== 0 && isFlag(args[0]) === true
}

/**
*   Called for very arg.
*   If is a new flag, create the *DefaultValue*.
*   Else either transform to str/int or add to 
*   array if there are multiple same flags.
*   If there is more than a value in a row,
*   it returns false, so the *every* loop will fail.
*   It use add2Map.lastKey in order to store
*   the previus value.
*/
function add2Map (map, value) {
    if (isFlag(value)) {
        add2Map.lastKey = flag2key(value)
        if (!map.hasOwnProperty(add2Map.lastKey)) {
            map[add2Map.lastKey] = DefaultValue
        }
    } else if (add2Map.lastKey !== undefined) {
        switch (typeof map[add2Map.lastKey]) {
            case 'boolean':
                map[add2Map.lastKey] = str2Int(value)
                break
            case 'object':
                map[add2Map.lastKey].push(str2Int(value))
                break
            default:
                map[add2Map.lastKey] = [map[add2Map.lastKey], str2Int(value)]
        }
        add2Map.lastKey = undefined
    } else {
        return false
    }
    return true
}

module.exports = (args) => {
    const map = {}
    const ary = str2ary(args)
    return preCheck(ary) === true  
        ? (ary.every ((arg) => { return add2Map(map, arg) }) === true ? map : BadResultValue) 
        : BadResultValue
}