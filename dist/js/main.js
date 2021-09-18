/*------------
***Nav menu***
------------*/

const nav = document.querySelector("nav");
const navButton = document.querySelector(".nav-button");

navButton.addEventListener("click", function(){
	nav.classList.toggle("open");	
});


/*---------------
***teach form ***
---------------*/

const learnForm = document.getElementById("learn");
const fixForm = document.getElementById("fix");
const learnButton = document.getElementById("learn-button");
const fixButton = document.getElementById("fix-button");
const closeLearnFormButton = document.getElementById("close-learn-form");
const closeFixFormButton = document.getElementById("close-fix-form");


learnButton.addEventListener("click", function(){
	learnForm.classList.remove("hidden");	
})

fixButton.addEventListener("click", function(){
	fixForm.classList.remove("hidden");	
})

closeLearnFormButton.addEventListener("click", function(){
	learnForm.classList.add("hidden");	
})

closeFixFormButton.addEventListener("click", function(){
	fixForm.classList.add("hidden");	
})