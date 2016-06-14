const socket = io.connect({path:'/socket.io'});

socket.on('socket', function(data){
  console.log(data);
});

export default socket;