const http = require('http');

const updateMatrix = (matrix) => {
  const post_data = JSON.stringify({ matrix });

  var req = http.request({
    hostname: 'pi',
    port: 8080,
    path: '/matrix',
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(post_data)
    }
  });
  req.write(post_data);
  req.end();
}

const sendMessage = (message) => {
  const post_data = JSON.stringify({
    message,
    speed: '0.05'
  });

  var req = http.request({
    hostname: 'pi',
    port: 8080,
    path: '/show',
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(post_data)
    }
  });
  req.write(post_data);
  req.end();
};

let timer = null;
let countdownValue = 0;
const startCountdown = () => {
  sendMessage('begin');
  countdownValue = 60;
  timer = setInterval(countdown, 1000);
}

const e = [0,0,0];
const countdown = () => {
  if (--countdownValue) {
    // Fill in the rows
    let matrix = [
      e, e, e, e, e, e, e, e,
      e, e, e, e, e, e, e, e,
      e, e, e, e, e, e, e, e,
      e, e, e, e, e, e, e, e,
      e, e, e, e, e, e, e, e,
      e, e, e, e, e, e, e, e,
      e, e, e, e, e, e, e, e,
      e, e, e, e, e, e, e, e,
    ];

    for (let i = 0; i < countdownValue; i++) {
      matrix[i] = [255, 255, 255];
    }

    updateMatrix(matrix);
  } else {
    clearInterval(timer);
  }
}

const cancel = () => {
  if (timer) {
    clearInterval(timer);
    let matrix = [
      e, e, e, e, e, e, e, e,
      e, e, e, e, e, e, e, e,
      e, e, e, e, e, e, e, e,
      e, e, e, e, e, e, e, e,
      e, e, e, e, e, e, e, e,
      e, e, e, e, e, e, e, e,
      e, e, e, e, e, e, e, e,
      e, e, e, e, e, e, e, e,
    ];
    updateMatrix(matrix);
  }
}

exports.sendMessage = sendMessage;
exports.startCountdown = startCountdown;
exports.cancel = cancel;
