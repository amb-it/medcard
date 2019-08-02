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
                    id: 10,
                    title: faker.lorem.word('name.jobArea'),
                    district: "District of a Face Surgery",
                    address: "Kyiv, Peremohy ave, 143"
                },
                doctor: {
                    id: 3,
                    title: "Aleksei Rubinovich"
                }
            },
            diagnose: " - 3rd upper left has caries \n - 2nd bottom right has deep caries",
            materials: [
                {
                    title: "blood analysis",
                    description: "leikocits - 150/30 \n neurocits - none"
                }
            ],
            prescriptions: " - drink tea with camomile \n - analgin 500mg every evening",
            notes: "some other stuff"
        }
    }

    return data
};