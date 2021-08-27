const mongoose = require('mongoose');

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/fruitsDB', 
  {useNewUrlParser: true, useUnifiedTopology: true});
};

const fruitSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, "why no name?"]
    },
    rating:{
        type: Number,
        min:[0, "rating should be >= 0"],
        max:[10,"rating should be <= 10"],
        required: [true, "Please rate"]
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);
const pineapple = new Fruit({
    name: "pineapple",
    rating: 2,
    review: " fruit juice"
});

const avocado = new Fruit({
    name: "avocado",
    rating: 2,
    review: "expensive fruit"
});

const mango = new Fruit({
    name: "mango",
    rating: 7,
    review: "yum yum!!"
});
mango.save();
// pineapple.save();
// avocado.save();

const personSchema=mongoose.Schema({
    name: String,
    age: Number,
    favFruit: fruitSchema
})
const Person=mongoose.model("Person", personSchema);
const person1 =new Person({
    name:"Sudhanshu",
    age:20,
    favFruit: pineapple
});
const person2 =new Person({
    name:"Sudhanshu",
    age:20,
});

// person2.save();
// person1.save();
update().catch(err=> console.log(err))
async function update() {
    const res=await Person.updateOne({_id:"612939500477b41f23532d63"},{favFruit:pineapple}); 
    console.log(res);
}