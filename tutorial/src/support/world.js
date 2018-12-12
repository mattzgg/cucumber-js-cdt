import { setWorldConstructor } from 'cucumber';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import createDataTable from '../../../lib/index';
import orderSystemWith from '../SuT/orders';
import newStorage from './storageDouble';

chai.use(sinonChai);
chai.use(chaiAsPromised);

function CustomWorld() {
    this.orderStorage = newStorage();
    this.orderSystem = orderSystemWith(this.orderStorage.dao());
    this.createDataTable = createDataTable;
}

setWorldConstructor(CustomWorld);
