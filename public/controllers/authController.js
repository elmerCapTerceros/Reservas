const {Router} = require('express');
const router = Router();


router.post('/signup', (req,res,next)=>{
    const {username, email, password}= req.body;
  
    res.json("resivido");
});
router.post('/signin', (req,res,next)=>{
const {username, email, password}= req.body;

res.json("resivido");
});
router.get('/me', (req,res,next)=>{
 res.json('holo meee');
});

module.exports = router;