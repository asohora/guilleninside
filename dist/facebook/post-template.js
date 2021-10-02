const h1Input = document.getElementById("h1-input");
const h1InputAvailableCharacters = document.getElementById("char-h1");
const pInput = document.getElementById("p-input");
const pInputAvailableCharacters = document.getElementById("char-p");
const imgInput = document.getElementById("img-input");
const imgInputAvailableCharacters = document.getElementById("char-img");
const figcaptionInput = document.getElementById("figcaption-input");
const figcaptionInputAvailableCharacters = document.getElementById("char-figcaption");

const colorInput = document.getElementById("color-input");
const backgroundColorInput = document.getElementById("background-color-input");

const applyButton = document.getElementById("edit-button");
const reverseButton = document.getElementById("reverse-button");

const h1 = document.querySelector("h1");
const p = document.querySelector(".text p");
const img = document.querySelector("img");
const figcaption = document.querySelector("figcaption");
const card = document.querySelector(".card");

function rgbToHex(rgb) {
	// To get the numbers
	let color = rgb.slice(rgb.indexOf("(") + 1, rgb.indexOf(")"));
	
	// To remove the commas
	color = color.replaceAll(",","");
	
	// To separate the values
	let r = color.substring(0, color.indexOf(" "));
	let g = color.substring(color.indexOf(" ") + 1, color.lastIndexOf(" "));
	let b = color.substring(color.lastIndexOf(" ") + 1);
	
	// To convert the strigs to numbers
	r = Number(r);
	g = Number(g);
	b = Number(b);
	
	// To convert the numbers to hexadecimal numbers
	r = r.toString(16)
	g = g.toString(16)
	b = b.toString(16)
	
	return "#" + r + g + b;
};

const changes = {};


// Local storage
const previousChanges = JSON.parse(localStorage.getItem("changes"));


if (previousChanges.h1) {
	// Card
	previousChanges.color = rgbToHex(previousChanges.color);
	previousChanges.backgroundColor = rgbToHex(previousChanges.backgroundColor);
	h1.innerHTML = previousChanges.h1;
	p.innerHTML = previousChanges.p;
	figcaption.innerHTML = previousChanges.figcaption;
	img.src = previousChanges.imgSrc;
	card.style.color = previousChanges.color;
	card.style.backgroundColor = previousChanges.backgroundColor;
	
	// Input area
	h1Input.value = previousChanges.h1;
	pInput.value = previousChanges.p;
	figcaptionInput.value = previousChanges.figcaption;
	imgInput.value = previousChanges.imgSrc;
	colorInput.value = previousChanges.color;
	backgroundColorInput.value = previousChanges.backgroundColor;
	
	h1InputAvailableCharacters.innerText = h1Input.maxLength - h1Input.value.length;
	pInputAvailableCharacters.innerText = pInput.maxLength - pInput.value.length;
	figcaptionInputAvailableCharacters.innerText = figcaptionInput.maxLength - figcaptionInput.value.length;
	
};



// Available characters
	function characters(input, charCounter) {
		input.addEventListener("keyup", function() {
			charCounter.innerText = this.maxLength - this.value.length;
			if (charCounter.innerText == 0) {
				charCounter.style.color = "red";
			} else {
				charCounter.style.color = null;
			}
		})
	}

	characters(h1Input,h1InputAvailableCharacters);
	characters(pInput,pInputAvailableCharacters);
	characters(figcaptionInput,figcaptionInputAvailableCharacters);
	
//


// To apply and save changes

applyButton.addEventListener("click", () => {
	//Form validation
	if (h1Input.value.length === 0) {
		event.preventDefault();
		h1Input.focus();		
	} else if (pInput.value.length === 0) {
		event.preventDefault();
		pInput.focus();
	} else if (imgInput.value.length === 0){
		event.preventDefault();
		imgInput.focus();
	}	else if (figcaptionInput.value.length === 0) {
		event.preventDefault();
		figcaptionInput.focus();
	} else {
		
	// To apply changes
		h1.innerHTML = h1Input.value;
		p.innerHTML = pInput.value;
		figcaption.innerHTML = figcaptionInput.value;
		img.src = imgInput.value;
		card.style.color = colorInput.value;
		card.style.backgroundColor = backgroundColorInput.value;
		
	//To save changes
		changes.h1 = h1.innerHTML;
		changes.p = p.innerHTML;
		changes.figcaption = figcaption.innerHTML;
		changes.imgSrc = img.src;
		changes.color = card.style.color;
		changes.backgroundColor = card.style.backgroundColor;
		changesJSON = JSON.stringify(changes);
		localStorage.setItem("changes", changesJSON);
	}	
	
})

// To remove changes

reverseButton.addEventListener("click", () => {
	localStorage.removeItem("changes");
	window.location.reload();
	
})


// To get code
const getButton = document.getElementById("get-button");
const codeOutput = document.getElementById("code-output");
const putButton = document.getElementById("put-button");
const codeInput = document.getElementById("code-input")

getButton.addEventListener("click", () => {
	codeOutput.innerText = localStorage.getItem("changes");
})

putButton.addEventListener("click", () => {
	if (codeInput.value[0] === "{" && codeInput.value[codeInput.value.length - 1] === "}") {
		localStorage.setItem("changes",codeInput.value);
		window.location.reload();
	} else {
		alert("Código invalido.");
	}
	
})
