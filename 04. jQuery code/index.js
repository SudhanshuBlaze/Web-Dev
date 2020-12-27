$("h1").css("color","red");
$("h1").addClass("biggie"); //remove or add a class(can be Toggled)
$("h1").text("GoodBye"); //replaces the code inside with your text
$("button").html("<em> Don't click me </em>");  //replaces the code insides with your html 

// Setting Attributes if 2 param ,gets the attribute if one para
$("img").attr("src","nan.png");
$("a").attr("href","https//:bing.com");

$("button").click(function (e) {    //click event listener to all the buttons
    $("h1").fadeToggle();   //inbuilt animation
    // $("h1").css("color","blue");    
});

$(document).keypress(function (e) { 
    $("h1").html(e.key);
});

    //Animation with jQuery
$("h1").on("click", function () {
    $("h1").animate({   //animate method only works with numeric value
        margin:"10% 30%",
    })
});
