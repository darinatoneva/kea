/*
* JavaScript calculator
* @author Darina Toneva
* Multimedia design and communication at KEA
* @link http://darina.dk/t2-projectpool/calculator 
*/

const DISP = document.querySelector("#input_field");
DISP.value = 0;
var current_number = 0;
var memory_number = 0;
var is_operation_clicked = false;
var last_operation_clicked = null;
var number_buttons = document.querySelectorAll(".number_button");
var operation_buttons = document.querySelectorAll(".operation_button");

var i=0;
for (i = 0; i < number_buttons.length; i++) {
	AddNumberButtonListener("#b"+number_buttons[i].value)
}

var i=0;
for (i = 0; i < operation_buttons.length; i++) {
	AddOperationButtonListener("#"+operation_buttons[i].id)
}

function AddNumberButtonListener(selector)
{
	document.querySelector(selector).addEventListener("click", function () {
		if (is_operation_clicked || DISP.value == "0") DISP.value = "";
		DISP.value += document.querySelector(selector).value;
		is_operation_clicked = false;
	});
}

function AddOperationButtonListener(selector)
{
	var button = document.querySelector(selector);
	button.addEventListener("click", function () {
		if (!is_operation_clicked || last_operation_clicked != button)
		{
			current_number = parseFloat(DISP.value);
			if (last_operation_clicked == button){
				switch(button.id) {
				  case "sum":
				    memory_number += current_number;	
				    break;
				  case "substract":
				    memory_number -= current_number;	
				    break;
				  case "multiply":
				    memory_number *= current_number;	
				    break;
				  case "division":
				    memory_number /= current_number;	
				    break;
				}								
			} else {
				memory_number = current_number;	
			} 		
			DISP.value = memory_number;	
			is_operation_clicked = true;
			last_operation_clicked = button;
		}
		});
}

document.querySelector("#equals").addEventListener("click", function () {
	if (last_operation_clicked != document.querySelector("#equals"))
	{
		last_operation_clicked.click();
	}
	last_operation_clicked = document.querySelector("#equals");
});

document.querySelector("#reset").addEventListener("click", function () {
	current_number = 0;
	memory_number = 0;
	is_operation_clicked = false;
	last_operation_clicked = null;
	DISP.value = 0;	
});