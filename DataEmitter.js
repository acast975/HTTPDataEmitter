var eventPipe = require('./src/EventPipe');
var DBReader = require('./src/DBReader');
var notifier = require('./src/Notifier');

eventPipe.on("newData", function (res) {
    notifier.notify(res);
});

DBReader.startReading();