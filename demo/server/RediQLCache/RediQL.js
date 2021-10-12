const { parse } = require('graphql/language/parser')
const { visit, BREAK } = require('graphql/language/visitor')
const { graphql } = require('graphql')

const axios = require('axios')
const { request, gql } = require('graphql-request')

const RediCache = require('./RediCache')


class RediQLCache {
  // establish our props
  constructor(redisClient) {
    // bind our parser function to the constructor function
    this.parser = this.parser.bind(this)
    
    // QLQuery is initialized as an empty string
    this.QLQuery = ''
            

     // ESTABLISHES REQUEST FROM GQL QUERY --- DOUBLE CHECK
    this.request = request

    // METHOD THAT ACTUALLY PERFORMS THE QUERY TO THE API
    this.query = this.query.bind(this)
 
    // INITIALIZES CACHE IN THE SERVER - ESTBALISHES CONNECTION
    this.redisClient = redisClient

    //THIS.RESPONSE WILL RETURN VALUE FROM CACHE, ELSE IT WILL BE ASSIGNED THE RES FROM GQL -> THEN REASSIGNED TO THIS.CACHE()
    this.response 

    // ALLOWS USER TO CLEAR THE REDIS CACHE
    this.clearCache = this.clearCache.bind(this)

    // CHECK IF THE DATA IS IN THE CACHE, INIT AS FALSE, IF DATA IS IN CACHE REDIRESPONSE BECOMES TRUE
    this.rediResponse = false
    
    this.responseTime
  }

  // PARSER METHOD WILL BE CALLED WITH AN ARG OF FALSE IF WE ARE CHECKING IF A RES CAN BE FORMED FROM THE CACHE
  // IF WE ARE CACHING A NEW RESPONSE, PARSER IS CALLED WITH TRUE (DEFAULT PARAMETER)
  async parser(cacheResponse = true) {
    // PARSER WILL SEND PARSED RES/QUERY TO CACHE CLASS FOR DECONSTRUCTION/RECONSTRUCTION FOR CACHING/QUERY REFORMATION
    // GQL PARSE METHOD INVOKED ON THE QUERY FROM THE FRONT, AND SAVED AS PARSEDQUERY VARIABLE
    const parsedQuery = parse(this.QLQuery)

    let parsedResponse = this.response

    // IF THE PARSED RESPONSE IS A STRING, THEN JSONPARSE THE RESPONSE
    if (typeof parsedResponse == 'string' && cacheResponse == true) {
      parsedResponse = JSON.parse(this.response)
    }
    const rediCache = new RediCache(parsedQuery, this.redisClient, parsedResponse)
    //CREATE QUERY CHECKS THE CACHE AND ASSIGNS A NEW RESPONSE TO EXPCACHE.NEWRESPONSE IF AVAILABLE
    await rediCache.createQuery()

    // IF CACHE RESPONSE IS TRUE, CACHE THE RESPONSE IN REDIS
    // CONTINUE REVIEW FROM HERE** 
    if(cacheResponse) await rediCache.cacheResponse() 

    this.rediResponse = rediCache.rediResponse
    
    if(rediCache.rediResponse) { 
      this.response = rediCache.newResponse
    }
  }

  async query(req, res, next) {
    this.responseTime = Date.now()
    // this.QLQuery = req.body.data.query 
    this.QLQuery = req.body.data.query 
    // RUN THE PARSER IF THE CACHE RESP IS FALSE, AWAIT FOR IT TO FINISH
    await this.parser(false)
    
    //IF REDIRESPONSE IS TRUE, THERE IS DATA IN THE CACHE, SAVE THE RESPONSE ON RES.LOCALS.QUERY
    if (this.rediResponse) {
      res.locals.query = this.response

    // THIS.RESPONSE TEST 
    // console.log('this.response test:')

    // for(let i = 0; i < 2; i++) {   
    //   console.log(this.response['launches'][i])
    // }
    res.locals.responseTime = Date.now() - this.responseTime
    // MOVE TO NEXT PIECE OF MW
      return next()

    } else {

      // IF THE DATA IS NOT IN THE CACHE...
      // RESPONSE DATA IS INITIALIZED
      let responseData;
        // MAKING A REQUEST TO GQL, ON 1500/GQL, WITH THE QUERY FROM THE FRONT END
        responseData = await this.request(
          'http://localhost:8080/graphql',  
          this.QLQuery
        )
        
      // SENDING THE RESPONSE DATA FROM GQL TO THE FRONT
      res.locals.query = responseData

      // SAVING THE RESPONSE DATA FROM GQL TO THIS.RESPONSE
      this.response = responseData 
      console.log('this.response test:')
      // for(let i = 0; i < 2; i++) {   
      //   console.log(this.response['launches'][i])
      // }
        // console.log(this.response)
      // THIS.PARSER USES PARSER METHOD
      // SEND NEW RESPONSE FROM API THROUGH THE PARSER, SO THE DATA GETS CACHED
      if(!this.rediResponse) await this.parser()
         res.locals.responseTime = Date.now() - this.responseTime
      //MOVE TO NEXT PIECE OF MW
      next() 
    } 
  }

  // THIS CLEARS THE CACHE
  // ** POTENTIALLY MOVE THIS TO EXP CACHE CLASS
  clearCache(req, res, next) {
    this.redisClient.flushall()
    next()
  }
}

module.exports = RediQLCache
