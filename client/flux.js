import { Flummox } from 'flummox';
import { BinActions } from './actions/BinActions';
import { BinStores } from './stores/BinStores';

class Flux extends Flummox {

  constructor(){
    super();

    this.createActions('bins', BinActions);
    this.createStore('bins', BinStores, this);
  }
}

export const flux = new Flux();
