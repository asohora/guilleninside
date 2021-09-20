// To change colours
	// Variables
	const colorInput = document.getElementById("color");
	const backgroundColorInput = document.getElementById("background-color");
	const card = document.querySelector(".card");
		
	// Functions
	colorInput.addEventListener("change", function(){
		card.style.color = colorInput.value;
	})
	backgroundColorInput.addEventListener("change", function(){
		card.style.backgroundColor = backgroundColorInput.value;
	})

// To change the font size of the heading
	// Variables
	const h1 = document.querySelector("h1");
	const fontSizeMinusInput = document.getElementById("minus");
	const fontSizePlusInput = document.getElementById("plus");
	
	// Functions
	function increaseFontSize(operator) {
		let fontSize = window.getComputedStyle(h1, null).getPropertyValue("font-size");
		let fontSizeInNumber = Number(fontSize.slice(0, fontSize.indexOf("p")));
		if (operator == "+"){
			fontSizeInNumber += 3;
		} else {
			fontSizeInNumber -= 3;
		}
		h1.style.fontSize = fontSizeInNumber + "px";	
	}

	plus.addEventListener("click", function(){
		increaseFontSize("+");
	})

	minus.addEventListener("click", function(){
		increaseFontSize("-");
	})



// To show or hide the menu
	// Variables
	const toggleButton = document.querySelector(".toggle-button");
	const menu = document.querySelector(".menu");

	// Functions
	toggleButton.addEventListener("click",function(){
		menu.classList.toggle("open");
	})