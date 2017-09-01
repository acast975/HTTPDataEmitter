var config = require('../config');
var request = require('request');

var notifier = {
    subscribers: config.SUBSCRIBERS,

    notify: function (data) {
        this.subscribers.forEach(function (subURL, i) {
            request({
                method: 'POST',
                uri: subURL,
                json: true,
                body: data
            }, function (err, res, body) {
                /*
                console.log('error:', err); // Print the error if one occurred
                console.log('statusCode:', res && res.statusCode); // Print the response status code if a response was received
                */
            });
        }, this);
    },


};

module.exports = notifier;