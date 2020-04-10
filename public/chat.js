'use strict';

const socket = io();


document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  const inp = document.getElementById('m');
  const nick = document.getElementById('nick').value;
  socket.emit('chat message', {message: inp.value, name: nick});
  inp.value = '';
});

socket.on('chat message', (obj) => {
  const item = document.createElement('li');
  item.innerHTML = `${obj.name}: ${obj.message}`;
  document.getElementById('messages').appendChild(item);
});

socket.on('availablerooms', (rooms, current) => {
  let aRooms = document.getElementById('rooms');
  while(aRooms.firstChild) {
    aRooms.removeChild(aRooms.firstChild);
  }
  rooms.forEach((val) => {
    if (val === current) {
      let div = document.createElement('div');
      div.innerText = val;
      aRooms.append(div);
    } else {
      let div = document.createElement('div');
      let link = document.createElement('a');
      let text = document.createTextNode(val);
      link.appendChild(text);
      link.setAttribute('href', '#');
      div.appendChild(link);
      div.onclick = function () {
        switchRoom(val)
      };
      aRooms.append(div);
    }
  });
});

function switchRoom(room) {
  let messages = document.getElementById('messages');
  while (messages.firstChild){
    messages.removeChild(messages.firstChild);
  }
  socket.emit('switchroom', room);
}

