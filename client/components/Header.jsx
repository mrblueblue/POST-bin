import React from 'react';
import mui from 'material-ui';

let AppBar = mui.AppBar;
let IconButton = mui.IconButton;
let DropDownIcon = mui.DropDownIcon;

export class Header extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    var iconMenuItems = [
          { payload: '1', text: 'Download' },
          { payload: '2', text: 'More Info' },
          { payload: '2', text: 'More Info' },
          { payload: '2', text: 'More Info' },
        ];  
    return (
      <AppBar
        title={this.props.params ? 'PostBin' : null}
        zDepth={0}
        iconElementLeft=
        {
          <DropDownIcon 
            iconClassName="muidocs-icon-navigation-expand-more" 
            menuItems={iconMenuItems}/>
        }
        iconElementRight=
        {
          <IconButton
            style={{marginRight: '20px'}}
            linkButton={true}
            href='https://github.com/levity-io/POST-bin/'
            iconClassName='muidocs-icon-custom-github'
            tooltip='GitHub'/>
        }
      />
    );
  }
}

Header.contextTypes = {
  flux: React.PropTypes.object.isRequired,
  muiTheme: React.PropTypes.object.isRequired
};
