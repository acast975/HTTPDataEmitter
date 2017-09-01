var config = require('../config');
var mysql = require('mysql');
var DB = require('./DB');
var eventPipe = require('./EventPipe');

var reader = {
    substations: config.SUBSTATIONS,

    startReading : function () {
        //initialize starting data_history.id for each substation
        this.substations.forEach(function (sub, i) {
            this.substations[i].currentID = 0;
        }, this);
        DB.connect();

        //initialize loop for each substation
        this.substations.forEach(function (substation) {
            this.loop(substation, this);
        }, this);
    },

    loop: function (substation, context) {
        DB.query('SELECT * FROM DATA_HISTORY ' +
            'WHERE `ID` >= '+ substation.currentID +
            ' AND `LOCATION_ID` = '+substation.id+'' +
            ' ORDER BY ID ASC LIMIT 1',
            function (err, res, fields) {
                if (err) throw err;

                if (!context.shouldSkip(substation.chanceToSkip)) {
                    res = context.transformRow(res[0]);
                    //console.log(res.ID, res.LOCATION_ID, res.READ_TIME);

                    //fire event with read data
                    eventPipe.emit("newData", res);
                    //increment primary key
                    substation.currentID = res.ID + 1;
                    //call the function once again
                }
                setTimeout(context.loop, substation.frequency*1000, substation, context);
            });
    },


    /**
     * Sets a current datetime (overwrites the one from the DB);
     *
     * @param row
     */
    transformRow : function (row) {
        row.READ_TIME = new Date().toISOString();
        return row;
    },

    shouldSkip: function (chance) {
        return Math.random() < chance;
    }
};

module.exports = reader;