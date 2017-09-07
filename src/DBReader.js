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

        //initialize loop for each substation
        this.substations.forEach(function (substation) {
            this.loop(substation, this);
        }, this);
    },

    loop: function (substation, context) {
        DB.getConnection(function(err, conn) {
            if (err) {
                console.log(err);
                callback(true);
                return;
            }

            conn.query('SELECT * FROM DATA_HISTORY ' +
                'WHERE `ID` >= '+ substation.currentID +
                ' AND `LOCATION_ID` = '+substation.id+'' +
                ' ORDER BY ID ASC LIMIT 1',
                function (err, res, fields) {
                    if (err) throw err;

                    if (!context.shouldSkip(substation.chanceToSkip)) {
                        if (res[0]) {
                            res = context.transformRow(res[0]);
                            //fire event with read data
                            eventPipe.emit("newData", res);
                            //increment primary key
                            substation.currentID = res.ID + 1;
                        } else {
                            substation.currentID = 0; //restart the ID, we run out of data
                        }
                    }
                    //call the function once again
                    setTimeout(context.loop, substation.frequency*1000, substation, context);
                });

        });
    },

    /**
     * Sets a current datetime (overwrites the one from the DB);
     *
     * @param row
     */
    transformRow : function (row) {
        row.READ_TIME = new Date().getTime();
        return row;
    },

    shouldSkip: function (chance) {
        return Math.random() < chance;
    }
};

module.exports = reader;