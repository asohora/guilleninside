// 1. Elementos de HTML
// 1.1. Inputs
const h1Input = document.getElementById("h1-input");
const pInput = document.getElementById("p-input");
const imgInput = document.getElementById("img-input");
const figcaptionInput = document.getElementById("figcaption-input");
const colorInput = document.getElementById("color-input");
const backgroundColorInput = document.getElementById("background-color-input");
const reverseButton = document.getElementById("reverse-button");
// 1.2. Caracteres disponibles
const h1InputAvailableCharacters = document.getElementById("char-h1");
const pInputAvailableCharacters = document.getElementById("char-p");
const figcaptionInputAvailableCharacters = document.getElementById("char-figcaption");
// 1.3. Menú de código
const codeMenu = document.querySelector(".code");
const menuButton = document.querySelector(".menu-button");
const getButton = document.getElementById("get-button");
const putButton = document.getElementById("put-button");
const codeInput = document.getElementById("code-input");
// 1.4. Tarjeta
const card = document.querySelector(".card");
const h1 = document.querySelector("h1");
const p = document.querySelector(".text p");
const img = document.querySelector("img");
const figcaption = document.querySelector("figcaption");

// 2. Almacenamiento local
// 2.1. Variables
const currentChanges = {
	h1: h1.innerText,
	p: p.innerHTML,
	imgSrc: img.src,
	figcaption: figcaption.innerHTML,
	color: card.style.color,
	backgroundColor: card.style.backgroundColor
}
const previousChanges = JSON.parse(localStorage.getItem("changes"));
// 2.2. Funciones
// 2.2.1. Convertir RGB a HEX
function rgbToHex(rgb) {
	if (rgb.length === 7 && rgb[0] === "#") {
		return rgb;
	};
	// Obtener los números
	let color = rgb.slice(rgb.indexOf("(") + 1, rgb.indexOf(")"));
	// Quitar las comas
	color = color.replaceAll(",", "");

	// Separar los valores
	let r = color.substring(0, color.indexOf(" "));
	let g = color.substring(color.indexOf(" ") + 1, color.lastIndexOf(" "));
	let b = color.substring(color.lastIndexOf(" ") + 1);

	// Convertir las cadenas a números decimales
	r = Number(r);
	g = Number(g);
	b = Number(b);

	// Convertir los números decimales a hexadecimales
	r = r.toString(16)
	g = g.toString(16)
	b = b.toString(16)

	// Hacer que cada número tenga dos dígitos

	if (r.length === 1) {
		r = "0" + r;
	};
	if (g.length === 1) {
		g = "0" + g;
	};
	if (b.length === 1) {
		b = "0" + b;
	};
	// Devolver HEX
	return "#" + r + g + b;
};
// 2.2.2. Guardar cambios
function updateLocalStorage() {
	localStorage.setItem("changes", JSON.stringify(currentChanges));
}

// 2.3. Ejecuciones
// 2.3.1 Cargar la sesión anterior
if (previousChanges) {
	if (previousChanges.h1) {
		h1.innerText = previousChanges.h1;
		h1Input.value = previousChanges.h1;
		currentChanges.h1 = previousChanges.h1;
	};
	if (previousChanges.p) {
		p.innerHTML = previousChanges.p;
		pInput.value = previousChanges.p;
		currentChanges.p = previousChanges.p;
	};
	if (previousChanges.imgSrc) {
		img.src = previousChanges.imgSrc;
		imgInput.value = previousChanges.imgSrc;
		currentChanges.imgSrc = previousChanges.imgSrc;
	};
	if (previousChanges.figcaption) {
		figcaption.innerHTML = previousChanges.figcaption;
		figcaptionInput.value = previousChanges.figcaption;
		currentChanges.figcaption = previousChanges.figcaption;
	};
	if (previousChanges.color) {
		card.style.color = previousChanges.color;
		colorInput.value = previousChanges.color;
		currentChanges.color = previousChanges.color;
	};
	if (previousChanges.backgroundColor) {
		card.style.backgroundColor = previousChanges.backgroundColor;
		backgroundColorInput.value = previousChanges.backgroundColor;
		currentChanges.backgroundColor = previousChanges.backgroundColor;
	};
}

// 3. Caracteres disponibles
h1InputAvailableCharacters.innerText = h1Input.maxLength - h1Input.value.length;
pInputAvailableCharacters.innerText = pInput.maxLength - pInput.value.length;
figcaptionInputAvailableCharacters.innerText = figcaptionInput.maxLength - figcaptionInput.value.length;

// 4. Editor
// 4.1. Aplicar y guardar cambios
// 4.1.1. Cambios de código de HTML
pInput.addEventListener("keyup", function() {
	p.innerHTML = this.value;
	currentChanges.p = this.value;
	updateLocalStorage();
})
figcaptionInput.addEventListener("keyup", function() {
	figcaption.innerHTML = this.value;
	currentChanges.figcaption = this.value;
	updateLocalStorage();
})


// 4.1.2. Cambios de texto interno
h1Input.addEventListener("keyup", function () {
	h1.innerText = this.value;
	currentChanges.h1 = this.value;
	updateLocalStorage();
});
// 4.1.3. Cambios de atributo
imgInput.addEventListener("keyup", function() {
	img.src = this.value;
	currentChanges.imgSrc = this.value;
	updateLocalStorage();
});
// 4.1.4. Cambios de estilo
colorInput.addEventListener("change", function() {
	card.style.color = this.value;
	currentChanges.color = this.value;
	updateLocalStorage();
});

backgroundColorInput.addEventListener("change", function() {
	card.style.backgroundColor = this.value;
	currentChanges.backgroundColor = this.value;
	updateLocalStorage();
})

// 4.3. Contar los caracteres disponibles
function characters(input, charCounter) {
	input.addEventListener("keyup", function () {
		charCounter.innerText = this.maxLength - this.value.length;
		if (charCounter.innerText == 0) {
			charCounter.style.color = "red";
		} else {
			charCounter.style.color = null;
		}
	})
}
characters(h1Input, h1InputAvailableCharacters);
characters(pInput, pInputAvailableCharacters);
characters(figcaptionInput, figcaptionInputAvailableCharacters);
// 4.4. Restablecer
reverseButton.addEventListener("click", () => {
	localStorage.removeItem("changes");
	window.location.reload();
});

// 5. Menú de código
// 5.1. Mostrar u ocultar menú
menuButton.addEventListener("click", function () {
	codeMenu.classList.toggle("hidden");
})
// 5.2. Extraer código
getButton.addEventListener("click", () => {
	navigator.clipboard.writeText(JSON.stringify(currentChanges));
	alert("Código copiado");
})
// 5.3. Usar código
putButton.addEventListener("click", () => {
	if (codeInput.value[0] === "{" && codeInput.value[codeInput.value.length - 1] === "}") {
		localStorage.setItem("changes", codeInput.value);
		window.location.reload();
	} else {
		alert("Código invalido.");
	}
})
