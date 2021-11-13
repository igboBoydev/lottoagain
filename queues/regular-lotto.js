const Queue = require('bull');
const Redis = require('ioredis');
const db = require('../database/db');
const regularLottoHandler = require('../queues/regular-lotto-handler');
require('dotenv').config();

//redis config
const redis = new Redis();

//producer
const queue = new Queue('batchRegularLotto', redis);

//process jobs
queue.process(async job => {
    //console.log('---------------- job is processing --------------');
    await addJob(job.data);
});

// git clone https://dlakes@bitbucket.org/dlakes/lottos.git

const options = {
    delay: 100, 
    attempts: 1
}

const processJob = async (data) => {    
    //Add queue
    queue.add(data, options);
}

const addJob =  async (data) => {

    //console.log(data);

    //Get target games
    var finishedGame = await db.Lotto.findOne({
        where: {
            uuid: data.gameId
        }
    });

    //get all list of stakes matching the target games
    var bets = await db.Bet.findAll({
        where: {
            game_id: data.gameId,
            status: 'pending'
        }
    });


    // console.log(bets);

    // console.log("got here ______________________________")
    
    //push results to handler for processing
    for(item of bets)
    {
        //
        var data = {
            gameAttr: finishedGame,
            result: data.result,
            bet: item
        }

        // console.log(data);
        // console.log('===================================');
    
        //send result to job for processing
        regularLottoHandler.processJob(data);

    }

    return;
}

module.exports = {
    processJob
}