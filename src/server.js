import express from 'express';
// import React from 'react';
// import { renderToString } from 'react-dom/server';
// import App from './App';

const server = express();

app.use(express.static("public"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve("./public", "index.html"));
});

server.listen(3000); 