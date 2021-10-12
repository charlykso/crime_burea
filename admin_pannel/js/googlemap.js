function initMap(){
	// var Abakaliki = {lat: 6.327440, lng: 8.106360};
	var Aba = {lat: 5.1028099, lng: 7.3777759};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 16,
		center: Aba
	});
	var marker = new google.maps.Marker({
		position: Aba,
		map: map
	});

	var locationData = document.getElementById('data').innerHTML;
	locationData = JSON.parse(locationData);
	showAllCrimeLocations(locationData);
	
}

function showAllCrimeLocations(locationData) {
	var infoWindow = new google.maps.InfoWindow;
	Array.prototype.forEach.call(locationData, function(data){
		var content = document.createElement('div');
		var strong = document.createElement('strong');
		strong.textContent = data.crime_type;
		content.appendChild(strong);
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(data.latitude, data.longitude),
			map: map
		});
		marker.addListener('mouseover', function(){
			infoWindow.setContent(content);
			infoWindow.open(map, marker);
		})
	});
}