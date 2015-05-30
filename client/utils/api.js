let host = location.origin;
let socket = io.connect(host);

export const api = {

  // will be used when DB is created or local storage used
  getBins: function(){
    // fetch('127.0.0.1:8090/', {mode: 'cors'})
    //   .then(()=>{console.log('getBins')})
    //   .catch()
  },

  // for testing
  initializeSocket: function(){
    socket.emit('my other event', {message : 'Hello from REACT'});
  },

  createSocketListener: function(id, action){
    socket.on(id, function(data){
      action(id, data);
    });
  },

  getNewBinId: function(){
    return fetch(`${host}/binid`)
      .then((id) => {return id.text()})
      .then((id) => {return id})
      .catch((e) => {console.log('Error', e)})
  }
}
