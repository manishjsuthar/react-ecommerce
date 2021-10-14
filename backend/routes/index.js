const router = require('express').Router()
const ContactForm = require('../models/contactformModel')
const { body, validationResult } = require('express-validator');
//contactform
router.get('/contactform/',async (req, res) =>{
    try {
        const contactformdetails = await ContactForm.find();
        res.json(contactformdetails)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.post('/contactform/new',
body('email').isEmail(),
 async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log('hello')
	const contactitem = new ContactForm({
		name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message
	})
	const contactsitem = await contactitem.save();
	res.json(contactsitem);
});

module.exports = router