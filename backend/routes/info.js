const router=require('express').Router();
let Info=require('../model/info.model');

//get all of info
router.route('/').get((req,res)=>
{
Info.find()
.then(info=>res.json(info))
.catch(error=>res.status(400).json('Error'+error));
}
);

//add one info by username
router.route('/add').post((req,res)=>
{
    const username=req.body.username;
    const weight=Number(req.body.weight);
    const date=Date.parse(req.body.date);

    const newinfo=new Info ({username,weight,date});
    
    newinfo.save()
.then(()=>res.json("info added"))
.catch(error=>res.status(400).json('Error'+error));
}
);

//delete all infos
router.route('/delete').delete((req,res)=>
{
Info.deleteMany()
 .then(() =>res.json("Delete all of the information"))
    .catch(error=>res.status(400).json('Error'+error));
}
);

// delete one info by id
router.route('/:id').delete((req,res)=>
{
Info.findByIdAndDelete(req.params.id)
 .then(() =>res.json("Delete only one information"))
    .catch(error=>res.status(400).json('Error'+error));
}
);

// get one info by id
router.route('/:id').get((req,res)=>
{
Info.findById(req.params.id)
 .then(info =>res.json(info))
    .catch(error=>res.status(400).json('Error'+error));
}
);

//update one by info's id
router.route('/update/:id').post((req,res)=>
{
 Info.findById(req.params.id)
 .then((info)=>{
 
    info.username=req.body.username;
    info.weight=Number(req.body.weight);
    info.date=Date.parse(req.body.date);

    info.save()
.then(()=>res.json("info updated"))
.catch(error=>res.status(400).json('Error'+error));
 })
 .catch(error=>res.status(400).json('Error'+error));
});

module.exports=router;