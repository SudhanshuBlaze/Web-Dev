let today =new Date();

exports.getDate= ()=>{
let today =new Date();
    let options= {
        weekday:"long",
        day:"numeric",
        month: "long"
    }
    return today.toLocaleDateString("en-US", options);
}

exports.getDay= ()=>{
    let options= {
        weekday:"long",
    }
    return today.toLocaleDateString("en-US", options);
}
