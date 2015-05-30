import React from 'react';
import mui from 'material-ui';
import { Header } from './Header';
import FluxComponent from 'flummox/component';
import { api } from '../utils/api';

let RaisedButton = mui.RaisedButton;

let styles = {
  paperContainer: {
    padding: '20px 20px'
  },
  textContainer: {
    display: 'flex',
    'flex-direction': 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    display: 'flex',
    'flex-direction': 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '75px'
  },

  gitButton: {
    marginLeft: '10px',
    height: '100%',
    display: 'inline-block',
    verticalAlign: 'middle',
    float: 'left',
    paddingLeft: '12px',
    lineHeight: '36px'
  }
};

export class HomeView extends React.Component {

  constructor(props){
    super(props);
  }

  componentWillMount(){
    api.getBins();
    api.initializeSocket();
  }

  render() {
    return (
      <div style={{
        display: 'flex', 'flex-direction': 'column', height: '100%', 'background-color': '#00bcd4', alignItems: 'center', justifyContent: 'space-between'}}>
        <FluxComponent
          connectToStores={'bins'}
          render={ (storeState)=> <Header {...storeState}/> } />
        <img style={{display: 'flex', width: '250px'}} src="http://i.imgur.com/nmuwpIW.png" />
        <div style={styles.paperContainer} >
          <div style={styles.textContainer}>
              <h1 style={{color: 'white', fontSize: '40px', flex: 2}}>POSTBIN</h1>
            <p style={{margin: '50px 50px', fontSize: '20px', color: 'white'}}>Save and Inspect POST Requests</p>
          </div>
          <div style={styles.buttonContainer}>
            <RaisedButton
              primary={true}
              label='Create'
              onClick={this.handleClick.bind(this)} />
          </div>
        </div>
      </div>
    );
   }

   handleClick(){
    api.getNewBinId()
      .then((id) => {
        this.context.flux.getActions('bins').newBin(id);
        this.context.flux.getActions('bins').addListener(id);
        this.context.router.transitionTo(`/${id}`);
      });
   }
}

HomeView.contextTypes = {
  flux: React.PropTypes.object.isRequired,
  muiTheme: React.PropTypes.object.isRequired,
  router: React.PropTypes.func.isRequired
};
