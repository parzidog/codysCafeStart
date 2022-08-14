const express = require('express');
const router = express.Router()
const {Coffee} = require('../models')

// Your code here!
// Remember that these routes are already mounted on
// /api/coffee!

// parses url-encoded bodies
router.use(express.urlencoded({ extended: false }));

// parses json bodies
router.use(express.json())

router.get("/", async (req, res, next) => {
    try {
      const coffee = await Coffee.findAll();
      res.send(coffee).status(201);
    } catch (error) {
      next(error);
    }
  });

router.get('/:id', async (req, res, next) => {
    try{
        const coffee = await Coffee.findById(req.params.id)
        if(!coffee) res.sendStatus(404)
        else res.json(coffee)
    }
    catch(error){
        next(error);
    }
})

router.get('/ingredients/:ingredientName', async (req, res, next) => {
    try{
        const ingredient = req.params.ingredientName;
        const coffee = await Coffee.findByIngredient(ingredient);
        res.send(coffee);
    }
    catch(error){
        next(error);
    }
})

router.post('/', async (req, res, next) => {
    try {
        const newCoffee = await Coffee.create({
            name: req.body.name
        })
        res.status(201).json(newCoffee)
    } 
    catch(error){
        next(error);
    }
})

module.exports = router
