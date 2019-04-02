let faker = require('faker');

module.exports = () => {
    const data = { cards: [] };

    for (let i = 0; i < 3; i++) {
        data.cards.push(createCard(i))
    }

    function createCard(i) {
        return {
            id: i,
            date: faker.date.past(),
            cardType: {
                id: 1,
                name: faker.lorem.word('lorem.word')
            },
            complaint: faker.lorem.paragraphs(),
            visited: {
                clinic: {
                    name: faker.lorem.word('name.jobArea'),
                    district: "District of a Face Surgery",
                    address: "Kyiv, Peremohy ave, 143"
                },
                doctor: {
                    id: 3,
                    name: "Aleksei Rubinovich"
                }
            },
            diagnose: [
                {
                    name: "3rd upper left has caries"
                },
                {
                    name: "2nd bottom right has deep caries"
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