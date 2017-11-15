const express = require('express')
const app = express()
const TelegramBot = require('node-telegram-bot-api')
const bot = new TelegramBot(process.env.TOKEN, {polling: true})
const calc = require('./calc')

var size, weight, load

bot.onText(/\/calc/, processCalc)

bot.onText(/\/help/, sendHelp)

bot.onText(/\/start/, sendStart)

function processCalc(msg) {
  sendSize(msg).then(function() {
    bot.once('message', function(msg) {
      size = parseInt(msg.text)
      sendWeight(msg).then(function() {
        bot.once('message', function(msg) {
          weight = calc.totalWeight(parseInt(msg.text))
          load = calc.load(weight, size)
          sendResult(msg, load)
        })
      })
    })
  })
}

function sendHelp(msg) {
  bot.sendMessage(msg.chat.id,
      'To start calculation please enter <b>/calc</b> command. \n' +
      'All values should be numeric only (integer).',
      {parse_mode: 'HTML'})
}

function sendStart(msg) {
  bot.sendMessage(msg.chat.id,
      'To start calculation please enter <b>/calc</b> command',
      {parse_mode: 'HTML'})
}

function sendWeight(msg) {
  return bot.sendMessage(msg.chat.id,
      'Please enter your weight <em>(kg)</em>',
      {parse_mode: 'HTML'})
}

function sendSize(msg) {
  return bot.sendMessage(msg.chat.id,
      'Please enter your canopy size <em>(sq ft)</em>',
      {parse_mode: 'HTML'})
}

function sendResult(msg, load) {
  return bot.sendMessage(msg.chat.id,
      'Your wing loading is <b>' + load.toFixed(2) + '</b>',
      {parse_mode: 'HTML'})
}

module.exports = app