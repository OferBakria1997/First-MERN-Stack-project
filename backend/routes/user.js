const router=require('express').Router();
let User=require('../model/user.model');

router.route('/').get((req,res)=>
{
User.find()
.then(users=>res.json(users))
.catch(error=>res.status(400).json('Error'+error));
}
);

router.route('/add').post((req,res)=>
{
    const username=req.body.username;
    
    const newuser=new User ({username});
    
    newuser.save()
.then(()=>res.json('user added'))
.catch(error=>res.status(400).json('Error'+error));
}
);

router.route('/delete').delete((req,res)=>
{
User.deleteMany()
 .then(() =>res.json("Delete all of the users"))
    .catch(error=>res.status(400).json('Error'+error));
}
);
module.exports=router;