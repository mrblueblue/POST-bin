import React from 'react';
import { RouteHandler } from 'react-router';
import FluxComponent from 'flummox/component';

export class App extends React.Component {
  render(){
    return (
      <FluxComponent
        connectToStores={'bins'}
        render={(state) => <RouteHandler {...state}/>} />
    );
  }
}
