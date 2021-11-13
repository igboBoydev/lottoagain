const db = require('../database/db');
const helpers = require('../config/helpers');
const Joi = require('joi');
var uuid = require('node-uuid');
require('dotenv').config();
const config = require('../config/conf');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const { Op } = require('sequelize');
const resolveRegularLotto = require('../queues/regular-lotto');

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];


function lottoParser(type, stakes, amount, gameId)
{
    // 1direct - 40.
    // 2direct - 240.
    // 3direct - 2100.
    // 4direct - 6000.
    // 5direct - 44000.

    if (type === 'NAP 1') 
    {
        var stakes1 = stakes.replace(/\s/g, '').trim().split(",");
        var length = stakes1.length;
        var odd = 40;
        var lowerBound = 90;

        // to win here the number picked by user must be the first number gotten from displayed results

        if (length !== 1) {
            return {
                status: 'ERROR',
                message: 'Only a single stake is allowed for NAP 1'
            }
        }

        if (Number(stakes1) > lowerBound) {
            return {
                    status: 'ERROR',
                    message: 'Only Numbers between 1 and 90 is allowed for NAP 1'
                }
        }

        var possibleWinning = odd * amount;

    //         var d = new Date();
    // var minutes = d.getMinutes()
    // var seconds = d.getSeconds()
    // var hours1 = d.getHours()
    // var date = d.getDate();
    // var month = d.getMonth() + 1; 
    // var year = d.getFullYear();

    // var time1 = hours1 + ":" + minutes + ":" + seconds
    
    // var dates = `${year}-${month}-${date} ${time1}`


        // return {
        //     type: type,
        //     odd: odd, 
        //     line: 1,
        //     amount: amount, 
        //     staked: amount,
        //     possibleWinning: possibleWinning, 
        //     stakes: stakes1,
        //     //date: dates
        // }
        // 

    } else if (type == 'NAP 2') {
        var stakes1 = stakes.replace(/\s/g, '').trim().split(",");
        var length = stakes1.length;
        var odd = 240;
        var lowerBound = 90;
        var line = 1;

        if (length != 2)
        {
            return {
                status: 'ERROR',
                message: 'Only 2 stakes is allowed for NAP 2'
            }
        }

        for(element of stakes1)
        {
            if(Number(element) > lowerBound)
            {
                return {
                    status: 'ERROR',
                    message: 'Only Numbers between 1 and 90 is allowed for NAP2'
                }
            }
        }

        var possibleWinning = odd * amount;

        var min_possibleWinning = possibleWinning;
        var max_possibleWinning = possibleWinning  * line;
        

    //         var d = new Date();
    // var minutes = d.getMinutes()
    // var seconds = d.getSeconds()
    // var hours1 = d.getHours()
    // var date = d.getDate();
    // var month = d.getMonth() + 1; 
    // var year = d.getFullYear();

    // var time1 = hours1 + ":" + minutes + ":" + seconds
    
    // var dates = `${year}-${month}-${date} ${time1}`

        return {
            type: type,
            odd: odd, 
            line,
            amount, 
            staked: amount,
            possibleWinning,
            min_possibleWinning,
            max_possibleWinning, 
            stakes: stakes1,
            gameId
            //date: dates
        }
    }
    else if(type == 'NAP 3')
    {
        var stakes1 = stakes.replace(/\s/g, '').trim().split(",");
        var length = stakes1.length;
        var odd = 2100;
        var lowerBound = 90;

        if(length != 3)
        {
            return {
                status: 'ERROR',
                message: 'Only 3 stakes is allowed for NAP 3'
            }
        }

        for(element of stakes1)
        {
            if(Number(element) > lowerBound)
            {
                return {
                    status: 'ERROR',
                    message: 'Only Numbers between 1 and 90 is allowed for NAP 3'
                }
            }
        }

        var possibleWinning = odd * amount;

        var max_possibleWinning = possibleWinning  * line;
        var min_possibleWinning = possibleWinning ;
    //         var d = new Date();
    // var minutes = d.getMinutes()
    // var seconds = d.getSeconds()
    // var hours1 = d.getHours()
    // var date = d.getDate();
    // var month = d.getMonth() + 1; 
    // var year = d.getFullYear();

    // var time1 = hours1 + ":" + minutes + ":" + seconds
    
    // var dates = `${year}-${month}-${date} ${time1}`

        return {
            type: type,
            odd: odd, 
            amount: amount, 
            staked: amount,
            line: 1,
            possibleWinning: possibleWinning, 
            max_possibleWinning,
            min_possibleWinning,
            stakes: stakes1,
            //date: dates
        }
    }
    else if(type == 'NAP 4')
    {
        var stakes1 = stakes.replace(/\s/g, '').trim().split(",");
        var length = stakes1.length;
        var odd = 6000;
        var lowerBound = 90;

        if(length != 4)
        {
            return {
                status: 'ERROR',
                message: 'Only 4 stakes is allowed for NAP 4'
            }
        }

        for(element of stakes1)
        {
            if(Number(element) > lowerBound)
            {
                return {
                    status: 'ERROR',
                    message: 'Only Numbers between 1 and 90 is allowed for NAP 4'
                }
            }
        }

        var possibleWinning = odd * amount;

    //         var d = new Date();
    // var minutes = d.getMinutes()
    // var seconds = d.getSeconds()
    // var hours1 = d.getHours()
    // var date = d.getDate();
    // var month = d.getMonth() + 1; 
    // var year = d.getFullYear();

    // var time1 = hours1 + ":" + minutes + ":" + seconds
    
    // var dates = `${year}-${month}-${date} ${time1}`

        return {
            type: type,
            odd: odd, 
            line: 1,
            amount: amount, 
            staked: amount,
            possibleWinning: possibleWinning, 
            stakes: stakes1,
            //date: dates
        }
    }
    else if(type == 'NAP 5')
    {
        var stakes1 = stakes.replace(/\s/g, '').trim().split(",");
        var length = stakes1.length;
        var odd = 44000;
        var lowerBound = 90;

        if(length != 5)
        {
            return {
                status: 'ERROR',
                message: 'Only 5 stakes is allowed for NAP 5'
            }
        }

        for(element of stakes1)
        {
            if(Number(element) > lowerBound)
            {
                return {
                    status: 'ERROR',
                    message: 'Only Numbers between 1 and 90 is allowed for NAP 5'
                }
            }
        }

        var possibleWinning = odd * amount;

    //         var d = new Date();
    // var minutes = d.getMinutes()
    // var seconds = d.getSeconds()
    // var hours1 = d.getHours()
    // var date = d.getDate();
    // var month = d.getMonth() + 1; 
    // var year = d.getFullYear();

    // var time1 = hours1 + ":" + minutes + ":" + seconds
    
    // var dates = `${year}-${month}-${date} ${time1}`

        return {
            type: type,
            odd: odd, 
            line: 1,
            amount: amount,
            staked: amount, 
            possibleWinning: possibleWinning, 
            stakes: stakes1,
            //date: dates
        }
    }
    else if(type == 'PERM 2')
    {
        var stakes1 = stakes.replace(/\s/g, '').trim().split(",");
        var length = stakes1.length;
        var odd = 240;
        var lowerBound = 90;
        var line = helpers.perm2(length);

        if(length < 3)
        {
            return {
                status: 'ERROR',
                message: 'Not less than 3 stakes is allowed for PERM 2'
            }
        }

        for(element of stakes1)
        {
            if(Number(element) > lowerBound)
            {
                return {
                    status: 'ERROR',
                    message: 'Only Numbers between 1 and 90 is allowed for PERM 2'
                }
            }
        }

        var max_possibleWinning = odd * amount * line;
        var min_possibleWinning = odd * amount

    //         var d = new Date();
    // var minutes = d.getMinutes()
    // var seconds = d.getSeconds()
    // var hours1 = d.getHours()
    // var date = d.getDate();
    // var month = d.getMonth() + 1; 
    // var year = d.getFullYear();

    // var time1 = hours1 + ":" + minutes + ":" + seconds
    
    // var dates = `${year}-${month}-${date} ${time1}`

        return {
            type: type,
            odd: odd, 
            line: line,
            amount: amount, 
            staked: line * amount,
            min_possibleWinning,
            max_possibleWinning, 
            stakes: stakes1,
            //date: dates
        }
    }  
    else if(type == 'PERM 3')
    {
        var stakes1 = stakes.replace(/\s/g, '').trim().split(",");
        var length = stakes1.length;
        var odd = 2100;
        var lowerBound = 90;
        var line =  helpers.perm3(length);

        if(length < 4)
        {
            return {
                status: 'ERROR',
                message: 'Not less than 4 stakes is allowed for PERM 3'
            }
        }

        for(element of stakes1)
        {
            if(Number(element) > lowerBound)
            {
                return {
                    status: 'ERROR',
                    message: 'Only Numbers between 1 and 90 is allowed for PERM 3'
                }
            }
        }

        var max_possibleWinning = odd * amount * line;
        var min_possibleWinning = odd * amount;

    //         var d = new Date();
    // var minutes = d.getMinutes()
    // var seconds = d.getSeconds()
    // var hours1 = d.getHours()
    // var date = d.getDate();
    // var month = d.getMonth() + 1; 
    // var year = d.getFullYear();

    // var time1 = hours1 + ":" + minutes + ":" + seconds
    
    // var dates = `${year}-${month}-${date} ${time1}`

        return {
            type: type,
            odd: odd, 
            line: line,
            amount: amount, 
            staked: line * amount,
            min_possibleWinning,
            max_possibleWinning, 
            stakes: stakes1,
            gameId
            //date: dates
        }
    }  
    else if(type == 'PERM 4')
    {
        var stakes1 = stakes.replace(/\s/g, '').trim().split(",");
        var length = stakes1.length;
        var odd = 6000;
        var lowerBound = 90;
        var line =  helpers.perm4(length);

        if(length < 5)
        {
            return {
                status: 'ERROR',
                message: 'Not less than 5 stakes is allowed for PERM 4'
            }
        }

        for(element of stakes1)
        {
            if(Number(element) > lowerBound)
            {
                return {
                    status: 'ERROR',
                    message: 'Only Numbers between 1 and 90 is allowed for PERM 4'
                }
            }
        }

        var max_possibleWinning = odd * amount * line;
        var min_possibleWinning = odd * amount

    //         var d = new Date();
    // var minutes = d.getMinutes()
    // var seconds = d.getSeconds()
    // var hours1 = d.getHours()
    // var date = d.getDate();
    // var month = d.getMonth() + 1; 
    // var year = d.getFullYear();

    // var time1 = hours1 + ":" + minutes + ":" + seconds
    
    // var dates = `${year}-${month}-${date} ${time1}`

        return {
            type: type,
            odd: odd, 
            line: line,
            amount: amount, 
            staked: line * amount,
            min_possibleWinning,
            max_possibleWinning, 
            stakes: stakes1,
            //date: dates
        }
    }  
    else if(type == 'PERM 5')
    {
        var stakes1 = stakes.replace(/\s/g, '').trim().split(",");
        var length = stakes1.length;
        var odd = 44000;
        var lowerBound = 90;
        var line = helpers.perm5(length);

        if(length < 6)
        {
            return {
                status: 'ERROR',
                message: 'Not less than 6 stakes is allowed for PERM 5'
            }
        }

        for(element of stakes1)
        {
            if(Number(element) > lowerBound)
            {
                return {
                    status: 'ERROR',
                    message: 'Only Numbers between 1 and 90 is allowed for PERM 5'
                }
            }
        }

        var max_possibleWinning = odd * amount * line;
        var min_possibleWinning = odd * amount

    //         var d = new Date();
    // var minutes = d.getMinutes()
    // var seconds = d.getSeconds()
    // var hours1 = d.getHours()
    // var date = d.getDate();
    // var month = d.getMonth() + 1; 
    // var year = d.getFullYear();

    // var time1 = hours1 + ":" + minutes + ":" + seconds
    
    // var dates = `${year}-${month}-${date} ${time1}`

        return {
            type: type,
            odd: odd, 
            line: line,
            amount: amount, 
            staked: line * amount,
            min_possibleWinning,
            max_possibleWinning, 
            stakes: stakes1,
            //date: dates
        }
    }  
    else if(type == '1 BANKER')
    {
        var stakes1 = stakes.replace(/\s/g, '').trim().split(",");
        var length = stakes1.length;
        var odd = 240;
        var lowerBound = 90;
        var line = 4;

        if(length != 1)
        {
            return {
                status: 'ERROR',
                message: 'Only 1 stake is allowed for 1 BANKER'
            }
        }

        for(element of stakes1)
        {
            if(Number(element) > lowerBound)
            {
                return {
                    status: 'ERROR',
                    message: 'Only Numbers between 1 and 90 is allowed for 1 BANKER'
                }
            }
        }

    var possibleWinning = line * odd;

    // var d = new Date();
    // var minutes = d.getMinutes()
    // var seconds = d.getSeconds()
    // var hours1 = d.getHours()
    // var date = d.getDate();
    // var month = d.getMonth() + 1; 
    // var year = d.getFullYear();
    // var time1 = hours1 + ":" + minutes + ":" + seconds
    // var dates = `${year}-${month}-${date} ${time1}`

        return {
            type: type,
            odd: odd, 
            line: 4,
            amount: amount, 
            staked: 89 * amount,
            possibleWinning, 
            stakes: stakes1,
            //date: dates
        }
    }
    else
    {
        return {
            status: 'ERROR',
            message: 'Invalid Type'
        }
    }

}

function againstParser(type, stakes, stakes2, amount)
{
    if(type == 'AGAINST')
    {
        var odd = 240;
        var lowerBound = 90;

        var stakes1 = stakes.replace(/\s/g, '').trim().split(",");
        var stakes2 = stakes2.replace(/\s/g, '').trim().split(",");

        var length1 = stakes1.length;
        var length2 = stakes2.length;

        if(stakes1.length < 1)
        {
            return {
                status: 'ERROR',
                message: 'At least, 1 stake is required for BANKER'
            }
        }

        if(stakes2.length < 1)
        {
            return {
                status: 'ERROR',
                message: 'At least, 1 stake is required for BANKER'
            }
        }

        for(element of stakes1)
        {
            if(Number(element) > lowerBound)
            {
                return {
                    status: 'ERROR',
                    message: 'Only Numbers between 1 and 90 is allowed for AGAINST'
                }
            }
        }

        
     var d = new Date();
    var minutes = d.getMinutes()
    var seconds = d.getSeconds()
    var hours1 = d.getHours()
    var date = d.getDate();
    var month = d.getMonth() + 1; 
    var year = d.getFullYear();

    var time1 = hours1 + ":" + minutes + ":" + seconds
    
    var dates = `${year}-${month}-${date} ${time1}`


        var max_possibleWinning = length1 * length2 * odd * amount;
        var min_possibleWinning = 2 * amount * odd

        return {
            type: type,
            odd: odd, 
            amount: amount, 
            staked: length1 * length2 * amount,
            min_possibleWinning,
            max_possibleWinning: max_possibleWinning, 
            stakes1: stakes1,
            stakes2: stakes2,
            date: dates
        }
    }
    else
    {
        return {
            status: 'ERROR',
            message: 'Invalid Type'
        }
    }

}

function nextInLine()
{
    
}

function getNextDays(currentDay, dayIndex)
{
    var maxDay = 6;
    var element = [1, 2, 3];
    var arr1 = [];
    var arr2 = [];
    var counter = dayIndex;
    arr1.push(currentDay);

    for(item of element)
    {
        counter = counter + 1;

        if(counter <= maxDay)
        {
            arr1.push(days[counter]);
            arr2.push(days[counter]);
        }
        else
        {
            counter = 0;
            arr1.push(days[counter]);
            arr2.push(days[counter]);
        }
    }

    return [arr1, arr2];

}

const expressGames = (amount, numbers, odd) => {

    let lowerBound = 90;
    let length = numbers.length

    if (length < 2) {
        return {
            status: 'ERROR',
            message: 'Not less than 2 stakes is allowed for Lotto Express'
        }
    }

        for(element of numbers)
        {
            if(Number(element) > lowerBound)
            {
                return {
                    status: 'ERROR',
                    message: 'Only Numbers between 1 and 90 is allowed for Lotto Express games'
                }
            }
    }

    var d = new Date();
    var minutes = d.getMinutes()
    var seconds = d.getSeconds()
    var hours1 = d.getHours()
    var date = d.getDate();
    var month = d.getMonth() + 1; 
    var year = d.getFullYear();

    var time1 = hours1 + ":" + minutes + ":" + seconds
    
    var dates = `${year}-${month}-${date} ${time1}`
    
    let possibleWinning = parseInt(odd) * amount;
    
        return {
            type: 'Lotto Express',
            amount,
            odd: odd,
            staked: length * amount,
            possibleWinning,
            stakes: numbers,
            date: dates
        }


}

module.exports = {

placeStake: async (req, res, next) => {
    const stakeSchema = Joi.object().keys({
        totalStake: Joi.string().required(),
        stakes: Joi.array().required(),
    }).unknown();
  
    const validate1 = Joi.validate(req.body, stakeSchema)
  
    if(validate1.error != null)
    {
        const errorMessage = validate1.error.details.map(i => i.message).join('.');
  
        return res.status(400).json({
            status: 'ERROR',
            code: "01",
            message: errorMessage
        });
    }

    const loginSchema = Joi.object().keys({
        amount: Joi.string().required(),
        type: Joi.string().required(),
        stakeList: Joi.string().required(),
        gameId: Joi.string().required(),
    }).unknown();
  
    const validate2 = Joi.validate(req.body.stakes[0], loginSchema)
  
    if(validate2.error != null)
    {
        const errorMessage = validate2.error.details.map(i => i.message).join('.');
  
        return res.status(400).json({
            status: 'ERROR',
            code: "01",
            message: errorMessage
        });
    }

    //check balance

   //// var gameId = req.body.gameId; 
    var stakes = req.body.stakes;
    var result = [];

    for(stake of stakes)
    {
        var type = stake.type;
        var stakeSet = stake.stakeList;
        var amount = stake.amount;
        var feeds = null

        if(type == 'AGAINST')
        {
            var stakeSet2 = stake.stakeList2;
            result.push(againstParser(type, stakeSet, stakeSet2, amount))
            feeds = againstParser(type, stakeSet, stakeSet2, amount);
        }
        else
        {
            result.push(lottoParser(type, stakeSet, amount, stake.gameId))
            feeds = lottoParser(type, stakeSet, amount);
        }

        var requestRef = parseInt(100000000 * Math.random());

        //debit from wallet
        //log transaction
        //log bet
        
        await db.Bet.create({
            user_id: req.user.id, //
            bet_id: requestRef,
            //game_id: gameId,
            amount: amount,
            type: type,
            kind: 'Regular Lotto',
            odd: feeds.odd,
            line: feeds.line,
            min_possibleWinning: feeds.min_possibleWinning,
            max_possibleWinning: feeds.max_possibleWinning,
            possibleWinning: feeds.max_possibleWinning,
            staked: feeds.staked,
            stakes: JSON.stringify(feeds.stakes),
            //stakes2: JSON.stringify(feeds.stake2),
            //result: Sequelize.STRING,
            status: 'pending',
            game_id: stake.gameId,// feeds.gameId
        });
    }
        
    return res.status(200).json({result: result});

},

pushResults: async (req, res, next) => {

    const kycSchema = Joi.object().keys({
      gameId: Joi.required(),
      numbers:  Joi.required(),
    }).unknown();
  
    const validate = Joi.validate(req.body, kycSchema);
  
    if(validate.error != null)
    {
        const errorMessage = validate.error.details.map(i => i.message).join('.');
        return res.status(400).json(
            helpers.sendError(errorMessage)
        );
    }
  
    //get number from admin
    var gameResult =  req.body.numbers;
    var gameId = req.body.gameId;
  
    const postbets = await db.GameResult.create({
      admin_id: 0, //kindly check and update here
      gameId: gameId,
      type: 'Regular Lotto',
      result: gameResult,
    });
  
    var data = {
      gameId: gameId,
      result: gameResult,
    }
  
    //send result to job for processing
    resolveRegularLotto.processJob(data);
  
    //initiate response
    return res.status(200).json(
      helpers.sendSuccess(`Result posted successfully`)
    );
  
},


}


