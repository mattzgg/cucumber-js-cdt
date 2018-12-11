import { setWorldConstructor } from 'cucumber';
import createDataTable from '../../index';
import newStorage from './storageDouble';
import orderSystemWith from '../SuT/orders';

function CustomWorld() {
    this.orderStorage = newStorage();
    this.messageStorage = newStorage();
    this.orderSystem = orderSystemWith(this.orderStorage.dao(), this.messageStorage.dao());
    this.dataTable = function(examples) {
        return createDataTable(examples);
    };
}

setWorldConstructor(CustomWorld);
