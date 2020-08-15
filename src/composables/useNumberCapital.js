import { CN_AMOUNT } from '../constants/index'
const cnNums = CN_AMOUNT.NUMS
const cnIntRadice = CN_AMOUNT.INT_RADICE // 拾 \u62fe 佰 \u4f70 仟 \u4edf
const cnIntUnits = CN_AMOUNT.INT_UNITS // 万 \u4e07 亿 \u4ebf 兆 \u5146
const cnDecUnits = CN_AMOUNT.DEC_UNITS // 角 \u89d2 分 \u5206 厘 \u5398 毫 \u6beb
const cnInteger = CN_AMOUNT.INTEGER // 整 \u6574
const cnIntLast = CN_AMOUNT.INT_LAST // 元 \u5143
const cnNegative = CN_AMOUNT.NEGATIVE // 负

// Maximum number
const maxNum = 999999999999999.9999

const useNumberCapital = function (number) {
  let negative
  let integerNum // Integral part
  let decimalNum // Decimal part
  let capitalStr = '' // Capital number

  let parts

  if (number === '') {
    return ''
  }

  number = parseFloat(number)

  if (number < 0) {
    negative = true
    number = Math.abs(number)
  }

  if (number >= maxNum) {
    return ''
  }

  if (number === 0) {
    capitalStr = cnNums[0] + cnIntLast + cnInteger
    return capitalStr
  }

  // Convert to String
  number += ''

  if (number.indexOf('.') === -1) {
    integerNum = number
    decimalNum = ''
  } else {
    parts = number.split('.')
    integerNum = parts[0]
    decimalNum = parts[1].substr(0, 4)
  }

  // Convert integer part
  if (parseInt(integerNum, 10) > 0) {
    let zeroCount = 0
    for (let i = 0, IntLen = integerNum.length; i < IntLen; i++) {
      const n = integerNum.substr(i, 1)
      const p = IntLen - i - 1
      const q = p / 4
      const m = p % 4
      if (n === '0') {
        zeroCount++
      } else {
        if (zeroCount > 0) {
          capitalStr += cnNums[0]
        }
        zeroCount = 0
        capitalStr += cnNums[parseInt(n)] + cnIntRadice[m]
      }
      if (m === 0 && zeroCount < 4) {
        capitalStr += cnIntUnits[q]
      }
    }
    capitalStr += cnIntLast
  }

  // Convert decimal part
  if (decimalNum !== '') {
    for (let i = 0, decLen = decimalNum.length; i < decLen; i++) {
      const n = decimalNum.substr(i, 1)
      if (n !== '0') {
        capitalStr += cnNums[Number(n)] + cnDecUnits[i]
      }
    }
  }

  if (capitalStr === '') {
    capitalStr += cnNums[0] + cnIntLast + cnInteger
  } else if (decimalNum === '') {
    capitalStr += cnInteger
  }

  if (negative) {
    capitalStr = `${cnNegative}${capitalStr}`
  }
  return capitalStr
}

export default useNumberCapital
