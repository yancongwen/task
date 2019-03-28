// 第一题
function padLeft(str, len, chars) {
    chars = chars ? chars : ' '
    let result = str
    let initLen = str.length
    let charsLen = chars.length
    let leftLen = len - initLen
    if (leftLen > 0) {
        let cycleIndex = parseInt(leftLen / charsLen) + 1
        let leftStr = chars.repeat(cycleIndex)
        result = leftStr.substring(0,leftLen) + str
    }
    return result
}

// 第二题
function isMatch(s, r) {

}

// 第三题
function isCyclic (obj) {
    let result = false
    let arr = []
    let check = function(obj) {
        let type = typeof obj
        if (type === 'function' || type === 'object' && !!obj) {
            for(let i in obj) {
                if (arr.indexOf(obj[i]) === -1) {
                    arr.push(obj[i])
                    check(obj[i])
                } else {
                    result = true
                    break
                }
            }
        }
    }
    check(obj)
    return result
}

// 第四题
function cutAndJoinArray(arr, index) {
    let subArr1 = arr.slice(0,index)
    let subArr2 = arr.slice(index)
    let newArr = subArr2.concat(subArr1)
    return newArr
}

