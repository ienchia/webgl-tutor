var expect = require('chai').expect;
var bn = require('../frontend/src/lib/bayesian-network')


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

    describe('#condProb({ name: itemName, state: itemState }, [ conditions ])', function () {
        it('should return probability of item over conditions', function () {
            expect(
                net.condProb(
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

    describe('#fullJoint([ conditions ])', function () {
        it('should return full joint distributions according to the conditions', function () {
            expect(
                net.fullJoint([
                    {
                        name: '2',
                        state: true
                    },
                    {
                        name: '1',
                        state: false
                    }
                ])
            )
            .to.equal(
                (1 - .7) * .6
            )
        })
    })

    describe('#getHidden([ items ])', function () {
        it('should return all item that are not in the items provided', function () {
            expect(net.getHidden([{name: '1'}]))
            .to.deep.equals([{name: '2'}])
        })
    })

    describe('#getParents({ name: itemName })', function () {
        it('should return all parent condition for the itemName', function () {
            expect(net.getParents({ name: '2' }))
            .to.deep.equal([
                [
                    {
                        name: '1',
                        state: true
                    }
                ],
                [
                    {
                        name: '1',
                        state: false
                    }
                ]
            ])
        })
    })
})

describe('Complex Bayesian Network', function () {
    const net = bn([
        {
            name: 'Rain',
            probability: .2,
            parents: []
        },
        {
            name: 'Sprinkler',
            probability: .4,
            parents: [
                {
                    name: 'Rain',
                    state: false
                }
            ]
        },
        {
            name: 'Sprinkler',
            probability: .01,
            parents: [
                {
                    name: 'Rain',
                    state: true
                }
            ]
        },
        {
            name: 'Grass',
            probability: .8,
            parents: [
                {
                    name: 'Rain',
                    state: true
                },
                {
                    name: 'Sprinkler',
                    state: false
                }
            ]
        },
        {
            name: 'Grass',
            probability: .9,
            parents: [
                {
                    name: 'Rain',
                    state: false
                },
                {
                    name: 'Sprinkler',
                    state: true
                }
            ]
        },
        {
            name: 'Grass',
            probability: .99,
            parents: [
                {
                    name: 'Rain',
                    state: true
                },
                {
                    name: 'Sprinkler',
                    state: true
                }
            ]
        },
        {
            name: 'Grass',
            probability: 0,
            parents: [
                {
                    name: 'Rain',
                    state: false
                },
                {
                    name: 'Sprinkler',
                    state: false
                }
            ]
        }
    ])

    describe('#infer(condition, knownConditions)', function () {
        it('should do calculate the probability of condition happen when knownConditions', function () {
            expect(
                net.infer(
                    { name: 'Rain', state: true },
                    [{ name: 'Grass', state: true }]
                ).toFixed(4)
            )
            .to.equal((.3577).toFixed(4))
        })
    })

    describe('#infer(condition, knownConditions)', function () {
        it('should Rain to no parents as hidden are all', function () {
            expect(
                net.infer(
                    { name: 'Rain', state: true },
                    []
                ).toFixed(4)
            )
            .to.equal((.2).toFixed(4))
        })
    })

    describe('#infer(condition, knownConditions)', function () {
        it('should Sprinkler to low value as all parents are active', function () {
            expect(
                net.infer(
                    { name: 'Sprinkler', state: true },
                    []
                ).toFixed(4)
            )
            .to.equal((.322).toFixed(4))
        })
    })
})

describe('Ad Hoc Bayesian', function () {
    const net = bn([{"name":1,"parents":[],"probability":0.7},{"name":2,"parents":[{"name":1,"state":true}],"probability":0.7},{"name":2,"parents":[{"name":1,"state":false}],"probability":0.7}])
    describe('Sample 1', function () {
        it('should not err', function () {
            expect(net.infer({ name: 1, state: true }, []))
            .to.equal(.7)
        })
    })

    describe('Sample 2', function () {
        it('should not return none', function () {
            expect(net.infer({ name: 1, state: true }, [{name: 1, state: true}]))
            .to.equal(.7)
        })
    })
})
