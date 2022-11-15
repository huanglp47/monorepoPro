import dayjs from 'dayjs'

// 格式化时间
export function format(time, f = 'YYYY-MM-DD') {
    return dayjs(time).format(f)
}

//除去input框 前后 空格
export const trimSpace = function (s = "") {
    return String(s).replace(/(^\s*)|(\s*$)/g, "")
}

/**
 * 删除参数两端空白
 */
export function trimSpaceFn(obj) {
    try {
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                if (typeof obj[k] == 'number' || typeof obj[k] == 'string') {
                    obj[k] = trimSpace(String(obj[k]))
                }
            }
        }
        return obj
    } catch (err) {
        return obj
    }
}

/**
 * 删除对象空属性
 * @param obj
 */
function deleteEmptyAttri(obj) {
    for (var k in obj) {
        if (obj.hasOwnProperty(k) && obj[k] === '') {
            delete obj[k]
        }
    }
}

// 首字母转大写
export const firstToUpperCase = (val) => {
    return val.slice(0,1).toUpperCase() + val.slice(1)
}

// 多维数组拍平
export const flatArr = (arr)=>{
    return arr.reduce((prev,cur)=>{
        return prev.concat(Array.isArray(cur) ? flatArr(cur) : cur)
    },[])
}