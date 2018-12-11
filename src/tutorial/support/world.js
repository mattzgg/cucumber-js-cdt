const { setWorldConstructor } = require('cucumber');
const createDataTable = require('@mattzgg/cucumber-js-cdt');
const newStorage = require('./storageDouble');
const orderSystemWith = require('../../lib/orders');

function CustomWorld() {
    this.orderStorage = newStorage();
    this.messageStorage = newStorage();
    this.orderSystem = orderSystemWith(this.orderStorage.dao(), this.messageStorage.dao());
    this.dataTable = function(examples) {
        return createDataTable(examples);
    };
}

setWorldConstructor(CustomWorld);
