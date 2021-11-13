const db = require('../database/db');
const helpers = require('../config/helpers');
const Joi = require('joi');
var uuid = require('node-uuid');
require('dotenv').config();
const config = require('../config/conf');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const { Op } = require('sequelize');

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];


function lottoParser(type, stakes, amount)
{
    // 1direct - 40
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

            var d = new Date();
    var minutes = d.getMinutes()
    var seconds = d.getSeconds()
    var hours1 = d.getHours()
    var date = d.getDate();
    var month = d.getMonth() + 1; 
    var year = d.getFullYear();

    var time1 = hours1 + ":" + minutes + ":" + seconds
    
    var dates = `${year}-${month}-${date} ${time1}`


        return {
            type: type,
            odd: odd, 
            line: 1,
            amount: amount, 
            staked: amount,
            possibleWinning: possibleWinning, 
            stakes: stakes1,
            date: dates
        }

    } else if (type == 'NAP 2') {
        var stakes1 = stakes.replace(/\s/g, '').trim().split(",");
        var length = stakes1.length;
        var odd = 240;
        var lowerBound = 90;

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

            var d = new Date();
    var minutes = d.getMinutes()
    var seconds = d.getSeconds()
    var hours1 = d.getHours()
    var date = d.getDate();
    var month = d.getMonth() + 1; 
    var year = d.getFullYear();

    var time1 = hours1 + ":" + minutes + ":" + seconds
    
    var dates = `${year}-${month}-${date} ${time1}`

        return {
            type: type,
            odd: odd, 
            line: 1,
            amount: amount, 
            staked: amount,
            possibleWinning: possibleWinning, 
            stakes: stakes1,
            date: dates
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
            var d = new Date();
    var minutes = d.getMinutes()
    var seconds = d.getSeconds()
    var hours1 = d.getHours()
    var date = d.getDate();
    var month = d.getMonth() + 1; 
    var year = d.getFullYear();

    var time1 = hours1 + ":" + minutes + ":" + seconds
    
    var dates = `${year}-${month}-${date} ${time1}`

        return {
            type: type,
            odd: odd, 
            amount: amount, 
            staked: amount,
            line: 1,
            possibleWinning: possibleWinning, 
            stakes: stakes1,
            date: dates
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

            var d = new Date();
    var minutes = d.getMinutes()
    var seconds = d.getSeconds()
    var hours1 = d.getHours()
    var date = d.getDate();
    var month = d.getMonth() + 1; 
    var year = d.getFullYear();

    var time1 = hours1 + ":" + minutes + ":" + seconds
    
    var dates = `${year}-${month}-${date} ${time1}`

        return {
            type: type,
            odd: odd, 
            line: 1,
            amount: amount, 
            staked: amount,
            possibleWinning: possibleWinning, 
            stakes: stakes1,
            date: dates
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

            var d = new Date();
    var minutes = d.getMinutes()
    var seconds = d.getSeconds()
    var hours1 = d.getHours()
    var date = d.getDate();
    var month = d.getMonth() + 1; 
    var year = d.getFullYear();

    var time1 = hours1 + ":" + minutes + ":" + seconds
    
    var dates = `${year}-${month}-${date} ${time1}`

        return {
            type: type,
            odd: odd, 
            line: 1,
            amount: amount,
            staked: amount, 
            possibleWinning: possibleWinning, 
            stakes: stakes1,
            date: dates
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

            var d = new Date();
    var minutes = d.getMinutes()
    var seconds = d.getSeconds()
    var hours1 = d.getHours()
    var date = d.getDate();
    var month = d.getMonth() + 1; 
    var year = d.getFullYear();

    var time1 = hours1 + ":" + minutes + ":" + seconds
    
    var dates = `${year}-${month}-${date} ${time1}`

        return {
            type: type,
            odd: odd, 
            line: line,
            amount: amount, 
            staked: line * amount,
            min_possibleWinning,
            max_possibleWinning, 
            stakes: stakes1,
            date: dates
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

            var d = new Date();
    var minutes = d.getMinutes()
    var seconds = d.getSeconds()
    var hours1 = d.getHours()
    var date = d.getDate();
    var month = d.getMonth() + 1; 
    var year = d.getFullYear();

    var time1 = hours1 + ":" + minutes + ":" + seconds
    
    var dates = `${year}-${month}-${date} ${time1}`

        return {
            type: type,
            odd: odd, 
            line: line,
            amount: amount, 
            staked: line * amount,
            min_possibleWinning,
            max_possibleWinning, 
            stakes: stakes1,
            date: dates
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

            var d = new Date();
    var minutes = d.getMinutes()
    var seconds = d.getSeconds()
    var hours1 = d.getHours()
    var date = d.getDate();
    var month = d.getMonth() + 1; 
    var year = d.getFullYear();

    var time1 = hours1 + ":" + minutes + ":" + seconds
    
    var dates = `${year}-${month}-${date} ${time1}`

        return {
            type: type,
            odd: odd, 
            line: line,
            amount: amount, 
            staked: line * amount,
            min_possibleWinning,
            max_possibleWinning, 
            stakes: stakes1,
            date: dates
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

            var d = new Date();
    var minutes = d.getMinutes()
    var seconds = d.getSeconds()
    var hours1 = d.getHours()
    var date = d.getDate();
    var month = d.getMonth() + 1; 
    var year = d.getFullYear();

    var time1 = hours1 + ":" + minutes + ":" + seconds
    
    var dates = `${year}-${month}-${date} ${time1}`

        return {
            type: type,
            odd: odd, 
            line: line,
            amount: amount, 
            staked: line * amount,
            min_possibleWinning,
            max_possibleWinning, 
            stakes: stakes1,
            date: dates
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

            var d = new Date();
    var minutes = d.getMinutes()
    var seconds = d.getSeconds()
    var hours1 = d.getHours()
    var date = d.getDate();
    var month = d.getMonth() + 1; 
    var year = d.getFullYear();

    var time1 = hours1 + ":" + minutes + ":" + seconds
    
    var dates = `${year}-${month}-${date} ${time1}`

        return {
            type: type,
            odd: odd, 
            line: 4,
            amount: amount, 
            staked: 89 * amount,
            possibleWinning, 
            stakes: stakes1,
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

const softGames = (amount, number, odd, type) => {
    let lowerBound = 90;
    let length = number.length

    if (length < 2) {
        return {
            status: 'ERROR',
            message: 'Not less than 2 stakes is allowed for Lotto Express'
        }
    }

        for(element of number)
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

    if (type === 'Regular') {
        let possibleWinning = parseInt(odd) * amount;

        return {
            type: 'soft Lotto',
            kind: `${type}`,
            amount,
            odd: odd,
            staked: length * amount,
            possibleWinning,
            stakes: number,
            date: dates 
        }

    }

    if (type === 'Ordered') {

        let newOdd = parseInt(odd) + parseInt(40)

            let possibleWinning = parseInt(newOdd) * parseInt(amount);
            return {
            type: 'soft Lotto',
            kind: `${type}`,
            amount,
            odd: newOdd,
            staked: length * amount,
            possibleWinning,
            stakes: number,
            date: dates 
        }

    }
}

module.exports = {

placeStake: async (req, res, next) => {
    const stakeSchema = Joi.object().keys({
        type: Joi.string().required(),
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

    var stakes = req.body.stakes;
    var result = [];

    for(stake of stakes)
    {
        var type = stake.type;
        var stakeSet = stake.stakeList;
        var amount = stake.amount;

        if(type == 'AGAINST')
        {
            var stakeSet2 = stake.stakeList2;
            result.push(againstParser(type, stakeSet, stakeSet2, amount))
        }
        else
        {
            result.push(lottoParser(type, stakeSet, amount))
        }
    }
        
    return res.status(200).json({result: result});

},

placeLottoExpress: async (req, res, next) => {
    const expressStakeSchema = Joi.object().keys({
        stakes: Joi.array().required()
    }).unknown()
    
    const validateExpress = Joi.validate(req.body, expressStakeSchema)

    if (validateExpress.error != null) {
        const errorMessage = validate1.error.details.map(i => i.message).join('.');

        return res.status(400).json({
            status: 'ERROR',
            code: "01",
            message: errorMessage
        });
    }

    let stakes = req.body.stakes
    let result = [];

    for (stake of stakes) {

        const amount = stake.value;

        var number = stake.numbers.split(',').map(function (item) {
            return parseInt(item, 10);
        });

        let LottoExpressOdds = await db.LottoExpressOdds.findOne({ limit: 1, order: [['updatedAt', 'DESC']] })

        let odd = LottoExpressOdds.odd


        result.push(expressGames(amount, number, odd))
    }

    return res.status(200).json({status: "success", result: result});
},

softLotto: async (req, res, next) => {
    const softSchema = Joi.object().keys({
        stakes: Joi.array().required()
    }).unknown()

        const validateSoft = Joi.validate(req.body, softSchema)

    if (validateSoft.error != null) {
        const errorMessage = validateSoft.error.details.map(i => i.message).join('.');

        return res.status(400).json({
            status: 'ERROR',
            code: "01",
            message: errorMessage
        });
    }

    

    let stakes = req.body.stakes
    let result = [];

    for (stake of stakes) {

        const amount = stake.value;
        const type = stake.type;

        var number = stake.numbers.split(',').map(function (item) {
            return parseInt(item, 10);
        });

        let softLotto = await db.SoftLottoOdds.findOne({ limit: 1, order: [['updatedAt', 'DESC']] })

        let odd = softLotto.odds

        result.push(softGames(amount, number, odd, type))
    }

    return res.status(200).json({status: "success", result: result});
},
    

siteSettings: async (Req, res, next) => {

    var d = new Date();
    var time = moment().format('HH:mm');
    var day = d.getDay();
    var today = days[day];
    var daysList = getNextDays(today, day);

    // console.log(`${h}:${m}`);
    // console.log(daysList[0]);

    var subArr = [];
    
    var lotto1 = await db.Lotto.findAll({ where: 
    {   day: today,
        endTime: {
            [Op.gte]: db.sequelize.literal(`TIME('${time}')`)
        } }
    });

    for(item of lotto1)
    {
        subArr.push(item);
    }

    for(item of daysList[1])
    {
        var lotto2 = await db.Lotto.findAll({ where: {day: item }});

        for(item of lotto2)
        {
            subArr.push(item);
        }
    }

    return res.status(200).json({
        success: {
            status: 'success',
            data: subArr
        }
    });

}


}


