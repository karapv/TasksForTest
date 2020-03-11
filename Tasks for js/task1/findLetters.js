const letterFounder = (str) =>{
    if (typeof str !== 'string' || str.length === 0)  throw new Error('Функция принимает только строку! Так же в функцию не должно передаваться пустое значениею');
    let currentStr = str.replace(/\s/g,'').toLowerCase(),maxValue,strArrNumber,strArr;
    const strObj = {};
    for (let char of currentStr) {
        if (strObj.hasOwnProperty(char)) {
            strObj[char]++
        } else {
            strObj[char] = 1
        }
    }
    strArr = Object.keys(strObj);
    strArrNumber = Object.values(strObj);
    maxValue = Math.max(...strArrNumber);
    return strArr[strArrNumber.indexOf(maxValue)]
};
let someString = 'Lorem asdas dddasad asda sd';
console.log(letterFounder(someString));