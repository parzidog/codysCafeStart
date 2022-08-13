const Sequelize = require('sequelize')
const db = require('./database')
const Op=Sequelize.Op;

const Coffee = db.define('coffee', {
  name:{
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  ingredients: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
})

Coffee.prototype.getIngredients = function () {

  return this.ingredients.join(', ');
}

Coffee.findByIngredient = (ingredient) =>{
  return Coffee.findAll({
    where: {
      ingredients: {
        [Op.contains]: [ingredient]
      }
    }
  })
}

Coffee.beforeValidate(validate);

function validate(coffee){
  if(!coffee.ingredients.includes('love')){
    coffee.ingredients.push('love');
  }
  }

module.exports = Coffee
