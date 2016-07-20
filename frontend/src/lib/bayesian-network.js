var R = require('ramda')

function bayesNetwork(set) {

    /* [[true, false], [true, false]] */
    function f(binCondSet) {
        return R.reduce(
            (results, items) => {
                return R.unnest(
                    R.map(
                        item =>
                        R.map(
                            result => R.append(item, result),
                            results
                        ),
                        items
                    )
                )
            },
            [[]],
            binCondSet
        )
    }


    function ask(x, e) {
        const vars = getAllItem()
        const result = {
            a: enuma(vars, R.append(x, e)),
            b: enuma(vars, R.append(R.assoc('state', !x.state, x), e))
        }
        return result.a/(result.a + result.b)
    }

    function calcProb(fact, knownFacts) {
        const items = findItemsByName(fact.name)
        const foundItemByKnownFacts = filterItemListOverKnownFacts(
            knownFacts,
            items
        )
        const item = R.head(foundItemByKnownFacts)
        if (item == undefined) return 1.0
        return fact.state == true ? item.probability : 1 - item.probability
    }

    function condProb(condition, over) {
        const items = filterItem(condition.name)
        const filtered = R.filter(
            item => R.equals(
                R.sortBy(
                    R.prop('name'),
                    R.prop('parents', item)
                ),
                R.sortBy(
                    R.prop('name'),
                    over
                )
            ),
            items
        )
        const item = R.head(filtered)
        return condition.state ? item.probability : 1 - item.probability
    }

    function filterItem(itemName) {
        return R.filter(
            R.propEq('name', itemName),
            set
        )
    }

    function filterItemListOverKnownFacts(knownFacts, itemList) {
        const sortedKnownFacts = R.sortBy(
            R.prop('name'),
            knownFacts
        )
        return R.filter(
            R.compose(
                R.equals(
                    R.__,
                    sortedKnownFacts
                ),
                R.compose(
                    R.sortBy(
                        R.prop('name')
                    ),
                    R.prop('parents')
                )
            ),
            itemList
        )
    }

    function findItemsByName(name) {
        return R.filter(
            R.propEq('name', name),
            set
        )
    }


    function fullJoint(conditions) {
        return multProbs(
            R.map(
                condition => {
                    return condProb(
                        condition,
                        filterConditionsByTargetParents(
                            condition,
                            conditions
                        )
                    )
                },
                conditions
            )
        )
    }

    function filterConditionsByTargetParents(target, conditions) {
        const requirements = getRequirements(target)
        return R.filter(
            condition => {
                return R.contains(
                    R.pick(
                        ['name'],
                        condition
                    ),
                    requirements
                )
            },
            conditions
        )
    }

    function getAllItem() {
        return R.uniq(
            R.map(
                R.pick(['name']),
                set
            )
        )
    }

    function getParents(condition) {
        return R.map(
            R.prop('parents'),
            filterItem(condition.name)
        )
    }

    function getRequirements(condition) {
        const items = filterItem(condition.name)
        const itemParents = R.prop(
            'parents',
            R.head(items) || {}
        )
        return R.map(R.pick(['name']), itemParents || [])
    }

    function getHidden(conditions) {
        return R.reject(
            condition => R.contains(
                condition,
                R.map(
                    R.pick(['name']),
                    conditions
                )
            ),
            R.uniq(
                R.map(
                    R.pick(['name']),
                    set
                )
            )
        )
    }

    function genFactListSatifiesKnownFacts(knownFacts) {
        const allItem = getAllItem()
        const knownItemNames = R.map(
            R.prop('name'),
            knownFacts
        )
        const allItemExceptKnownItem = R.reject(
            R.compose(
                R.contains(
                    R.__,
                    knownItemNames
                ),
                R.prop('name')
            ),
            allItem
        )
        const allItemExceptKnownItemStateList = R.map(
            item => R.map(
                R.assoc('state', R.__, item),
                [true, false]
            ),
            allItemExceptKnownItem
        )
        const allItemExceptKnownItemFactList = R.reduce(
            (factList, itemStateList) => R.unnest(
                R.map(
                    itemState => R.map(
                        fact => R.append(itemState, fact),
                        factList
                    ),
                    itemStateList
                )
            ),
            [[]],
            R.reverse(allItemExceptKnownItemStateList)
        )
        const allFactList = R.map(
            R.concat(R.__, knownFacts),
            allItemExceptKnownItemFactList
        )
        const allFactListSorted = R.map(
            R.sortBy(
                R.prop('name')
            ),
            allFactList
        )
        return allFactListSorted
    }

    function genFullJointListOfFactAndFactKnownFact(facts, knownFacts) {
        return [
            genFactListSatifiesKnownFacts(R.concat(facts, knownFacts)),
            genFactListSatifiesKnownFacts(knownFacts)
        ]
    }

    function infer(condition, knownConditions) {
        const filteredKnownConditions = R.reject(
            R.equals(condition),
            knownConditions
        )
        return R.divide(
            R.sum(
                R.map(
                    fullJoint,
                    R.map(
                        conditions => R.concat(
                            R.concat(
                                filteredKnownConditions,
                                conditions
                            ),
                            [condition]
                        ),
                        f(
                            R.map(
                                condition => [
                                    R.assoc('state', true, condition),
                                    R.assoc('state', false, condition)
                                ],
                                getHidden(R.append(condition, filteredKnownConditions))
                            )
                        )
                    )
                )
            ),
            R.sum(
                R.map(
                    fullJoint,
                    R.map(
                        conditions => R.unnest(R.append(filteredKnownConditions, conditions)),
                        f(
                            R.map(
                                condition => [
                                    R.assoc('state', true, condition),
                                    R.assoc('state', false, condition)
                                ],
                                getHidden(filteredKnownConditions)
                            )
                        )
                    )
                )
            )
        )
    }

    function inference(facts, knownFacts) {
        console.log([
            R.map(
                calcProb,
                genFactListSatifiesKnownFacts(R.concat(facts, knownFacts))
            ),
            R.map(
                calcProb,
                genFactListSatifiesKnownFacts(knownFacts)
            ),
        ])
        return .0
    }

    function multProbs(probabilities) {
        return R.reduce(
            R.multiply,
            1,
            probabilities
        )
    }

    function sumProbs(probabilities) {
        return R.sum()
    }

    function enuma(vars, e) {
        if (R.length(vars) == 0) {
            return 1.0
        }
        const Y = R.map(
            state => R.assoc(
                'state',
                state,
                R.head(vars)
            ),
            [true, false]
        )
        const y = R.head(
            R.map(
                y => R.find(
                    R.propEq('name', R.prop('name', y)),
                    e
                ),
                Y
            )
        )
        if (y) {
            return R.multiply(
                calcProb(y, filterConditionsByTargetParents(y, e)),
                enuma(
                    R.tail(vars),
                    e
                )
            )
        }
        else {
            return R.sum(
                R.map(
                    y => R.multiply(
                        calcProb(y, filterConditionsByTargetParents(y, e)),
                        enuma(
                            R.tail(vars),
                            R.append(y, e)
                        )
                    ),
                    Y
                )
            )
        }
    }

    function mMult(a, b) {
        return {
            operation: 'multiply',
            operands: [
                a,
                b
            ]
        }
    }

    function mSum(list) {
        return {
            operation: 'sum',
            operands: list
        }
    }


    return {
        ask,
        calcProb,
        condProb,
        filterItemListOverKnownFacts,
        findItemsByName,
        fullJoint,
        getAllItem,
        getHidden,
        getParents,
        genFactListSatifiesKnownFacts,
        genFullJointListOfFactAndFactKnownFact,
        infer,
        inference
    }
}

module.exports = bayesNetwork
