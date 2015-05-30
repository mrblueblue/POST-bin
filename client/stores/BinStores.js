import { Store } from 'flummox';
import { api } from '../utils/api';

export class BinStores extends Store {

  constructor(flux){
    super();
    const BinActions = flux.getActions('bins');
    this.register(BinActions.newBin, this.handleNewBin);
    this.register(BinActions.addListener, this.handleListener);
    this.state = {storage: {}};
  }

  handleNewBin(id){
    let storage = this.state.storage;
    storage[id] = [];
    this.setState(storage);
  }

  handleListener(id){
    api.createSocketListener(id, this.addPostToBin.bind(this) );
  }

  addPostToBin(id, post){
    let storage = this.state.storage;
    let bin = storage[id];

    if (bin.length > 14) {
      bin.pop();
    }

    bin.unshift(post);
    this.setState(storage);
  }
}
