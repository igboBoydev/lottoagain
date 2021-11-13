var Sequelize = require('sequelize');

var PasswordReset = (sequelize, type) => {
  return sequelize.define('password_reset', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: Sequelize.INTEGER,
    token: Sequelize.STRING,
    used: Sequelize.INTEGER
  })
}

module.exports = PasswordReset;








// transferFund:  async (req, res, next) => {
//   const transferFundSchema = Joi.object().keys({
//     customer_id: Joi.string().required(),
//     amount: Joi.number().required(),
//     sender_Id: Joi.string().required()
//   }).unknown()

//   const validateTransferSchema = Joi.validate(req.body, transferFundSchema);

  
//   if(validateTransferSchema.error !== null){
//     const errorMessage = validateTransferSchema.error.details.map(i => i.message).join('.');
//     return res.status(400).json(
//       helpers.sendError(errorMessage)
//     );
//   }

//     // getting sender and receiver wallet 

//   const senderIdDb = await db.User.findOne({ where: { customer_id: req.body.sender_Id } })
//   const receiverIdDb = await db.User.findOne({ where: { customer_id: req.body.customer_id } });
//   let senderWalletDb = Math.florr(senderIdDb.wallet);
//   let receiverWalletDb = Math.floor(receiverIdDb.wallet)
//   let amount = parseFloat(req.body.amount);
    

//   if (amount < senderWalletDb) {
//     const receiverEmail = receiverIdDb.email;
//     if (amount > 0) {
//       let userBalance = senderWalletDb - amount
//       let receiverBalance = receiverWalletDb + amount;



//       senderWalletDb = userBalance
//       receiverWalletDb = receiverBalance

//         //       var amount = result.data.data.amount / 100;

//         // var user = await db.User.findOne({ where: { id: req.user.id }});
//         // var balance = parseFloat(user.wallet) + parseFloat(amount);
//         // user.wallet = balance;
//         // await user.save();

      

      



//       await senderIdDb.save();
//       await receiverIdDb.save();


//       try {

//         await db.Transaction.create(
//           {
//             sender_id: senderIdDb.customer_id,
//             receiver_id: receiverIdDb.customer_id,
//             amount: amount,
//             senderBalance: userBalance,
//             receiverBalance: receiverBalance,
//             type: "transfer",
//             status: "success",
//           }
//         );
//       } catch (error) {
//         console.log(`cannot create table because: ${error}`)
//       }
//       return res.status(200).json({ success: true, message: `You successfully transfered #${amount} to user with email ${receiverEmail}`, senderWalletDb, receiverWalletDb, amount, userBalance, receiverBalance, senderIdDb, receiverIdDb })
//     } else {
//       res.status(400).json({success: false, message: "Please input a valid amount"})
//     }
//     } else {
//       res.status(400).json({success: false, message: "Insufficient fund please fund your account and try again later Thanks..."})
//   }
// },
