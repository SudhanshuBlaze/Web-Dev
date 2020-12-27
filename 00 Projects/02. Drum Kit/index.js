
// Detecting Button Press
for(var i=0;i<document.querySelectorAll("button").length;i++){
    document.querySelectorAll("button")[i].addEventListener("click",function(){
        drumSound(this.innerText);
        buttonAnimations(this.innerText);
    })
    // this.style.color="white";  //this keyword gets the current object:document.querySelectorAll("button")
}    

// Detecting KeyBoard Press
document.addEventListener('keypress', function(event){
    drumSound(event.key);
    buttonAnimations(event.key);
});

function drumSound(key){
    switch (key) {
        case "w":
            var audio=new Audio("sounds/tom-1.mp3")
            audio.play();
            break;
        case "a":
            var audio=new Audio("sounds/tom-2.mp3")
            audio.play();
            break;
        case "s":
            var audio=new Audio("sounds/tom-3.mp3")
            audio.play();
            break;
        case "d":
            var audio=new Audio("sounds/tom-4.mp3")
            audio.play();
            break;
        case "j":
            var audio=new Audio("sounds/crash.mp3")
            audio.play();
            break;
        case "k":
            var audio=new Audio("sounds/kick-bass.mp3")
            audio.play();
            break;
        case "l":
            var audio=new Audio("sounds/snare.mp3")
            audio.play();
            break;
        default:
            console.log("key");
            break;
    }
}

function buttonAnimations(key){
    var button= document.querySelector("."+key);
    button.classList.add("pressed");

    setTimeout(()=> {
        button.classList.remove("pressed")
    }, 100);
}