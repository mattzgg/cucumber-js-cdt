const _ = require('lodash');
const beverages = require('./beverages');

let counter = 0;

function asOrderItem(itemExample) {
    return {
        beverage: beverages[_.toLower(itemExample.beverage)](),
        quantity: Number(itemExample.quantity),
    };
}

function toCamelCase(actionName) {
    return actionName
        .split(/\s+/)
        .map(function(word, i) {
            if (i === 0) {
                return word;
            }
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join('');
}

function actionFactoryFor(order) {
    return {
        removeItem(index) {
            return {
                action: 'remove-beverage',
                target: order.id,
                parameters: {
                    beverageRef: order.data[index].beverage.id,
                },
            };
        },
        editItemQuantity(index) {
            const item = order.data[index];
            return {
                action: 'edit-beverage',
                target: order.id,
                parameters: {
                    beverageRef: item.beverage.id,
                    newQuantity: item.quantity,
                },
            };
        },
        appendItem() {
            return {
                action: 'append-beverage',
                target: order.id,
                parameters: {
                    beverageRef: null,
                    quantity: 0,
                },
            };
        },
        placeOrder() {
            return {
                action: 'place-order',
                target: order.id,
            };
        },
    };
}

module.exports = {
    items(itemExamples) {
        return _.map(itemExamples.hashes(), asOrderItem);
    },
    empty() {
        return {
            id: '<empty order>',
            data: [],
        };
    },
    withItems(itemExamples) {
        counter += 1;
        return {
            id: `<non empty order ${counter}>`,
            data: this.items(itemExamples),
        };
    },
    actionsForOrderFrom(order, actionExamples) {
        const actionFactory = actionFactoryFor(order);
        return _.map(actionExamples.hashes(), actionExample => {
            const actionName = toCamelCase(actionExample.action);
            const forItem = actionExample['for item'];
            return actionFactory[actionName](Number(forItem) - 1);
        });
    },
};
