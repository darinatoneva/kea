/*
* JavaScript calculator
* @author Darina Toneva
* Multimedia design and communication at KEA
* @link http://darina.dk/t2-projectpool/drums
*/

var drum_sounds = new Array();
var key_is_up = true;
var i = 1;
for (i = 1; i < 10; i++)
{
	drum_sounds[i] = new Audio("sounds/" + i + ".wav");
}

var drum_buttons = document.querySelectorAll(".drum_button");
var i = 0;
for (i = 0; i < drum_buttons.length; i++) {
	AddDrumButtonListener("#d"+drum_buttons[i].value)
}


function AddDrumButtonListener(selector)
{
	var button = document.querySelector(selector);
	button.addEventListener("click", function () {
		button.classList.add("pressed_buton");
		drum_sounds[button.value].currentTime = 0;
		drum_sounds[button.value].play();
	});
}

document.addEventListener("keydown", function (event) {

	// the corresponding ASCII code of the pressed key
	var key_code = event.keyCode;

	// the offset we need to substract from the ASCII code to align the pressed key to 1..9
	var offset = 0;

	// if the pressed key is between 1 and 9 on the numeric keypad of the keyboard
	if (key_code > 96 && key_code < 106)
	{
		offset = 96;
	} 
	// if the pressed key is between 1 and 9 on the alphanumeric keys area of the keyboard
	else if (key_code > 48 && key_code < 58)
	{
		offset = 48;
	}


	if (offset > 0 && key_is_up) 
	{
		var button_number = event.keyCode - offset;
		var selector = "#d" + button_number;
		var button = document.querySelector(selector);
		button.click();
		key_is_up = false;
	}
});

document.addEventListener("keyup", function (event) {
	key_is_up = true;
	clean_button_pressed_effect();
});

document.addEventListener("mouseup", function (event) {
	clean_button_pressed_effect();
});

function clean_button_pressed_effect()
{
	var i = 0;
	for (i = 0; i < drum_buttons.length; i++) {
	drum_buttons[i].classList.remove("pressed_buton");
	drum_buttons[i].blur();
	}
}