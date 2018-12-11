Feature: Customer displays order

    In order to review the contents of my order and its price easily
    As a Customer
    I want to display the order

    Scenario: Order is empty
        Given that the order is empty
        When the customer displays the order
        Then there will only be possible to add a beverage

    Scenario: Non empty order
        Given that the order contains:
            | beverage  | quantity |
            | Espresso  | 1        |
            | Mocaccino | 2        |
        When the customer displays the order
        Then there will be possible to:
            | action             | for item |
            | place order        |          |
            | append item        |          |
            | edit item quantity | 1        |
            | remove item        | 1        |
            | edit item quantity | 2        |
            | remove item        | 2        |