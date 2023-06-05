export function getRates(rateNum: number) {
    // clamp the rate between 0 and 5
    rateNum = Math.max(Math.min(rateNum, 5), 0)
    // return only fill stars
    const fillStars = rateNum - rateNum % 1
    // return only half stars

    const halfStar = rateNum % 1 === 0 ? 0 : 1
    // return only not fill stars

    const notFillStars = 5 - rateNum
    // put it all in array rates
    let arrayRate: string[] = []
    arrayRate = arrayRate.concat(Array.from({ length: fillStars }, () => 'bi-star-fill'))
    arrayRate = arrayRate.concat(Array.from({ length: halfStar }, () => 'bi-star-half'))
    arrayRate = arrayRate.concat(Array.from({ length: notFillStars }, () => 'bi-star'))

    return arrayRate
}