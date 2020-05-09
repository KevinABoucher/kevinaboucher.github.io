let localConnection;
let remoteConnection;
let sendChannel;
let receiveChannel;
let isSender = true;
const statusMessage = document.querySelector('span#status');
const connected = document.querySelector('#connected');
const disconnected = document.querySelector('#disconnected');

window.onbeforeunload = function () {
    if (isSender) {
        sendMessage({'senderConnected': false});
    } else {
        sendMessage({'receiverConnected': false});
    }
}

function createUUID() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}

// Generate random room name if needed
if (!location.hash) {
    location.hash = createUUID();
    isSender = true;
} else {
    isSender = false;
}
const roomHash = location.hash.substring(1);

// ScaleDrone channel ID
const drone = new ScaleDrone('wIgZw1kjawi9SWtj');
// Room name needs to be prefixed with 'observable-'
const roomName = 'observable-' + roomHash;
const configuration = {
    iceServers: [{
        urls: 'stun:stun.l.google.com:19302'
    }]
};
let room;
let pc;


function onSuccess() {};
function onError(error) {
    console.error(error);
};

drone.on('open', error => {
    if (error) {
        return console.error(error);
    }
    room = drone.subscribe(roomName);
    room.on('open', error => {
        if (error) {
          onError(error);
        }
    });
    // We're connected to the room and received an array of 'members'
    // connected to the room (including us). Signaling server is ready.
    room.on('members', members => {
        console.log('MEMBERS', members);
        // If we are the second user to connect to the room we will be creating the offer
        const isOfferer = members.length === 2;
        startWebRTC(isOfferer);
        if (!isSender) {
          sendMessage({'receiverConnected': true});
        }
    });
});

// Send signaling data via Scaledrone
function sendMessage(message) {
    drone.publish({
        room: roomName,
        message
    });
}

function startWebRTC(isOfferer) {
    pc = new RTCPeerConnection(configuration);

    // 'onicecandidate' notifies us whenever an ICE agent needs to deliver a
    // message to the other peer through the signaling server
    pc.onicecandidate = event => {
        if (event.candidate) {
            sendMessage({'candidate': event.candidate});
        }
    };

    // If user is offerer let the 'negotiationneeded' event create the offer
    if (isOfferer) {
        pc.onnegotiationneeded = () => {
            pc.createOffer().then(localDescCreated).catch(onError);
        }
    }

    // When a remote stream arrives display it in the #remoteVideo element
    pc.ontrack = event => {
        const stream = event.streams[0];
        if (!remoteVideo.srcObject || remoteVideo.srcObject.id !== stream.id) {
            remoteVideo.srcObject = stream;
        }
    };

    navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        }).then(stream => {
            // Display your local video in #localVideo element
            localVideo.srcObject = stream;
            // Add your stream to be sent to the conneting peer
            stream.getTracks().forEach(track => pc.addTrack(track, stream));
        }, onError);

    // Listen to signaling data from Scaledrone
    room.on('data', (message, client) => {
        // Message was sent by us
        if (client.id === drone.clientId) {
            return;
        }

        if (message.sdp) {
            // This is called after receiving an offer or answer from another peer
            pc.setRemoteDescription(new RTCSessionDescription(message.sdp), () => {
                // When receiving an offer lets answer it
                if (pc.remoteDescription.type === 'offer') {
                    pc.createAnswer().then(localDescCreated).catch(onError);
                }
            }, onError);
            console.log('Offer');
        } else if (message.candidate) {
            // Add the new ICE candidate to our connections remote description
            pc.addIceCandidate(new RTCIceCandidate(message.candidate), onSuccess, onError);
            console.log('ICE');
        } else if (message.newGame) {
            reset(); // Clear for new game
        } else if (message.tic) {
            tic(message.tic); // tic
        } else if (message.createDataConnection) {
            createDataConnection(false);
        } else if (message.receiverConnected) {
            setConnected(true);
            sendMessage({'senderConnected': true});
        } else if (message.senderConnected) {
            setConnected(true);
        } else if (message.receiverConnected === false) {
            setConnected(false);
        } else if (message.senderConnected === false) {
            setConnected(false);
        } 
    });
}

function setConnected(isConnected) {
    if (isConnected) {
        connected.style.display = 'block';
        disconnected.style.display = 'none';
    } else {
        connected.style.display = 'none';
        disconnected.style.display = 'block';
    }
}

function localDescCreated(desc) {
    pc.setLocalDescription(
        desc,
        () => sendMessage({'sdp': pc.localDescription}),
        onError
    );
    if (!isSender) {
      pc.addEventListener('datachannel', receiveChannelCallback);
    }
}

/////////// GAME ///////////
var val = true;

function onTic(id) {
  sendMessage({'tic': id});
  tic(id);
}

function tic(id) {
  var current = document.getElementById(id);
  if (current.innerHTML !== '') return;
  val ? current.innerHTML = 'X' : current.innerHTML = 'O';
  val = !val;
  if (checkWinner()) {
    document.getElementById('status').innerHTML = 'Winner, winner, chicken dinner!';
  }
}

function checkWinner() {
  if (checkSet(1, 2, 3)) return true;
  if (checkSet(4, 5, 6)) return true;
  if (checkSet(7, 8, 9)) return true;
  if (checkSet(1, 4, 7)) return true;
  if (checkSet(2, 5, 8)) return true;
  if (checkSet(3, 6, 9)) return true;
  if (checkSet(1, 5, 9)) return true;
  if (checkSet(3, 5, 7)) return true;

  return false;
}

function checkSet(a, b, c) {
  if (document.getElementById(a).innerHTML === '' &&
      document.getElementById(b).innerHTML === '' &&
      document.getElementById(c).innerHTML === '') {
    return false;
  }

  return document.getElementById(a).innerHTML === document.getElementById(c).innerHTML &&
         document.getElementById(b).innerHTML === document.getElementById(c).innerHTML;
}

function newGame() {
  sendMessage({'newGame': true});
  reset();
}

function reset() {
  for(i=1; i<10; i++) {
    document.getElementById(i).innerHTML = '';
  }
  document.getElementById('status').innerHTML = '';
}