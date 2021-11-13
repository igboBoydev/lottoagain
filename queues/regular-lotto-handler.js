const Queue = require('bull');
const Redis = require('ioredis');
const db = require('../database/db');
require('dotenv').config();

//redis config
const redis = new Redis();

//producer
const queue = new Queue('sortRegularLotto', redis);

//process jobs
queue.process(async job => {
    //console.log('---------------- job is processing --------------');
    await addJob(job.data);
});

const options = {
    delay: 100, 
    attempts: 1
}

const processJob = async (data) => {    
    //Add queue
    queue.add(data, options);
}

function gameChecker(type, stake)
{
    var winning = 0;

    if(type == 'NAP 1')
    {

    }
    else if(type == 'NAP 2')
    {

    }
    else if(type == 'NAP 3')
    {

    }
    else if(type == 'NAP 4')
    {

    }
    else if(type == 'NAP 5')
    {

    }
    else if(type == 'PERM 1')
    {
        winning = 1;
        
    }
    else if(type == 'PERM 2')
    {
        winning = 2;
    }
    else if(type == 'PERM 3')
    {
        winning = 3;
    }
    else if(type == 'PERM 4')
    {
        winning = 4;
    }
    else if(type == 'PERM 5')
    {
        winning = 5;
    }

    return 5;

}

const addJob =  async (data) => {

    //console.log(data);
    
    // var data = {
    //     gameAttr: finishedGame,
    //     result: data.result,
    //     bet: item
    // }

    //get user details
    var user = await db.User.findOne({ where: { id: data.bet.user_id } });

    // var finishedGame = await db.Lotto.findOne({
    //     where: {
    //         uuid: data.gameId
    //     }
    // });

    // //get all list of stakes matching the target games
    // var bets = await db.Bet.findAll({
    //     where: {
    //         game_id: data.gameId,
    //         status: 'pending'
    //     }
    // });

    //
    // var data = {
    //     gameAttr: finishedGame, ==>  db.Lotto object
    //     result: data.result, => result separated by comma
    //     bet: item bet item
    // }


    //check game type
    //check winnings

    var arr1 = data.result.split(",");
    var arr2 = JSON.parse(data.bet.stakes);
    const intersect = arr1.filter(element => arr2.includes(element))

    //console.log(arr1);
    //console.log(arr2);
    //console.log(intersect);

    var check = gameChecker(data.bet.type, intersect);

    console.log('==============================================');

    //update game status
    //log winnnings if any

    return;
}

module.exports = {
    processJob
}