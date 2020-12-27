setInterval(() => {
    date= new Date();
    h=date.getHours();
    m=date.getMinutes();
    s=date.getSeconds();
    console.log(h+":"+m+":"+s);

    hrotation= 30*h + m/2;
    mrotation= 6*m;
    srotation= 6*s;
    console.log(hrotation+":"+mrotation+":"+srotation);

    $("#hour").css("transform", `rotate(${hrotation}deg)`);
    $("#minute").css("transform", `rotate(${mrotation}deg)`);
    $("#second").css("transform", `rotate(${srotation}deg)`);

}, 1000);