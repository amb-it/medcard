import cardTypes from "../../../seeds/cardTypes";
import CardType from "../../../models/cardType";


async function cardTypeSeed() {
    for (const value of cardTypes) {
        const cardType = new CardType({
            "title": value.title
        });
        
        await cardType.save();
    }
}

export default cardTypeSeed;