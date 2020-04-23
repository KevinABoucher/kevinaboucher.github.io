let localConnection;
let remoteConnection;
let sendChannel;
let receiveChannel;
let fileReader;
let receiveBuffer = [];
let receivedSize = 0;
let bytesPrev = 0;
let timestampPrev = 0;
let timestampStart;
let statsInterval = null;
let file;
let isSender = true;
const bitrateDiv = document.querySelector('div#bitrate');
const fileInput = document.querySelector('input#fileInput');
const abortButton = document.querySelector('button#abortButton');
const downloadAnchor = document.querySelector('a#download');
const sendProgress = document.querySelector('progress#sendProgress');
const receiveProgress = document.querySelector('progress#receiveProgress');
const statusMessage = document.querySelector('span#status');
const sendFileButton = document.querySelector('button#sendFile');
const sendDiv = document.querySelector('div#sendDiv');
const receiveDiv = document.querySelector('div#receiveDiv');
const instructionsDiv = document.querySelector('div#instructionsDiv');
const sendStatusDiv = document.querySelector('div#sendStatusDiv');
const connected = document.querySelector('#connected');
const disconnected = document.querySelector('#disconnected');
const chunkSize = 1024 * 16;

function copyUrl() {
    var input = document.createElement('input');
    input.setAttribute('value', document.location.href);
    document.body.appendChild(input);
    input.select();
    var result = document.execCommand('copy');
    document.body.removeChild(input);
    return result;
}

window.onbeforeunload = function () {
    if (isSender) {
        sendMessage({'senderConnected': false});
    } else {
        sendMessage({'receiverConnected': false});
    }
}

sendFileButton.addEventListener('click', () => createDataConnection(true));

fileInput.addEventListener('change', handleFileInputChange, false);

abortButton.addEventListener('click', () => {
  if (fileReader && fileReader.readyState === 1) {
    console.log('Abort read!');
    fileReader.abort();
  }
});

async function handleFileInputChange() {
  file = fileInput.files[0];
  sendProgress.value = 0;
  receiveProgress.value = 0;

  if (!file) {
    console.log('No file chosen');
  } else {
    sendFileButton.disabled = false;
  }
}

async function createDataConnection(propagate) {
  sendChannel = pc.createDataChannel('sendDataChannel');
  sendChannel.binaryType = 'arraybuffer';
  console.log('Created send data channel');

  if (propagate) {
    sendChannel.addEventListener('open', onSendChannelStateChange);
    sendChannel.addEventListener('close', onSendChannelStateChange);
    sendChannel.addEventListener('error', error => console.error('Error in sendChannel:', error));
    sendMessage({'createDataConnection': true});
  }
}

async function onSendChannelStateChange() {
  const readyState = sendChannel.readyState;
  console.log(`Send channel state is: ${readyState}`);
  if (readyState === 'open') {
    console.log('data channel open, sending file info');
    sendMessage({'file': { name: file.name, size: file.size, type: file.type, lastModified: file.lastModified }});
  }
}

function sendData() {
  console.log(`File is ${[file.name, file.size, file.type, file.lastModified].join(' ')}`);

  // Handle 0 size files.
  statusMessage.textContent = '';
  downloadAnchor.textContent = '';
  if (file.size === 0) {
    bitrateDiv.innerHTML = '';
    statusMessage.textContent = 'File is empty, please select a non-empty file';
    closeDataChannels();
    return;
  }
  sendProgress.max = file.size;
  receiveProgress.max = file.size;
  fileReader = new FileReader();
  let offset = 0;
  fileReader.addEventListener('error', error => console.error('Error reading file:', error));
  fileReader.addEventListener('abort', event => console.log('File reading aborted:', event));
  fileReader.addEventListener('load', e => {
    // console.log('FileRead.onload ', e);
    sendChannel.send(e.target.result);
    offset += e.target.result.byteLength;
    sendProgress.value = offset;
    if (offset < file.size) {
      readSlice(offset);
    } else {
      sendStatusDiv.innerHTML = `<strong>File sent successfully:</strong> ${file.name} (${file.size} bytes)`;
    }
  });
  const readSlice = o => {
    // console.log('readSlice ', o);
    const slice = file.slice(offset, o + chunkSize);
    fileReader.readAsArrayBuffer(slice);
  };
  readSlice(0);
}

function sleep(milliseconds) { 
    let timeStart = new Date().getTime(); 
    while (true) { 
        let elapsedTime = new Date().getTime() - timeStart; 
        if (elapsedTime > milliseconds) { 
            break; 
        } 
    } 
} 

function closeDataChannels() {
  console.log('Closing data channels');
  if (sendChannel) {
    sendChannel.close();
    console.log(`Closed data channel with label: ${sendChannel.label}`);
  }
  if (receiveChannel) {
    receiveChannel.close();
    console.log(`Closed data channel with label: ${receiveChannel.label}`);
  }
  if (localConnection) {
    localConnection.close();
  }
  if (remoteConnection) {
    remoteConnection.close();
  }
  localConnection = null;
  remoteConnection = null;
  console.log('Closed peer connections');

  // re-enable the file select
  fileInput.disabled = false;
  abortButton.disabled = true;
  sendFileButton.disabled = false;
}

async function gotLocalDescription(desc) {
  await localConnection.setLocalDescription(desc);
  console.log(`Offer from localConnection\n ${desc.sdp}`);
  await remoteConnection.setRemoteDescription(desc);
  try {
    const answer = await remoteConnection.createAnswer();
    await gotRemoteDescription(answer);
  } catch (e) {
    console.log('Failed to create session description: ', e);
  }
}

async function gotRemoteDescription(desc) {
  await remoteConnection.setLocalDescription(desc);
  console.log(`Answer from remoteConnection\n ${desc.sdp}`);
  await localConnection.setRemoteDescription(desc);
}

function receiveChannelCallback(event) {
  console.log('Receive Channel Callback');
  receiveChannel = event.channel;
  receiveChannel.binaryType = 'arraybuffer';
  receiveChannel.onmessage = onReceiveMessageCallback;
  receiveChannel.onopen = onReceiveChannelStateChange;
  receiveChannel.onclose = onReceiveChannelStateChange;

  receivedSize = 0;
  downloadAnchor.textContent = '';
  downloadAnchor.removeAttribute('download');
  if (downloadAnchor.href) {
    URL.revokeObjectURL(downloadAnchor.href);
    downloadAnchor.removeAttribute('href');
  }
}

function onReceiveMessageCallback(event) {
  //console.log(`Received Message ${event.data.byteLength}`);
  receiveBuffer.push(event.data);
  receivedSize += event.data.byteLength;

  receiveProgress.value = receivedSize;

  // file object is set through ScaleDrone message
  if (receivedSize === file.size) {
    const received = new Blob(receiveBuffer);
    receiveBuffer = [];

    downloadAnchor.href = URL.createObjectURL(received);
    downloadAnchor.download = file.name;
    downloadAnchor.textContent =
      `Click to download '${file.name}' (${file.size} bytes)`;
    downloadAnchor.style.display = 'block';

    const bitrate = Math.round(receivedSize * 8 /
      ((new Date()).getTime() - timestampStart));
    bitrateDiv.innerHTML =
      `<strong>Average bitrate:</strong> ${bitrate} kbits/sec`;

    if (statsInterval) {
      clearInterval(statsInterval);
      statsInterval = null;
    }

    closeDataChannels();
  }
}

async function onReceiveChannelStateChange() {
  const readyState = receiveChannel.readyState;
  console.log(`Receive channel state is: ${readyState}`);
  if (readyState === 'open') {
    timestampStart = (new Date()).getTime();
    timestampPrev = timestampStart;
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function createUUID() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}

// Generate random room name if needed
if (!location.hash) {
    location.hash = createUUID();
    receiveDiv.style.display = 'none';
    isSender = true;
} else {
    sendDiv.style.display = 'none';
    instructionsDiv.style.display = 'none';
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

    // navigator.mediaDevices.getUserMedia({
    //         audio: true,
    //         video: true,
    //     }).then(stream => {
    //         // Display your local video in #localVideo element
    //         localVideo.srcObject = stream;
    //         // Add your stream to be sent to the conneting peer
    //         stream.getTracks().forEach(track => pc.addTrack(track, stream));
    //     }, onError);

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
        } else if (message.file) {
            // set file info to receive
            file = message.file;
            sendProgress.value = 0;
            receiveProgress.value = 0;
            receiveProgress.max = file.size;
            bitrateDiv.innerHTML = `<strong>Receiving:</strong> ${file.name} (${file.size} bytes)`;
            sendMessage({'sendFile': true}); // tell the other end we got the file metadata, and OK to send
        } else if (message.sendFile) {
            sendData(); // OK to send file
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
    // if (!isSender) {
      pc.addEventListener('datachannel', receiveChannelCallback);
    // }
}
