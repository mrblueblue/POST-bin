import React from 'react';
import { Header } from './Header';
import { BinUrlView } from './BinUrlView';
import { BinContentsView } from './BinContentsView';
import FluxComponent from 'flummox/component';

export class BinInfoView extends React.Component {

  render(){
    let id = this.props.params.bin;
    let storage = this.props.storage;
    let requests = storage[id];
    return (
      <div style={{height: '90%'}}>
         <FluxComponent
            connectToStores={'bins'}
            render={ (storeState)=> <Header params={this.props.params} {...storeState}/> } />
          {
          storage[id].length ?
          <BinContentsView requests={requests}/> :
          <BinUrlView id={this.props.params.bin}/>
          }
      </div>
    );
  }
}

BinInfoView.contextTypes = {
  flux: React.PropTypes.object.isRequired,
  muiTheme: React.PropTypes.object.isRequired,
  router: React.PropTypes.func.isRequired
};
