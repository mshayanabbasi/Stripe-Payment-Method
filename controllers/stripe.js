const stripe = require('stripe');

exports.getClientSecret = async (req, res) => {
  try {
    const paymentIntent = await stripe(
      process.env.STRIPE_SECRET_KEY,
    ).paymentIntents.create({
      amount: 100,
      currency: 'usd',
      payment_method_types: ['card_present'],
      capture_method: 'manual',
    });
    res.status(200).json({client_secret: paymentIntent.client_secret});
  } catch (error) {
    res.status(500).json({error});
  }
};

// exports.collectPayment = async (req, res) => {
//   try {
//     const result = await stripe.terminal.collectPaymentMethod("pi_1IzhdwLKAW7p0rfJQG9oPsO5_secret_88toWnIN3ul383d5KzgEySC7X");
//     if (result.error) {
//         console.log(result.error)
//       // Placeholder for handling result.error
//     } else {
//       // Placeholder for processing result.paymentIntent
//     }
//     res.status(200).json({result});
//   } catch (error) {
//       console.log(error)
//     res.status(500).json({error});
//   }
// };

exports.connectionToken = async (req, res) => {
    try {
        let connectionToken = stripe(
            process.env.STRIPE_SECRET_KEY,
          ).terminal.connectionTokens.create();

         const token = await connectionToken;

        
         res.status(200).json({secret: token.secret});

    } catch (error) {
        console.log(error, 'err')
        res.status(500).json({error})
    }
}

exports.retrieveBalance = async (request, response) => {
    try {
      await stripe(process.env.STRIPE_SECRET_KEY).balance.retrieve(function (
        err,
        balance
      ) {
        if (err) {
          throw err;
        }
  
        response.status(200).json({ balance });
      });
    } catch (error) {
      response.status(500).json({ error });
    }
  };

  exports.getPaymentIntent = async (request, response) => {
    try {
      const intentId = request.header("Intent-Id");
  
      const intent = await stripe(
        process.env.STRIPE_SECRET_KEY
      ).paymentIntents.retrieve(intentId);
  
      response.status(200).json({ intent });
    } catch (error) {
      response.status(500).json({ error });
    }
  };
  