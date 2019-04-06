let faker = require('faker');

module.exports = () => {
    const data = { cards: [] };

    for (let i = 0; i < 7; i++) {
        data.cards.push(createCard(i))
    }

    function createCard(i) {
        return {
            id: i,
            date: faker.date.past(),
            cardType: {
                id: 1,
                title: faker.lorem.word('lorem.word')
            },
            complaint: faker.lorem.paragraphs(),
            visited: {
                clinic: {
                    title: faker.lorem.word('name.jobArea'),
                    district: "District of a Face Surgery",
                    address: "Kyiv, Peremohy ave, 143"
                },
                doctor: {
                    id: 3,
                    title: "Aleksei Rubinovich"
                }
            },
            diagnose: [
                {
                    title: "3rd upper left has caries"
                },
                {
                    title: "2nd bottom right has deep caries"
                }
            ],
            materials: [
                {
                    title: "blood analysis"
                },
                {
                    title: "rentgen"
                }
            ]
        }
    }

    return data
};