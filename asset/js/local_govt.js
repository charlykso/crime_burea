
var state = ["Select your Local Government", "Aba North", "Aba South", "Arochukwu", "Bende", "Ikwuano", "Isiala Ngwa North", 
			"Isiala Ngwa South", "Isuikwuato", "Obi Ngwa", "Ohafia", "Osisioma Ngwa", "Ugwunagbo", "Ukwa East", 
			"Ukwa East", "Ukwa West", "Umuahia North", "Umuahia South", "Umu Nneochi"];
			
var stlstate = document.getElementById('stlState2');
for (var i = 0; i<state.length; i++) {
	var optionState = document.createElement('option');
	optionState.innerHTML = state[i];
	stlstate.options.add(optionState);
}
function populate(selElement1, selElement2) {
	selElement1 = document.getElementById(selElement1);
	selElement2 = document.getElementById(selElement2);
	selElement2.innerHTML = "";

	if (selElement1.value == "Aba North") {
		var optionCityArray = ["Select Police Station", "Aba Central Police Division", "Abayi Police Division", 
		"Ariaria Police Division", "Azuka Police Division", "Eastern Ngwa Police Division", "Ndiegoro Police Division",
		 "Ohuru Isimiri Police Division", "Ohanze Police Division", "Obelirie Police Division", 
		 "Umuobiakwa Police Division" ];

		for (var k = 0; k < optionCityArray.length; k++) {
			var optionCity = document.createElement('option');
			optionCity.innerHTML = optionCityArray[k];
			selElement2.options.add(optionCity);
		}
	}
	else if (selElement1.value == "Aba South") {
		var optionCityArray = ["Select Police Station", "Aba Central Police Division", "Abayi Police Division", 
		"Ariaria Police Division", "Azuka Police Division", "Eastern Ngwa Police Division", "Ndiegoro Police Division", 
		"Ohuru Isimiri Police Division", "Ohanze Police Division", "Obelirie Police Division", 
		"Umuobiakwa Police Division" ];

		for (var k = 0; k < optionCityArray.length; k++) {
			var optionCity = document.createElement('option');
			optionCity.innerHTML = optionCityArray[k];
			selElement2.options.add(optionCity);
		}5
	}

}


// function populate1(selElement1, selElement2) {
// 	selElement1 = document.getElementById(selElement1);
// 	selElement2 = document.getElementById(selElement2);
// 	selElement2.innerHTML = "";

// 	if (selElement1.value == "Nigeria") {
// 		var optionStateArray = ["Select your State", "Abia", "Anambra", "Ebonyi", "Enugu"];

// 		for (var k = 0; k < optionStateArray.length; k++) {
// 			var optionState = document.createElement('option');
// 			optionState.innerHTML = optionStateArray[k];
// 			selElement2.options.add(optionState);
// 		}
// 	}
// 	else if (selElement1.value == "Ghana") {
// 		var optionStateArray = ["Select your State", "Acra", "Akumasi", "Upper Region", "Lower Region"];

// 		for (var k = 0; k < optionStateArray.length; k++) {
// 			var optionState = document.createElement('option');
// 			optionState.innerHTML = optionStateArray[k];
// 			selElement2.options.add(optionState);
// 		}
// 	}
// 	else if (selElement1.value == "Cameroon") {
// 		var optionStateArray = ["Select your State", "Bakasi", "Yewonde", "Upper Region", "Lower Region"];

// 		for (var k = 0; k < optionStateArray.length; k++) {
// 			var optionState = document.createElement('option');
// 			optionState.innerHTML = optionStateArray[k];
// 			selElement2.options.add(optionState);
// 		}
// 	}
// 	else if (selElement1.value == "Eygpt") {
// 		var optionStateArray = ["Select your State", "Cairo", "Ismiala", "Zamalek", "Pharooh"];

// 		for (var k = 0; k < optionStateArray.length; k++) {
// 			var optionState = document.createElement('option');
// 			optionState.innerHTML = optionStateArray[k];
// 			selElement2.options.add(optionState);
// 		}
// 	}
// }

// function populate2(selElement1, selElement2){
// 	selElement1 = document.getElementById(selElement1);
// 	selElement2 = document.getElementById(selElement2);
// 	selElement2.innerHTML = "";

// 	if (selElement1.value == "Abia") {
// 		var optionLGAArray = ["Select your LGA", "Isukwuato", "Bende", "Arochukwu", "Obioma ngwa"];
// 		for (var k = 0; k < optionLGAArray.length; k++) {
// 			var optionLGA = document.createElement('option');
// 			optionLGA.innerHTML = optionLGAArray[k];
// 			selElement2.options.add(optionLGA);
// 		}
// 	}
// 	else if (selElement1.value == "Anambra") {
// 		var optionLGAArray = ["Select your LGA", "Aguata", "Aniocha", "Ekwusigo", "Idemili"];
// 		for (var k = 0; k < optionLGAArray.length; k++) {
// 			var optionLGA = document.createElement('option');
// 			optionLGA.innerHTML = optionLGAArray[k];
// 			selElement2.options.add(optionLGA);
// 		}
// 	}
// 	else if (selElement1.value == "Ebonyi") {
// 		var optionLGAArray = ["Select your LGA", "Ikwo", "Ezza north", "Ezza south", "Onicha"];
// 		for (var k = 0; k < optionLGAArray.length; k++) {
// 			var optionLGA = document.createElement('option');
// 			optionLGA.innerHTML = optionLGAArray[k];
// 			selElement2.options.add(optionLGA);
// 		}
// 	}
// 	else if (selElement1.value == "Enugu") {
// 		var optionLGAArray = ["Select your LGA", "Oji River", "Nsuka", "Udi", "Nkanu"];
// 		for (var k = 0; k < optionLGAArray.length; k++) {
// 			var optionLGA = document.createElement('option');
// 			optionLGA.innerHTML = optionLGAArray[k];
// 			selElement2.options.add(optionLGA);
// 		}
// 	}
// }

