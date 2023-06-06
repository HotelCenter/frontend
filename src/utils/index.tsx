import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-regular-svg-icons"
import { faStar as faFillStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons"
export function getRates(rateNum: number) {
    // clamp the rate between 0 and 5
    rateNum = Math.max(Math.min(rateNum, 5), 0)
    // return only fill stars
    const fillStars = rateNum - rateNum % 1
    // return only half stars

    const halfStar = rateNum % 1 === 0 ? 0 : 1
    // return only not fill stars

    const notFillStars = 5 - rateNum
    const fillStar = <FontAwesomeIcon icon={faFillStar} bounce style={{ color: "#fbff00", }} />;
    const halfStarEl = <FontAwesomeIcon icon={faStarHalfStroke} bounce style={{ color: "#fbff00", }} />;
    const star = <FontAwesomeIcon icon={faStar} bounce style={{ color: "#fbff00", }} />;
    // put it all in array rates
    let arrayRate: JSX.Element[] = [];

    arrayRate = arrayRate.concat(Array.from({ length: fillStars }, () => fillStar));
    arrayRate = arrayRate.concat(Array.from({ length: halfStar }, () => halfStarEl));
    arrayRate = arrayRate.concat(Array.from({ length: notFillStars }, () => star));

    return arrayRate
}