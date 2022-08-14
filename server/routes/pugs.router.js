const router = require('express').Router()
const {Pug, Coffee} = require('../models')

// Your code here!
// Remember that these routes are already mounted on
// /api/pugs!

router.get("/", async (req, res, next) => {
    try {
      const pug = await Pug.findAll();
      res.send(pug).status(201);
    } catch (error) {
      next(error);
    }
  });

module.exports = router

router.get("/favoriteCoffee/:favoriteCoffeeName", async (req, res, next) => {
    try {
        const pug = await Pug.findByCoffee(req.params.favoriteCoffeeName);
        res.send(pug).status(201);
    } catch (error) {
      next(error);
    }
  });

  router.get('/:pugId', async (req, res, next)=>{
    try {
        let id = req.params.pugId;
        const pug = await Pug.findAll();
        for(let i = 0; i < pug.length;i++){
            if (pug[i].id == id){
                res.send(pug[i])
            }
        }
        res.sendStatus(404);

    } catch (error) {
      next(error);
    }
  })

router.post('/', async(req, res, next)=>{
    try {
        const newPug = await Pug.create({
            name: req.body.name
        })
        res.status(201).json(newPug)

    } catch (error) {
      next(error);
    }
})

router.put('/:pugId', async (req, res, next)=>{
    try {
        let id = req.params.pugId;
        let pug = await Pug.findAll();
        for(let i = 0; i < pug.length;i++){
            if (pug[i].id == id){
               pugUpdate = pug[i];
            }
            else if(i == pug.length-1){
                pugUpdate = undefined;
            }
        }
        if(!pugUpdate){
            res.sendStatus(404);
        }
        let updatedPug = await pugUpdate.update({favoriteCoffeeId: req.body.favoriteCoffeeId})
        res.send(updatedPug);

    } catch (error) {
      next(error);
    }
  })

module.exports = router
