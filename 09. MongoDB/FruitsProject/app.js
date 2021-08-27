const mongoose = require('mongoose');

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/fruitsDB', 
  {useNewUrlParser: true, useUnifiedTopology: true});
};

//validation prevents the data that doesn't match to be inserted
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
//This is our model using which documents(json data) are created 
//note in the collection it makes the "Fruit" plural -> "fruits" 
const Fruit = mongoose.model("Fruit", fruitSchema);

//create a document using our Fruit model this will stick to the fruitSchema
const apple = new Fruit({
    name: "apple",
    rating: 2,
    review: "okay fruit"
});
// apple.save() ;

const personSchema=mongoose.Schema({
    name: String,
    age: Number
})
const Person=mongoose.model("Person", personSchema);
//creating document using model "Person"
//person collection is converted to "people "
const person =new Person({
    name:"Sudhanshu",
    age:20
});
// person.save();

//InsertMany
// const banana= new Fruit({
//     name:"banana",
//     rating:5,
//     review:"weird texture"
// });
// const orange= new Fruit({
//     name:"orange",
//     rating:8,
//     review:"sweet sour"
// });
// const kiwi= new Fruit({
//     name:"kiwi",
//     rating:10,
//     review:"must be yummy"
// });

// Fruit.insertMany([banana,orange,kiwi],(err)=>{
//     if(err)
//         console.log(err);
//     else
//         console.log("Successfully inserted fruits");
// });

// insert().catch(err=>console.log(err));
// async function insert() {
//     await Fruit.insertMany([{
//         name: "Guava",
//         rating:6,
//         review:"Nice"
//     }])
//     console.log("Data inserted");
// }

// update().catch(err=> console.log(err));
// async function update() {
//     const res=await Fruit.updateOne({_id:"6128a1e09b86f959a35cd311"}, {name:"Apple"})
//     console.log(res.n);
//     console.log("Number of documents matched "+  res.n);
//     console.log("Number of documents modified"+  res.nModified);
// }

// del().catch(err=> console.log(err));
// async function del(){
//     const res=await Fruit.deleteOne({_id:"6128a155fbfc9e4cc80bcd3a"});
//     console.log("Number of documents matched "+ res.n);
//     console.log("Number of documents modified "+res.nModified);
// }

// delMany().catch(err=>console.log(err));
// async function delMany(){
//     const res= await Person.deleteMany({name:"Sudhanshu"});
//     console.log("Number of documents matched "+ res.n);
//     console.log("Number of documents deleted "+ res.deletedCount);
//     console.log(res);
// }

//using Promises
// Fruit.find().then(fruits=>{
//     mongoose.connection.close();
//     fruits.forEach(fruit=>{ 
//         console.log(fruit.name);
//     })
// }).catch(err=>{
//     console.log(err);
// })

//using async-await
display().catch(err => console.log(err));
async function display() {
    const fruits=await Fruit.find();

    fruits.forEach(fruit=>{
        console.log(fruit);
    })
}
