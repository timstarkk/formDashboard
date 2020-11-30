import express from 'express';
// import React from 'react';
// import { renderToString } from 'react-dom/server';
// import App from './App';

const server = express();

app.get("*", (req, res) => {
  res.sendFile(path.resolve("./", "index.html"));
});

server.listen(3000); 