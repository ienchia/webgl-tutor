const expect = require('chai').expect
const bn = require('../src/lib/bayesian-network.js')


describe('Bayesian Network', function() {
    const net = bn([
        {
            name: '1',
            probability: .7,
            parents: []
        },
        {
            name: '2',
            probability: .8,
            parents: [
                {
                    name: '1',
                    state: true
                }
            ]
        },
        {
            name: '2',
            probability: .6,
            parents: [
                {
                    name: '1',
                    state: false
                }
            ]
        }
    ])

    describe('#calcProb({ name: itemName, state: itemState }, [ conditions ])', function () {
        it('should return probability of item over conditions', function () {
            expect(
                net.calcProb(
                    { name: '2', state: true },
                    [
                        { name: '1', state: false }
                    ]
                )
            )
            .to.equal(
                .6
            )
        })
    })
})

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
})

describe('Alarm Example', function () {
    const net = bn([
        {
            name: 1,
            parents: [],
            probability: 0.001
        },
        {
            name: 2,
            parents: [],
            probability: 0.002
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
            probability: 0.95
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
            probability: 0.94
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
            probability: 0.29
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
            probability: 0.001
        },
        {
            name: 4,
            parents: [
                {
                    name: 3,
                    state: true
                }
            ],
            probability: 0.90
        },
        {
            name: 4,
            parents: [
                {
                    name: 3,
                    state: false
                }
            ],
            probability: 0.05
        },
        {
            name: 5,
            parents: [
                {
                    name: 3,
                    state: true
                }
            ],
            probability: 0.70
        },
        {
            name: 5,
            parents: [
                {
                    name: 3,
                    state: false
                }
            ],
            probability: 0.01
        }
    ])
    it('should return 0.284 if 1 and 4, 5 are known', function () {
        const answer = net.ask({ name: 1, state: true }, [{ name: 4, state: true }, { name: 5, state: true }])
        expect(answer.toFixed(3))
        .to.equal((.284).toFixed(3))
    })
    it('should return 0.716 if ~1 and 4, 5 are known', function () {
        const answer = net.ask({ name: 1, state: false }, [{ name: 4, state: true }, { name: 5, state: true }])
        expect(answer.toFixed(3))
        .to.equal((.716).toFixed(3))
    })
})

describe('Wetgrass Example', function () {
    const net = bn([
        {
            name: 1,
            parents: [],
            probability: 0.5
        },
        {
            name: 2,
            parents: [
                {
                    name: 1,
                    state: true
                }
            ],
            probability: 0.1
        },
        {
            name: 2,
            parents: [
                {
                    name: 1,
                    state: false
                }
            ],
            probability: 0.5
        },
        {
            name: 3,
            parents: [
                {
                    name: 1,
                    state: true
                }
            ],
            probability: 0.8
        },
        {
            name: 3,
            parents: [
                {
                    name: 1,
                    state: false
                }
            ],
            probability: 0.2
        },
        {
            name: 4,
            parents: [
                {
                    name: 2,
                    state: true
                },
                {
                    name: 3,
                    state: true
                }
            ],
            probability: 0.99
        },
        {
            name: 4,
            parents: [
                {
                    name: 2,
                    state: true
                },
                {
                    name: 3,
                    state: false
                }
            ],
            probability: 0.9
        },
        {
            name: 4,
            parents: [
                {
                    name: 2,
                    state: false
                },
                {
                    name: 3,
                    state: true
                }
            ],
            probability: 0.9
        },
        {
            name: 4,
            parents: [
                {
                    name: 2,
                    state: false
                },
                {
                    name: 3,
                    state: false
                }
            ],
            probability: 0.0
        }
    ])
    it('should return 0.430 if 2 and 4 are known', function () {
        const answer = net.ask({ name: 2, state: true }, [{ name: 4, state: true }])
        expect(answer.toFixed(3))
        .to.equal((.430).toFixed(3))
    })
    it('should return 0.708 if 3 and 4 are known', function () {
        const answer = net.ask({ name: 3, state: true }, [{ name: 4, state: true }])
        expect(answer.toFixed(3))
        .to.equal((.708).toFixed(3))
    })
})

describe('HTML JS WebGL Example', function () {
    const net = bn([
        {
            name: 1,
            parents: [],
            probability: 0.7
        },
        {
            name: 2,
            parents: [
                {
                    name: 1,
                    state: true
                }
            ],
            probability: 0.7
        },
        {
            name: 2,
            parents: [
                {
                    name: 1,
                    state: false
                }
            ],
            probability: 0.5
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
            probability: 0.7
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
            probability: 0.5
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
            probability: 0.3
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
            probability: 0.1
        }
    ])

    it('should return 0.7 if 2 and 1 is known', function () {
        const answer = net.ask({ name: 2, state: true }, [{ name: 1, state: true }])
        expect(answer.toFixed(1))
        .to.equal((0.7).toFixed(1))
    })

    it('should return 0.5 if 3 and 1 is known', function () {
        const answer = net.ask({ name: 3, state: true }, [{ name: 1, state: true }])
        expect(answer.toFixed(2))
        .to.equal((0.64).toFixed(2))
    })
})
