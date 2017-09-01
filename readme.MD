# HTTPDataEmitter

Periodically sends HTTP requests with data to subscribers. Useful for simulating constant data influx

In this concrete implementation, it reads data from the DB (see data/database.sql) and periodically sends it to configured URLs;
 
### How to use

1. `$ git clone https://github.com/dejan7/HTTPDataEmitter`

2. `$ cd HTTPDataEmitter && npm install`

3. Execute data/database.sql and populate your DB

4. Copy `config.example.js` into `config.js` and configure it

   1. SUBSCRIBERS - list of URLs to subscribe to
    
   2. SUBSTATIONS - list of substations with following params
    
    - **id** - location_id in data/database.sql
    
    - **frequency** - how often will data be read for this location (in seconds)
    
    - **chanceToSkip** - chance between 0.00 and 1.00 to skip sending in a given iteration
    
    
##### INFO

Student project - final work //TODO
   
   
 

 