var config = {
    DB_HOST: "localhost",
    DB_USER: "homestead",
    DB_PASS: "secret",
    DB_NAME: "dataemitter",

    SUBSCRIBERS: [
        'http://example.com/demo',
        'http://example2.com/demo',
    ],

    SUBSTATIONS: [
        //location_id, frequency (in seconds), chance to skip (between 0.00 - 1.00)
        {id: 41, frequency: 15, chanceToSkip: 0.0},
        {id: 42, frequency: 20, chanceToSkip: 0.3},
        {id: 61, frequency: 20, chanceToSkip: 0.1},
        {id: 90, frequency: 60, chanceToSkip: 0.1},
    ]
};

module.exports = config;