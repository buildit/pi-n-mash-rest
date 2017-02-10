var express = require('express');
var app = express();

let activeSession = null;
let sessionTimeout = null;

const killSession = () => {
  if (sessionTimeout) {
    clearTimeout(sessionTimeout);
  }

  if (activeSession) {
    activeSession = null;
    console.log('killing session');
  } else {
    console.log('no session');
  }
};

const startSession = () => {
  console.log('starting session');
  activeSession = {
    user: null,
    fingerprint: false,
    voice: false,
    face: false
  };
  sessionTimeout = setTimeout(() => {
    if (isAuthenticated(activeSession)) {
      console.log('timer expired, session active');
    } else {
      console.log('session time out');
      killSession();
    }
  }, 1200000);
  console.log('session started');
};

const isAuthenticated = (session) => {
  return (session && session.fingerprint && session.voice && session.face);
};

const isSessionValid = (session, user) => {
  if (session && user) {
    if (session.user === null) {
      session.user = user;
      return true;
    }
    return session.user === user;
  }
  return false;
};

app.post('/api/auth/fingerprint/:user', (req, res) => {
  const user = req.params.user;
  console.log(`received fingerprint auth request for: ${user}`);
  if (isSessionValid(activeSession, user)) {
    activeSession.fingerprint = true;
    console.log(`fingerprint authenticated for: ${user}`);
  }
  res.sendStatus(200);
});

app.post('/api/auth/voice/:user', (req, res) => {
  const user = req.params.user;
  console.log(`received voice auth request for: ${user}`);
  if (isSessionValid(activeSession, user)) {
    activeSession.voice = true;
    console.log(`voice authenticated for: ${user}`);
  } else {
    console.log(`no session for: ${user}`);
  }
  res.sendStatus(200);
});

app.post('/api/auth/face/:user', (req, res) => {
  const user = req.params.user;
  console.log(`received face auth request for: ${user}`);
  if (isSessionValid(activeSession, user)) {
    activeSession.face = true;
    console.log(`face authenticated for: ${user}`);
  } else {
    console.log(`no session for: ${user}`);
  }
  res.sendStatus(200);
});

app.post('/api/auth/motion', (req, res) => {
  console.log(`received motion auth request`);
  if (!activeSession) {
    startSession();
  }
  res.sendStatus(200);
});

app.get('/api/auth/:user', (req, res) => {
  if (isSessionValid(activeSession, req.params.user) && isAuthenticated(activeSession) ) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

app.delete('/api/auth', (req, res) => {
  killSession();
  res.sendStatus(200);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
