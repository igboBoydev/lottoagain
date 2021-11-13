const db = require('../database/db');
const helpers = require('../config/helpers');
const bcrypt =  require('bcryptjs');
const Joi = require('joi');
var uuid = require('node-uuid');
var paystack = require('paystack')(process.env.PAYSTACK_SK);
const axios = require('axios');
require('dotenv').config();

const updatePasswordSchema = Joi.object().keys({
  password: Joi.string().min(5).required(),
}).unknown();

const updatePinSchema = Joi.object().keys({
  pin: Joi.string().min(5).required(),
}).unknown();

const fundWalletSchema = Joi.object().keys({
  reference: Joi.string().min(5).required(),
}).unknown();


module.exports = {

getProfile: async(req, res, next) => {

  var myBank = await db.MyBank.findOne({ where: { user_id: req.user.id }});
  var result = {
    'firstname': req.user.firstname,
    'lastname': req.user.lastname,
    'wallet': req.user.wallet,
    'mobile': req.user.mobile,
    'gender': req.user.gender,
    'email': req.user.email,
    'dob': req.user.dob,
    'withdrawable': req.user.withdrawable,
    'customer_id': req.user.customer_id,
    'bonus': req.user.bonus,
    'balance': parseFloat(req.user.wallet) + parseFloat(req.user.withdrawable),
    'bank_status': parseInt(req.user.bank_status),
    'profile_status': parseInt(req.user.profile_status),
    'kyc_status': parseInt(req.user.profile_status),
    'bank': myBank
  }

    return res.status(200).json({
      "success": {
        "status": "SUCCESS",
        'data': result
      }
    });
},

postProfile: async (req, res, next) => {

  const profileSchema = Joi.object().keys({
    firstname: Joi.string().min(3).required(),
    lastname: Joi.string().min(3).required(),
    dob: Joi.string().min(3).required(),
    //gender: Joi.string().min(4).required(),
  }).unknown();

  const validate = Joi.validate(req.body, profileSchema);

  if(validate.error != null)
  {
      const errorMessage = validate.error.details.map(i => i.message).join('.');
      return res.status(400).json(helpers.sendError(errorMessage));
  }

  var user = await db.User.findOne({ where: { id: req.user.id }});

  if(parseInt(user.profile_status) == 1)
  {
    return res.status(400).json(helpers.sendError("Profile already updated!"));
  }

  user.firstname = req.body.firstname.trim();
  user.lastname = req.body.lastname.trim();
  user.dob = req.body.dob.trim();
  //user.gender = req.body.gender;
  user.profile_status = 1;
  await user.save();
  return res.status(200).json(helpers.sendSuccess("Profile details updated successfully"));
},

transferFund: async (req, res, next) => {
    const transferFundSchema = Joi.object().keys({
      customer_id: Joi.string().required(),
      amount: Joi.number().required(),
      pin: Joi.string().required()
    }).unknown()

    const validateTransferSchema = Joi.validate(req.body, transferFundSchema);

  
  if (validateTransferSchema.error !== null) {
    const errorMessage = validateTransferSchema.error.details.map(i => i.message).join('.');
      return res.status(400).json(
        helpers.sendError(errorMessage)
      );
  };

    let customer_id = req.body.customer_id;
    let user = await db.User.findOne({ where: { id: req.user.id } })
    
    if (!user) {
      return res.status(400).json(helpers.sendError('User was not found'))
    }

    if (user.customer_id === customer_id) {
      return res.status(400).json(helpers.sendError('Operation is not allowed'))
    }

    let amount = parseFloat(req.body.amount);
    let recipient = await db.User.findOne({ where: { customer_id: customer_id } })
    
    if (!recipient) {
      recipient = await db.User.findOne({ where: { customer_id: customer_id } })
      if (!recipient) {
        return res.status(400).json(helpers.sendError('Recipeint was not found'))
      }
    }

    if (amount < 50) {
      return res.status(400).json(helpers.sendError('Minimum amount transferable is 50.00 NGN'))
  }
    let balance = parseFloat(user.wallet) + parseFloat(user.withdrawable);

    if (balance < amount) {
      return res.status(400).json(helpers.sendError('No Sufficient Balance to perform Operation'))
    } else {
      if (amount < user.wallet) {
        user.wallet = parseFloat(user.wallet) - amount;
        await user.save();
      } else if (amount < user.withdrawable) {
        user.withdrawable = parseFloat(user.withdrawable) - amount;
        await user.save();
      } else {
        let temp_wallet = parseFloat(user.wallet);
        let remain = temp_wallet - amount;

        user.wallet = parseFloat(user.wallet) - temp_wallet;
        user.withdrawable = parseFloat(user.withdrawable) - remain;
        await user.save()
      }
      

      //var reference = helpers.generateOTP(8);
      var type = "debit";

      await db.Transaction.create({
        user_id: user.dataValues.customer_id,
        method: "wallet",
        balance: parseFloat(user.wallet) + parseFloat(user.withdrawable),
        status: "success",
        description: `wallet transfer to friend with GrandLotto ID: ${customer_id}`,
        type,
        amount
      });

      recipient.wallet = parseFloat(recipient.wallet) + parseFloat(amount);
      await recipient.save()

      await db.Transaction.create({
        user_id: recipient.dataValues.customer_id,
        amount,
        type: "credit",
        method: 'wallet',
        balance: parseFloat(recipient.wallet) + parseFloat(recipient.withdrawable),
        status: "success",
        description: `wallet transfer from ${user.mobile}`
      });

      return res.status(200).json(helpers.sendSuccess(`You have successfully sent the sum of ${amount} NGN to ${customer_id}`))
    }


},

LottoExpressOdds: async (req, res, next) => {
  const expressSchema = Joi.object().keys({
    odds: Joi.string().required()
  }).unknown();

  const validate = Joi.validate(req.body, expressSchema)

    if (validate.error != null) {
    const errorMessage = validate.error.details.map(i => i.message).join('.');
      return res.status(400).json(
        helpers.sendError(errorMessage)
      );
  };
  
  let user = await db.User.findOne({ where: { customer_id: req.user.customer_id } })

  const postLottoExpressOdds = db.LottoExpressOdds.create({
    admin_id: user.customer_id,
    odd: req.body.odds
  })

  
  if (postLottoExpressOdds) {
    return res.status(200).json(
      helpers.sendSuccess("Sucessfully posted odds to the Lotto Express database")
    );
  }
  else {
    res.status(400).json(
      helpers.sendError("Error ocurred! please refresh and try again")
    )
  }

},

SoftLottoOdds: async (req, res, next) => {
  const softSchema = Joi.object().keys({
    type: Joi.string().required(),
    odds: Joi.string().required()
  }).unknown();

  const validate = Joi.validate(req.body, softSchema)

    if (validate.error != null) {
    const errorMessage = validate.error.details.map(i => i.message).join('.');
      return res.status(400).json(
        helpers.sendError(errorMessage)
      );
  };
  
  let user = await db.User.findOne({ where: { customer_id: req.user.customer_id } })

  const postSoftLottoOdds = db.SoftLottoOdds.create({
    admin_id: user.customer_id,
    type: req.body.type,
    odds: req.body.odds
  })

  
  if (postSoftLottoOdds) {
    return res.status(200).json(
      helpers.sendSuccess("Sucessfully posted odds to the Soft Lotto database")
    );
  }
  else {
    res.status(400).json(
      helpers.sendError("Error ocurred! please refresh and try again")
    )
  }

},

postResult: async (req, res, next) => {
    const resultSchema = Joi.object().keys({
      names: Joi.string().required(),
      odds: Joi.string().required()
    }).unknown();

    const validate = Joi.validate(req.body, resultSchema)

    if (validate.error != null) {
    const errorMessage = validate.error.details.map(i => i.message).join('.');
      return res.status(400).json(
        helpers.sendError(errorMessage)
      );
    }

    let user = await db.User.findOne({ where: { customer_id: req.user.customer_id } })

    var d = new Date();
  var minutes = d.getMinutes()
  var seconds = d.getSeconds()
  var hours1 = d.getHours()
  var date = d.getDate();
  var month = d.getMonth() + 1; 
  var year = d.getFullYear();

  var time1 = hours1 + ":" + minutes + ":" + seconds
  
    var dates = `${year}-${month}-${date} ${time1}`

  //  let bets = await db.Bets.findAll({ where: { type: req.body.names } })
  
    const postbets = await db.Gameresults.create({
      admin_id: user.customer_id,
      name: req.body.names,
      odds: req.body.odds,
      dates: dates
    })

  //  let data = bets.filter((a) => a.Bets)
    
  //  console.log(data)
  //  console.log(Date.parse(dates))

  // if (Date.parse(bets.date) < Date.parse(dates)) {
  //    console.log('hello')
  //  }



    if (postbets) {
    return res.status(200).json(
      helpers.sendSuccess("Sucessfully posted bets to the database")
    );
  }
  else {
    res.status(400).json(
      helpers.sendError("Error ocurred! please refresh and try again")
    )
  }

},

getGameResult: async (req, res, next) => {
  var showGames = await db.Gameresults.findAll({ limit: 10, order: [ ['updatedAt',  'DESC'] ] })
  return res.status(200).json({showGames})
},

getResults: async (req, res, next) => {
  var gameWon = await db.Gameresults.findAll({ limit: 1, order: [['updatedAt', 'DESC']] });
  let name = `${gameWon[0].name}`
  let data = gameWon[0].dates
  let day = Date.parse(data)
  // let values = gameWon.dataValues

  let user = req.user


  const func = (date, time) => {
      return  (date - time)
  }

  // if (values) {
    
  // SELECT "id" FROM Cars" WHERE "Cars"."ownerId" = (:id)
  
  // }

  // var userz = await db.sequelize.query('SELECT "*" FROM Bets "WHERE" "date" BETWEEN data AND "data "-"86400000"')
  // console.log(userz)

  var userBet = await db.Bets.findAll({ where: [{ user_id: user.customer_id }, { type: name }], limit: 10, order: [['updatedAt', 'DESC']] })
  // let users = await db.Bets.findAll({ where: [{ user_id: user.customer_id } && { type: name } ], limit: 10, order: [ ['updatedAt',  'DESC'] ] })


//     userBet.forEach(async (item) => {
//       await db.Bets.update("what to update", {
//         where: {
//           id: item.id //this can be anything unique in your db.
//         }
//       }
// });
  
  let postGameArr = gameWon[0].odds.split(',')
  // console.log(b)
  // console.log(b.length)
  
  // let arr = [];

  for (element of userBet) {

    let elementArr = (element.stakes.split(','))
    // console.log(elementArr)
    // console.log(elementArr.length)

    const intersection = elementArr.filter(element => postGameArr.includes(element));
    console.log(intersection)

    var users = await db.User.findOne({ where: { customer_id: element.user_id } });
    var bet = await db.Bets.findOne({ where: { user_id: element.user_id } });
    
    let arr = gameWon[0].odds
    if (element.type !== 'AGAINST') {
      if (intersection) {
        if (intersection.length === 5) {
          amount = parseFlaot(element.max_possibleWinng)
          users.wallet = users.wallet + parseFlaot(element.possibleWinng);
          await users.save();

          bet.status = 'WIN';
          await bet.save();

          ///log transaction
          db.Transaction.create({
            user_id: user.id,
            amount: amount,
            type: 'credit',
            status: 'success'
          })
        } else {
          amount = parseFloat(element.min_possibleWinng) * intersection.length
          users.wallet = users.wallet + amount;
          await users.save();

          bet.status = 'WIN';
          await bet.save();

          ///log transaction
          db.Transaction.create({
            user_id: user.id,
            amount: amount,
            type: 'credit',
            status: 'success'
          })
        };
      } else {
        bet.status = 'LOSS';
        await bet.save();
      };
    };

    
    // arr.push(element)
    return res.status(200).json({gameWon, userBet, users})
  }

          



  
  























  // let game = await db.Bets.findAll({ where: { user_id: user.customer_id }})
  // let a = []
  // let b = []
  // let c = []
  // let d = []
  // let playTime;
  // let stakes;
  // let stakes1;
  // let stakes2;
  // for (let i = 0; i < userBet.length; i++){
  //   playTime = userBet[i].date
  //   stakes = userBet[i].stakes
  //   b.push(stakes)
  //   a.push(playTime)
  //   if (userBet[i].stakes1 && userBet[i].stakes2) {
  //     stakes1 = userBet[i].stakes1
  //     stakes2 = userBet[i].stakes2
  //     c.push(stakes1)
  //     d.push(stakes2)
  //   }
  // }
  // let arr1 = [];
  // let arr2 = [];

  // // console.log(day)
  // // console.log(a)

  //   // arr1.push(resultOdds)
  //   // arr2.push(userOdds)

  // const aVal = a.filter(element => element <= day)
  // const bVal = b.filter(element => element <= day)
  // const cVal = c.filter(element => element <= day)
  // const dVal = d.filter(element => element <= day)
  // // console.log(intersect)

  // for (let i = 0; i < aVal.length; i++){
  //   console.log(aVal[i])
  //   if (day - aVal[i] < 43200001) {
  //       let resultOdds = gameWon[0].odds 
  //       let userOdds = bVal
  //       let userOdds1 = cVal
  //       let userOdds2 = dVal
  //       arr1.push(resultOdds)
  //       arr2.push(userOdds)

  //     const intersect = arr1.filter(element => arr2.includes(element))
  //     if (intersect.length > 0) {
  //       userBet.status = 'WON'

  //       let user = userBet.map((use) => use)
  //       let use = user.map((use) => {
  //         use.status = 'WON'
  //       })
  //       console.log(userBet)
  //       return res.status(200).json({userBet })
  //     } else {
  //       userBet.status = 'LOST'
  //       let user = userBet.map((use) => use)
  //       let use = user.map((use) => {
  //         use.status = 'LOST'
  //       })
  //       return res.status(200).json({userBet })
  //     }
  //   } else {
  //       return res.status(200).json({message: 'No games yet'})
  //   }
  // }

  // if (day - playTime < 43200001) {

  //   console.log('down')
  //   console.log(day)
  //   console.log(playTime)
  //   console.log('up')
  //   console.log('minus')
  //   console.log(playTime - day)

  //   let resultOdds = values.odds 
  //   let userOdds = userBet.stakes
  //   let userOdds1 = userBet.stakes1
  //   let userOdds2 = userBet.stakes2
  //   arr1.push(resultOdds)
  //   arr2.push(userOdds)

  //   const intersect = arr1.filter(element => arr2.includes(element))
  //   if (intersect.length > 0) {
  //     userBet.status = 'WON'
  //     await userBet.save()
  //     console.log('won')
  //     return res.status(200).json({values, userBet})
  //   } else {
  //     userBet.status = 'LOST'
  //     await userBet.save()
  //     console.log('lost')
  //     return res.status(200).json({values, userBet})
  //   }
  // }
  return res.status(200).json({gameWon, userBet})
},

BetList: async (req, res, next) => {

  let customer_id = req.user.customer_id;
  const user = await db.User.findOne({ where: { customer_id: customer_id } })
  let user_id = user.dataValues.customer_id

  const schema = Joi.object().keys({
    amount: Joi.string().required(),
    type: Joi.string().required(),
    kind: Joi.string(),
    odd: Joi.string().required(),
    min_possibleWinning: Joi.string(),
    max_possibleWinning: Joi.string(),
    possibleWinning: Joi.string(),
    staked: Joi.string().required(),
    stakes: Joi.string(),
    stakes1: Joi.string(),
    stakes2: Joi.string(),
    date: Joi.date().required()
  }).unknown();

  const validate = Joi.validate(req.body, schema)

  if (validate.error != null) {
    const errorMessage = validate.error.details.map(i => i.message).join('.');
    return res.status(400).json(
      helpers.sendError(errorMessage)
    );
  }

  
  let amount = req.body.amount
  
  if (parseInt(user.wallet) > parseInt(amount)) {

    var balance = parseFloat(user.wallet) - parseFloat(amount);
    user.wallet = balance;
    await user.save();

    let betId = new Date().getTime().toString();

    var createBet = await db.Bets.create({
      user_id: user_id,
      bet_id: betId,
      amount: req.body.amount,
      type: req.body.type,
      kind: req.body.kind,
      odd: req.body.odd,
      min_possibleWinning: req.body.min_possibleWinning,
      max_possibleWinning: req.body.max_possibleWinning,
      possibleWinning: req.body.possibleWinning,
      staked: req.body.staked,
      stakes: req.body.stakes,
      stakes1: req.body.stakes1,
      stakes2: req.body.stakes2,
      date: req.body.date,
      status: 'PENDING'
    });
  
    if (createBet) {
      return res.status(200).json(
        helpers.sendSuccess("Bet registered Successfully")
      );
    }
    else {
      res.status(400).json(
        helpers.sendError("Error ocurred!")
      )
    }
  } else if (parseInt(user.withdrawable) >  parseInt(amount)) {
    var balance = parseInt(user.withdrawable) - parseInt(amount);
    user.withdrawable = balance;
    await user.save();

    let betId = new Date().getTime().toString();

    console.log('bet Time')
    console.log(req.body.date)

    var createBet = await db.Bets.create({
      user_id: user_id,
      bet_id: betId,
      amount: req.body.amount,
      type: req.body.type,
      kind: req.body.kind,
      odd: req.body.odd,
      min_possibleWinning: req.body.min_possibleWinning,
      max_possibleWinning: req.body.max_possibleWinning,
      possibleWinning: req.body.possibleWinning,
      staked: req.body.staked,
      stakes: req.body.stakes,
      stakes1: req.body.stakes1,
      stakes2: req.body.stakes2,
      date: req.body.date,
      status: 'PENDING'
    });
  
    if (createBet) {
      return res.status(200).json(
        helpers.sendSuccess("Bet registered Successfully")
      );
    }
    else {
      res.status(400).json(
        helpers.sendError("Error ocurred!")
      )
    }
  } else {
    return res.status(200).json(
      helpers.sendSuccess("Sorry unable to register bet because you do not have enough balance in you wallet to facilitate the transaction")
    );
  }

},

betLists: async (req, res, next) => {
  let customer_id = req.user.customer_id
  var myBets = await db.Bet.findAll({ where: { user_id: customer_id }, limit: 10, order: [ ['updatedAt',  'DESC'] ] });

  var result = {
    'user': myBets,
    'bet_id': req.user.bet_id,
    'amount': req.user.amount,
    'type': req.user.type,
    'kind': req.body.type,
    'odd': req.user.odd,
    'possibleWinning': req.user.possibleWinning,
    'staked': req.user.staked,
    'stakes': req.user.stakes,
  }

  return res.status(200).json({
    "success": {
      "status": "SUCCESS",
      result
    }
  });
},

getUsers: async (req, res, next) => {

  let customer_id = req.user.customer_id
  let user = await db.User.findOne({ where: { customer_id: customer_id } })
  let result = {
    user
  }

  if(user){
    return res.status(200).json({
      "success": "success",
      result
    });
  } else {
    return res.status(400).json(helpers.sendError("User Not Found"))
  }

},

transactions: async (req, res, next) => {
  let user_id = req.user.customer_id;
  let data = await db.Transaction.findAll({ where: { user_id: user_id } })
  let result = {
    'user': data
  }

    return res.status(200).json({
    "success": {
      "status": "SUCCESS",
      result
    }
  });
},

updatePassword: async (req, res, next) => {
  const validate = Joi.validate(req.body, updatePasswordSchema);

  if(validate.error != null)
  {
      const errorMessage = validate.error.details.map(i => i.message).join('.');
      return res.status(400).json(
          helpers.sendError(errorMessage)
      );
  }

  var user = await db.User.findOne({ where: { id: req.user.id }});
  user.password = bcrypt.hashSync(req.body.password);
  await user.save();

  return res.status(200).json(helpers.sendSuccess("Password updated successfully"));
},

setWithdrawalPin: async (req, res, next) => {
  const validate = Joi.validate(req.body, updatePinSchema);

  if(validate.error != null)
  {
      const errorMessage = validate.error.details.map(i => i.message).join('.');
      return res.status(400).json(
          helpers.sendError(errorMessage)
      );
  }

  var user = await db.User.findOne({ where: { id: req.user.id }});
  user.pin = bcrypt.hashSync(req.body.pin);
  await user.save();
  return res.status(200).json(helpers.sendSuccess("PIN updated successfully"));
},

fundWallet: async (req, res, next) => {
  const validate = Joi.validate(req.body, fundWalletSchema);

  if(validate.error != null)
  {
      const errorMessage = validate.error.details.map(i => i.message).join('.');
      return res.status(400).json(
          helpers.sendError(errorMessage)
      );
  }

  var reference = req.body.reference;

  var validateTransaction = await helpers.checkUserTransaction(reference);

  if (validateTransaction)
  {
    return res.status(400).json(
      helpers.sendError("Transaction already entered!")
    );
  }

  var url = `https://api.paystack.co/transaction/verify/${reference}`;

  var option = {
    method: 'get',
    url: url,
    headers: { 
      "Authorization": "Bearer " + process.env.PAYSTACK_SK,
      "Content-Type": "application/json"
    },
  };

  const result = await axios(option);

  try
  {
      if(result.data.data.status ==  "success")
      {
        var amount = result.data.data.amount / 100;

        var user = await db.User.findOne({ where: { id: req.user.id }});
        var balance = parseFloat(user.wallet) + parseFloat(amount);
        console.log(user)
        user.wallet = balance;
        await user.save();

        await db.Transaction.create({
          user_id: req.user.customer_id,
          amount: amount,
          reference: reference,
          type: "credit",
          method: "paystack",
          balance: balance,
          status: "success"
        });

        //send email to customer
        return res.status(200).json(helpers.sendSuccess("Wallet funded successfully"));
      }
      else
      {
        return res.status(400).json(helpers.sendError("Unable to fund wallet. Kindly try again"));
      }
  }
  catch(e)
  {
    //return res.status(400).json(e);
    return res.status(400).json(helpers.sendError("An error occurred. Pls try again later"));
  }

},

kycUpdate: async (req, res, next) => {

  const kycSchema = Joi.object().keys({
    bvn: Joi.string().min(3).required(),
    id_type: Joi.string().min(3).required(),
    id_number: Joi.string().min(3).required(),
    id_url: Joi.string().min(4).required(),
  }).unknown();

  const validate = Joi.validate(req.body, kycSchema);

  if(validate.error != null)
  {
      const errorMessage = validate.error.details.map(i => i.message).join('.');
      return res.status(400).json(
          helpers.sendError(errorMessage)
      );
  }

  var user = await db.User.findOne({ where: { id: req.user.id }});

  if(parseInt(user.kyc_status) == 1)
  {
    return res.status(400).json(
      helpers.sendError("KYC already submitted!")
    );
  }

  user.bvn = req.body.bvn.trim();
  user.id_type = req.body.id_type.trim();
  user.id_number = req.body.id_number.trim();
  user.id_url = req.body.id_url.trim();
  user.kyc_status = 1;
  await user.save();

  return res.status(200).json(helpers.sendSuccess("KYC details updated successfully"));

}

}


























