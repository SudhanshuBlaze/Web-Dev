const users = [
    { fn: "akshay", ln: "saini", age: 26 },
    { fn: "donald", ln: "trump", age: 75 },
    { fn: "deepika", ln: "padukone", age: 26 },
    { fn: "elon", ln: "musk", age: 50 }
];

//using reduce 
const output1 = users.reduce((acc, curr) => {
    if (curr.age < 30) {
        acc[curr.fn] = curr.age;
    }
    return acc;
}, {});
console.log(output1);

//using chaining
const output2 = users.filter(x => x.age < 30)
    .map(x => x.fn);
console.log(output2);
