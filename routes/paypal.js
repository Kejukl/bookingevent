var express=require("express");
var router=express.Router();
const paypal=require("paypal-rest-sdk")

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'Adf-sB2jzMDvTqihiI1vp4lh91TOr1Lhj_FHXjhfjk-QZwtj9ItIoCwuhaJ9CRFibFxXif0LLCRrjwqP',
    'client_secret': 'EKZATljKAAf0goXQgncq8nUgHYuujey85oiyCQZBakr4LF0A4SJZVt_h-HSUoqgcCQ1Yl2m-_THzV5jm'
  });

router.post('/pay1',(req,res)=>{
    //
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:5000/pay/success",
            "cancel_url": "http://localhost:5000/dashboard"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "item",
                    "sku": "item",
                    "price": "1.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "1.00"
            },
            "description": "This is the payment description."
        }]
    };
    //
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment.links);
            for(let i = 0; i < payment.links.length; i++){
                if(payment.links[i].rel==='approval_url'){
                    //res.redirect(payment.links[i].href)
                    res.send({link:payment.links[i].href})
                }
            }
        }
    });
    //
    console.log('end of post')
})



router.get('/success',(req,res)=>{
    console.log(req.query)
    const paymentId=req.query.paymentId;
    const payerID=req.query.PayerID;
    var execute_payment_json = {
        "payer_id": payerID,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "1.00"
            }
        }]
    };
    //
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
            res.redirect("http://localhost:5000/dashboard")
        }
    });

})

module.exports=router
