'use strict';
const AWS = require("aws-sdk");
const BALANCE_TABLE = process.env.BALANCE_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();


module.exports.handler = async (event, context, callback) => {
  const params = {
    TableName: BALANCE_TABLE,
    Item: {
      balanceId: '2',
      price: 300,
    },
  };

  if(event.request.intent && event.request.intent.name === 'audio'){
    const response = {
      version: '1.0',
      response: {
        outputSpeech: {
          type: 'SSML',
          ssml: `
          <speak>
            pega a musica do big Maicon 
            <audio src="soundbank://soundlibrary/transportation/amzn_sfx_car_accelerate_01" /> 
          </speak>`,
        },
        shouldEndSessio: false,
      },
    };
  
    callback(null, response);
    return
  }
  
  if(event.request.intent && event.request.intent.slots){
    const data  =  event.request.intent.slots.saldo.value
    const response = {
      version: '1.0',
      response: {
        outputSpeech: {
          type: 'PlainText',
          text: `Oi Maicon isso é um teste ${data}`,
        },
        shouldEndSession: false,
      },
    };
  
    callback(null, response);
    return
  }

  const response = {
    version: '1.0',
    response: {
      outputSpeech: {
        type: 'PlainText',
        text: `Olá Maicon seja bem-vindo a skill minha binance`,
      },
      shouldEndSession: false,
    },
  };

  callback(null, response);
  
};
