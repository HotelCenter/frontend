import { IconDefinition, faStar } from "@fortawesome/free-regular-svg-icons"
import { faStar as faFillStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons"
export function getRates(rateNum: number): IconDefinition[] {
    // clamp the rate between 0 and 5
    rateNum = Math.max(Math.min(rateNum, 5), 0)
    // return only fill stars
    const fillStars = rateNum - rateNum % 1
    // return only half stars

    const halfStar = rateNum % 1 === 0 ? 0 : 1
    // return only not fill stars

    const notFillStars = 5 - rateNum
    // put it all in array rates
    let arrayRate: IconDefinition[] = [];

    arrayRate = arrayRate.concat(Array.from({ length: fillStars }, () => faFillStar));
    arrayRate = arrayRate.concat(Array.from({ length: halfStar }, () => faStarHalfStroke));
    arrayRate = arrayRate.concat(Array.from({ length: notFillStars }, () => faStar));

    return arrayRate
}
export async function fetchData(input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response> {
    const response = await fetch(input, init);
    if (response.status > 100 || response.status < 400) {
        return response
    }
    else if (response.status === 403) {
        throw { notAuthorized: true, status: response.status }
    } else if (response.status > 499) {
        throw { internalError: true, status: response.status }
    } else if (response.status === 404) {
        throw { notFound: true, status: response.status }
    } else {
        throw { unknown: true, status: response.status }
    }
}