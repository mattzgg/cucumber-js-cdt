import { Given, When, Then } from 'cucumber';
import { expect } from 'chai';
import orders from '../support/orders';

const thereWillBePossibleTo = function(actionExamples) {
    const expectedActions = orders.actionsForOrderFrom(this.order, actionExamples);
    return expect(this.result)
        .to.eventually.have.property('actions')
        .that.have.length(expectedActions.length)
        .and.that.deep.include.members(expectedActions);
};

Given('that the order contains:', function(itemExamples) {
    this.order = this.orderStorage.alreadyContains(orders.withItems(itemExamples));
});

When('the customer displays the order', function() {
    this.result = this.orderSystem.display(this.order.id);
});

Then('there will be possible to:', function(actionExamples) {
    return thereWillBePossibleTo.call(this, actionExamples);
});

Given('that the order is empty', function() {
    this.order = this.orderStorage.alreadyContains(orders.empty());
});

Then('there will only be possible to add a beverage', function() {
    const actionExamples = this.createDataTable([
        {
            action: 'append item',
            'for item': null,
        },
    ]);
    return thereWillBePossibleTo.call(this, actionExamples);
});
