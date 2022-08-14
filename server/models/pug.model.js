const Sequelize = require('sequelize')
const db = require('./database')
const Coffee = require('./coffee.model')

const Pug = db.define('pugs', {
  name:{
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    defaultValue: 0
  },
  biography: {
    type: Sequelize.STRING(2500),
    allowNull: false,
    validate: {
      notEmpty: true
    },
    defaultValue: 'Set bio'
  },
})

Pug.prototype.isPuppy = function(){
  if(this.age < 1){
    return true;
  }
  else{
    return false;
  }
}

Pug.prototype.shortBio = function(){
  let bio = this.biography.split('.').join(',').split('!').join(',').split('?').join(',').split(',');
  return bio[0];

}

Pug.findByCoffee = async function(coffee){
  const findCoffee = await Coffee.findOne({where:{name: coffee}});
  const pugWithCoffee = await Pug.findAll({
    where: {favoriteCoffeeId: findCoffee.id},
    include: [{model: Coffee, 
      as: 'favoriteCoffee'}]
  })

  return pugWithCoffee;
}

Pug.beforeValidate(nameCase)

function nameCase(pug){
  pug.name = pug.name[0].toUpperCase() + pug.name.slice(1);
}

module.exports = Pug
