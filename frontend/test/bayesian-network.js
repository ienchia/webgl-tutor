const expect = require('chai').expect

const bn = require('../src/lib/bayesian-network.js')

describe('Three node example', function () {
    const net = bn([
        {
            name: 1,
            parents: [],
            probability: .7
        },
        {
            name: 2,
            parents: [
                {
                    name: 1,
                    state: true
                }
            ],
            probability: .7
        },
        {
            name: 2,
            parents: [
                {
                    name: 1,
                    state: false
                }
            ],
            probability: .5
        },
        {
            name: 3,
            parents: [
                {
                    name: 1,
                    state: true
                },
                {
                    name: 2,
                    state: true
                }
            ],
            probability: .7
        },
        {
            name: 3,
            parents: [
                {
                    name: 1,
                    state: true
                },
                {
                    name: 2,
                    state: false
                }
            ],
            probability: .5
        },
        {
            name: 3,
            parents: [
                {
                    name: 1,
                    state: false
                },
                {
                    name: 2,
                    state: true
                }
            ],
            probability: .3
        },
        {
            name: 3,
            parents: [
                {
                    name: 1,
                    state: false
                },
                {
                    name: 2,
                    state: false
                }
            ],
            probability: .1
        },
    ])
    describe('#getAllItem()', function () {
        it('should return a list of all the item contained by the network', function () {
            expect(net.getAllItem())
            .to.deep.equal([
                { name: 1 },
                { name: 2 },
                { name: 3 }
            ])
        })
    })
    describe('#findItemsByName(name)', function () {
        it('should return a list of items where the name is the same with the provided name', function () {
            expect(net.findItemsByName(1))
            .to.deep.equal([
                {
                    name: 1,
                    parents: [],
                    probability: .7
                }
            ])

            expect(net.findItemsByName(2))
            .to.deep.equal([
                {
                    name: 2,
                    parents: [
                        {
                            name: 1,
                            state: true
                        }
                    ],
                    probability: .7
                },
                {
                    name: 2,
                    parents: [
                        {
                            name: 1,
                            state: false
                        }
                    ],
                    probability: .5
                }
            ])
        })
    })
    describe('#filterItemListOverKnownFacts(knownFacts, itemList)', function () {
        it('should return an item with parents that matched knownFacts', function () {
            expect(net.filterItemListOverKnownFacts(
                [],
                net.findItemsByName(1)
            ))
            .to.deep.equal([
                {
                    name: 1,
                    parents: [],
                    probability: .7
                }
            ])

            expect(net.filterItemListOverKnownFacts(
                [
                    { name: 1, state: true }
                ],
                net.findItemsByName(2)
            ))
            .to.deep.equal([
                {
                    name: 2,
                    parents: [
                        {
                            name: 1,
                            state: true
                        }
                    ],
                    probability: .7
                }
            ])

            expect(net.filterItemListOverKnownFacts(
                [
                    { name: 1, state: false },
                    { name: 2, state: true }
                ],
                net.findItemsByName(3)
            ))
            .to.deep.equal([
                {
                    name: 3,
                    parents: [
                        {
                            name: 1,
                            state: false
                        },
                        {
                            name: 2,
                            state: true
                        }
                    ],
                    probability: .3
                }
            ])
        })
        it('should return an item with parents that matched unsorted knownFacts', function () {
            expect(net.filterItemListOverKnownFacts(
                [
                    { name: 2, state: true },
                    { name: 1, state: false }
                ],
                net.findItemsByName(3)
            ))
            .to.deep.equal([
                {
                    name: 3,
                    parents: [
                        {
                            name: 1,
                            state: false
                        },
                        {
                            name: 2,
                            state: true
                        }
                    ],
                    probability: .3
                }
            ])
        })
    })
    describe('#calcProb(fact, knownFacts)', function () {
        it('should return probability of fact over knownFacts', function () {
            expect(net.calcProb({ name: 1, state: true }, []))
            .to.equal(.7)

            expect(net.calcProb(
                { name: 3, state: false },
                [
                    { name: 2, state: true },
                    { name: 1, state: false }
                ]
            ))
            .to.equal(.7)
        })
    })
    describe('#genFactListSatifiesKnownFacts(knownFacts)', function () {
        it('should return a list of [possible fact list sorted by name] when some facts are known', function () {
            expect(net.genFactListSatifiesKnownFacts(
                [
                    { name: 1, state: true }
                ]
            ))
            .to.deep.equal(
                [
                    [
                        { name: 1, state: true },
                        { name: 2, state: true },
                        { name: 3, state: true }
                    ],
                    [
                        { name: 1, state: true },
                        { name: 2, state: true },
                        { name: 3, state: false }
                    ],
                    [
                        { name: 1, state: true },
                        { name: 2, state: false },
                        { name: 3, state: true }
                    ],
                    [
                        { name: 1, state: true },
                        { name: 2, state: false },
                        { name: 3, state: false }
                    ]
                ]
            )

            expect(net.genFactListSatifiesKnownFacts(
                [
                    { name: 1, state: false },
                    { name: 2, state: true }
                ]
            ))
            .to.deep.equal(
                [
                    [
                        { name: 1, state: false },
                        { name: 2, state: true },
                        { name: 3, state: true }
                    ],
                    [
                        { name: 1, state: false },
                        { name: 2, state: true },
                        { name: 3, state: false }
                    ],
                ]
            )
        })
    })
    describe('#genFullJointListOfFactAndFactKnownFact(facts, knownFacts)', function () {
        it('should return list of 2 list for inference', function () {
            expect(net.genFullJointListOfFactAndFactKnownFact(
                [{name: 1, state: true}],
                [{name: 2, state: true}]
            )).to.deep.equal([
                [

                    [
                        {name: 1, state: true},
                        {name: 2, state: true},
                        {name: 3, state: true}
                    ],
                    [
                        {name: 1, state: true},
                        {name: 2, state: true},
                        {name: 3, state: false}
                    ]
                ],
                [

                    [
                        {name: 1, state: true},
                        {name: 2, state: true},
                        {name: 3, state: true}
                    ],
                    [
                        {name: 1, state: true},
                        {name: 2, state: true},
                        {name: 3, state: false}
                    ],[
                        {name: 1, state: false},
                        {name: 2, state: true},
                        {name: 3, state: true}
                    ],
                    [
                        {name: 1, state: false},
                        {name: 2, state: true},
                        {name: 3, state: false}
                    ]
                ]
            ])
        })
    })
    // describe('#inference(facts, knownFacts)', function () {
    //     it('should return a probability of facts happening when knownFacts are known', function () {
    //         expect(net.inference(
    //             [{name: 2, state: true}],
    //             [{name: 1, state: true}]
    //         ).toFixed(4)).to.equal((.07181).toFixed(4))
    //     })
    // })
    describe('', function () {
        it('', function () {
            expect(net.ask(
                {name: 2, state: true},
                [{name: 1, state: true}]
            )).to.deep.equal(.7)
        })
    })
})
