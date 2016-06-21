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


    return {
        condProb,
        fullJoint,
        getHidden,
        getParents,
        infer
    }
}

module.exports = bayesNetwork
