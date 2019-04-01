export default class MockedCards {

    getCards() {
        return {
            cards: [
                {
                    id: 1,
                    date: '2019-01-03 08:00:00',
                    cardType: {
                        id: 1,
                        name: 'Teeth'
                    },
                    complaint: 'Lorem ipsum and bla bla bla',
                    visited: {
                        clinic: {
                            name: 'Astra Dental',
                            district: 'District of a Face Surgery',
                            address: 'Kyiv, Peremohy ave, 143'
                        },
                        doctor: {
                            id: 3,
                            name: 'Aleksei Rubinovich'
                        }
                    },
                    diagnose: [
                        {
                            name: '3rd upper left has caries',
                        },
                        {
                            name: '2nd bottom right has deep caries'
                        }
                    ],
                    materials: [
                        {
                            title: 'blood analysis'
                        },
                        {
                            title: 'rentgen'
                        }
                    ]
                }
            ]
        };
    }
}