/*const os = require('os');
var npm = require('npm');
if(os.arch()=== 'arm')
{
  
    npm.load(function(err) {
      // handle errors
    
      // install module ffi
      npm.commands.install(['i2c@0.2.1','nrf@0.8.3','rpi-dht-sensor@0.1.1'], function(er, data) {
        // log errors or data
      });
    
      npm.on('log', function(message) {
        // log installation progress
        console.log(message);
      });
    });
}

*/