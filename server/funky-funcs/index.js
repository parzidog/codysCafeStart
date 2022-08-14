const intersection = (arr1, arr2) => {
  let array = [];
  for (let i = 0;i<arr1.length;i++){
    if (arr2.includes(arr1[i])){
      array.push(arr1[i]);
    }
  }
  return array;
}

const flattenDeep = (arr) => {
  let array = [];
  console.log(arr)
  for(let i = 0;i <arr.length;i++){
    if(arr[i].length){
      for(let j = 0;j<arr[i].length;j++){
        array.push(arr[i][j]);
      }
    }
    else{
      array.push(arr[i]);
    }
    console.log(array)
    return array;
  }

}

const flipArguments = (func) => {

}

const invert = (obj) => {

}

const camelCase = (str) => {
let camelCase = str.toLowerCase().split(' ').join(',').split('_').join(',').split(',')
for(let i = 0;i<camelCase.length;i++){
  if(camelCase[i] == ''){
    camelCase.splice(i,1);
  }
  else if( i > 0){
    camelCase[i] = camelCase[i][0].toUpperCase() + camelCase[i].slice(1);
  }
  }
camelCase = camelCase.join('');

return camelCase;
}

module.exports = {
  intersection,
  flattenDeep,
  flipArguments,
  invert,
  camelCase
}
