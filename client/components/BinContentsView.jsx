import React from 'react';
import mui from 'material-ui';
import stringify from 'json-stringify-pretty-compact';

let Paper = mui.Paper;

export class BinContentsView extends React.Component {

  render(){
    let styles = {
      paperContainer: {
        margin: '15px 45px'
      },
      cyanBack: {
        'background-color': '#00bcd4'
      },
      paperContents: {
        padding: '20px 20px',
        'background-color': '#f9f9f9',
        color: '#444444',
      },
      rowFlex: {
        display: 'flex',
        flexDirection: 'row'
      }
    };

    return (
      <div style={styles.cyanBack}>
        {
          this.props.requests.map((req)=> {
            return (
              <Paper style={styles.paperContainer} zDepth={3} rounded={true}>
                <PaperHeader req={req} />
                <div style={styles.paperContents}>
                  <div style={styles.rowFlex}>
                  <RequestParams parameters={req.params} />
                  <RequestHeaders headers={req.headers} />
                  </div>
                  <RequestBody body={req.body} />
                </div>
              </Paper>
            );
          })
        }
      </div>
    );
  }
}

BinContentsView.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

class PaperHeader extends React.Component {

  getStyles(){
    let styles = {
      rowContainer: {
        display: 'flex',
        flexDirection: 'row',
        'background-color': '#EEEEEE',
        color: '#444444',
        padding: '20px 20px',
        fontSize: '14px'
      },
      columnContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 20em'
      }
    };
    return styles;
  }

  render(){
    let req = this.props.req;
    let styles = this.getStyles();
    return (
      <div style={styles.rowContainer}>
        <div style={{display: 'flex', flexDirection: 'column', flex: '2 2 30em'}}>
          <span>http://postbin.link</span>
          <span><span style={{'font-weight': 'bold'}}>POST</span> {req.url.substring(0, 9)}</span>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', flex: '2 2 30em'}}>
          <span>{req.headers['content-type']}</span>
          <span>{req.bytes} bytes</span>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', flex: '1 1 20em', 'alignItems': 'flex-end'}}>
          <span>{req.time}</span>
          <span>from {req.from}</span>
        </div>
      </div>
    );
  }
}

class RequestHeaders extends React.Component {
  render() {
    return (
      <div>
        <h3>HEADERS</h3>
        <ul style={{'list-style-type': 'none', 'padding-left': 0}}>
        {
          Object.keys(this.props.headers).map((entry)=>{
            return (
              <li>
                <code>
                <span style={{'font-weight': 'bold'}}>{entry}</span> : {this.props.headers[entry]}
                </code>
              </li>
            );
          })
        }
        </ul>
      </div>
    );
  }
}

class RequestBody extends React.Component {
  render(){
    return (
      <div style={{flex: '1 1 20em'}}>
        <h3>BODY RAW</h3>
        <pre>
          <code>
          {stringify(this.props.body, {maxLength: 30, indent: 2})}
          </code>
        </pre>
        <h3>STRING</h3>
        <pre>
          <code>
          {JSON.stringify(this.props.body)}
          </code>
        </pre>
      </div>
    );
  }
}

class RequestParams extends React.Component {
  render(){
    return (
      <div style={{flex: '2 2 60em'}}>
        <h3>PARAMS</h3>
        <code>{stringify(this.props.parameters, {maxLength: 30, indent: 2})}</code>
      </div>
    );
  }
}
