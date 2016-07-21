var R = require('ramda')

function bayesNetwork(set) {

    /* Ask a query x when e are known */
    function ask(x, e) {
        const vars = getAllItem()
        const result = {
            a: enuma(vars, R.append(x, e)),
            b: enuma(vars, R.append(R.assoc('state', !x.state, x), e))
        }
        return result.a/(result.a + result.b)
    }

    /* Calculate probability of fact over knownFacts */
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

    /* Filter out list element that isn't known */
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

    /* Find all item name's entry */
    function findItemsByName(name) {
        return R.filter(
            R.propEq('name', name),
            set
        )
    }

    /* Filter conditions that make target's parents */
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

    /* Retrieve all item from network */
    function getAllItem() {
        return R.uniq(
            R.map(
                R.pick(['name']),
                set
            )
        )
    }

    /* Get requirements for a  */
    function getRequirements(condition) {
        const items = findItemsByName(condition.name)
        const itemParents = R.prop(
            'parents',
            R.head(items) || {}
        )
        return R.map(R.pick(['name']), itemParents || [])
    }

    /* Solve query by enumeration */
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

    return {
        ask,
        calcProb,
        filterItemListOverKnownFacts,
        findItemsByName,
        getAllItem,
        getRequirements
    }
}

module.exports = bayesNetwork
