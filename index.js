var tessel = require('tessel'); // import tessel

var led = {
  green : tessel.led[0].output(0), // output(1) -> Initial on
  blue  : tessel.led[1].output(0), // output(0) -> Initial off
} 

// baudrate must match the baudrate set in the Arduino file
uartBridge = tessel.port['D'].UART({baudrate: 9600}); 

uartBridge.on('data', function(data){
  var newValue = parseInt(data[0]);
  led.green.toggle();
});
