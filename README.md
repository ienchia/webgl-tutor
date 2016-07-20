# Environment Variables

## Backend

**DATABASE_NAME** = database

**DATABASE_USER** = root

**DATABASE_PASS** = *none*

**DATABASE_HOST** = 127.0.0.1

**DATABASE_PORT** = 3306

## Frontend

**API_URL** = *none*

# Implementation

## Pseudocode for Answering Bayesian Network query

```
FUNCTION answer(condition, known_facts):
    INPUT
        condition: name of node with state is true
        known_facts: a collection of node and state that is currently known
        all_nodes: a collection of nodes in the network

    RETURN
        enumerate(condition, known_facts)
        DIVIDE BY
        (enumerate(condition, known_facts) + enumerate(NEGATE condition, known_facts))

FUNCTION enumerate(nodes, known_facts):
    INPUT
        nodes:
        known_facts:

    IF nodes LENGTH IS LESS THAN 1
    THEN RETURN 1.0

    lET Y IS possible states OF FIRST(nodes)
        LET y IS A SUBSET OF Y
            IF y IS IN known_facts
            THEN RETURN
                probability(y over Parents(y over known_facts))
                MULTIPLY
                enumerate(REST OF nodes, known_facts)
            ELSE THEN RETURN
                probability(y over Parents(y over known_facts))
                MULTIPLY
                enumerate(REST OF nodes, known_facts APPENDED WITH y)

```
