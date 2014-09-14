var request = require('request');
var tessel = require('tessel');

var led = {
  green : tessel.led[0].output(0), // output(1) -> Initial on
  blue  : tessel.led[1].output(0), // output(0) -> Initial off
}

// baudrate must match the baudrate set in the Arduino file
uartBridge = tessel.port['D'].UART({baudrate: 9600}); 

uartBridge.on('data', function(data) {
  var newValue = parseInt(data[0]);

  led.green.toggle();
  
  var url = 'https://graph.api.smartthings.com/api/smartapps/installations/40f0fc12-7ea9-4b62-86e7-30588c71df64/babyincradle';
  request({
    url: url,
    method: 'PUT',
    headers: { "Authorization": "Bearer 8b35f1bd-d58d-41a2-89b1-4c4608fa4e54" },
    body: { 'isPressure': newValue },
    json: true,
    timeout: 1000
  }, function(err, resp, body) {
    if (err) {
      console.log(err);
    } else {
      console.log(resp.statusCode);
    }
  });
});

