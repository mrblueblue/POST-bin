import React from 'react';

let styles = {

  linkContainer: {
    'background-color': '#00bcd4',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    'flex-direction': 'column'
  },

  linkInputField: {
    'padding': '40px 80px',
    'max-width': '80%',
    'width': '400px',
    border: 'solid',
    'border-radius': '1px',
    outline: 'none',
    'background-color': 'transparent',
    color: 'white',
    font: 'inherit',
    fontSize: '30px'
  }
};

export class BinUrlView extends React.Component {
  render(){
    return (
      <div style={styles.linkContainer}>
        <input
          style={styles.linkInputField}
          type="text"
          value={`http://postbin.link/${this.props.id}`}/>
        <p style={{color: 'white', marginBottom: '100px'}}>
          POST to your URL
        </p>
      </div>
    );
  }
}
