import { numbers } from './config';

const chineseToNumber = (str) => {
  if (str.includes('亿')) {
    const index = str.lastIndexOf('亿');
    if (index === 0) {
      return 1 * 100000000 + chineseToNumber(str.substring(index + 1));
    } else if (index === str.length - 1) {
      return chineseToNumber(str.substring(0, index)) * 100000000
    } else {
      return chineseToNumber(str.substring(0, index)) * 100000000 + chineseToNumber(str.substring(index + 1))
    }
  } else if (str.includes('万')) {
    const index = str.lastIndexOf('万');
    if (index === 0) {
      return 1 * 10000 + chineseToNumber(str.substring(index + 1));
    } else if (index === str.length - 1) {
      return chineseToNumber(str.substring(0, index)) * 10000
    } else {
      return chineseToNumber(str.substring(0, index)) * 10000 + chineseToNumber(str.substring(index + 1))
    }
  } else if (str.includes('千')) {
    const index = str.lastIndexOf('千');
    if (index === 0) {
      return 1 * 1000 + chineseToNumber(str.substring(index + 1));
    } else if (index === str.length - 1) {
      return chineseToNumber(str.substring(0, index)) * 1000
    } else {
      return chineseToNumber(str.substring(0, index)) * 1000 + chineseToNumber(str.substring(index + 1))
    }
  } else if (str.includes('百')) {
    const index = str.lastIndexOf('百');
    if (index === 0) {
      return 1 * 100 + chineseToNumber(str.substring(index + 1));
    } else if (index === str.length - 1) {
      return chineseToNumber(str.substring(0, index)) * 100
    } else {
      return chineseToNumber(str.substring(0, index)) * 100 + chineseToNumber(str.substring(index + 1))
    }
  } else if (str.includes('十')) {
    const index = str.lastIndexOf('十');
    if (index === 0) {
      return 10 + chineseToNumber(str.substring(index + 1));
    } else if (index === str.length - 1) {
      return chineseToNumber(str.substring(0, index)) * 10
    } else {
      return chineseToNumber(str.substring(0, index)) * 10 + chineseToNumber(str.substring(index + 1))
    }
  } else if (str.includes('点')) {
    const index = str.lastIndexOf('点');
    if (index === 0) {
      return Number('.' + chineseToNumber(str.substring(1)));
    } else if (index === str.length - 1) {
      return chineseToNumber(str.substring(0, index))
    } else {
      return Number(chineseToNumber(str.substring(0, index)) + '.' + chineseToNumber(str.substring(index + 1)));
    }
  } else {
    let number = -1;
    for (let i = 0; i < numbers.length; i++) {
      let numberObj = numbers[i];
      if (str.includes(numberObj['chinese'])) {
        number = numberObj['number'];
      }
    }
    if (number > -1) {
      return number;
    } else {
      return 0;
    }
  }
}

export default chineseToNumber;
