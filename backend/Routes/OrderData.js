const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/orderData', async (req, res) => {
    try {
        let data = req.body.order_data;
        data.unshift({ Order_date: req.body.order_date }); // You can use unshift to add an element to the beginning of the array.

        // Check if the email exists in the database
        let existingOrder = await Order.findOne({ 'email': req.body.email });

        if (!existingOrder) {
            // If the email doesn't exist, create a new Order document
            await Order.create({
                email: req.body.email,
                order_data: [data]
            });
        } else {
            // If the email exists, push the new data to the existing order_data array
            await Order.findOneAndUpdate({ email: req.body.email },
                { $push: { order_data: data } });
        }

        res.json({ success: true });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});
router.post('/myOrderData', async (req, res) => {
    try {
        console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
        //console.log(eId)
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
    

});

module.exports = router;
