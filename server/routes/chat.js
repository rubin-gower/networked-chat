const express = require('express')
const router = express.Router()
const http = require("http")
const WebSocket = require("ws")
//import * as WebSocket from 'ws';

const db = require("../../db/db")

let thechat = ["hello", "hi there"]

router.get("/", (req, res) => {
    res.send(thechat)
})

router.post("/", (req, res) => {
    console.log(req.body)
})

