const express=require('express');
const router=express.Router();
const {check,validationResult}=require('express-validator/check');
const User=require('../../models/User');
const gravatar=require('gravatar');
const bcrypt=require('bcryptjs');
//@ Route -> api/users
//@ Desc - This route registers the user
router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check('password','Please enter a password with 6 or more characters').isLength({min:6}),

],async (req,res)=>{ 
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        res.status(400).json({errors:errors.array()});
    }
    try{
        const {email,password,name}=req.body;
        //test if the user exists
        let user=await User.findOne({email});

        if(user)
        {
            res.status(400).json({errors:[{msg:'User already exists .'}]});
        }
        //load gravatar
        const avatar=gravatar.url(email,{
            s:'200',
            r:'pg',
            d:'mm'
        });

        user=new User({ //user instance
            name,
            email,
            avatar
        });

        //password encryption
        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(password,salt);

        await user.save();

        res.send('user registered');
    }
    catch(err)
    {
        console.log('error is--->',err.message);
        res.status(500).send('Internal server error .')
    }
    
});



module.exports=router;
