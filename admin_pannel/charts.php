<script src="js/googlemap.js"></script>
<?php
	include('inc/connection.php');
	include('inc/head.php');
	session_start();
?>
<body class="cbp-spmenu-push">
	<div class="main-content">
		<!--left-fixed -navigation-->
		<?php
			include('inc/nav.php');
		?>
		<!--left-fixed -navigation-->
		<!-- header-starts -->
		<?php
			include('inc/header.php');	
		?>
		<style>
			#map{
				height: 400px;
				border: 1px solid #4F52BA;
			}
			#data{
				display: none;
			}
		</style>
		<!-- //header-ends -->
		<!-- main content start-->
		<div id="page-wrapper">
			<div class="main-page charts-page">
				<h3 class="title1">Map</h3>
				<div class="charts">
				<div>
				<?php 
					require_once('../users/location.php');
					getLatLng();
					$location = json_encode(getLatLng(), true);
					echo "<div id='data'>" .$location. "</div>";
				?>
				</div>
					<div id="map"></div>	
				</div>
			</div>
		</div>
		<!--footer-->
<?php

include('inc/footer.php');

?>
 
<script>
// var mymap = L.map('map').setView([5.1216, 7.3733], 13);
// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: 'pk.eyJ1IjoiYXdhaCIsImEiOiJja245dWx3dncwbnJ4MnZwZDBjZGdqYXd3In0.t3gJwfYIINCvMCDGdetwvA'
// }).addTo(mymap);

// var locations = [
//   ["LOCATION_1", 11.8166, 122.0942],
//   ["LOCATION_2", 11.9804, 121.9189],
//   ["LOCATION_3", 10.7202, 122.5621],
//   ["LOCATION_4", 11.3889, 122.6277],
//   ["LOCATION_5", 10.5929, 122.6325]
// ];

// var map = L.map('map').setView([11.206051, 122.447886], 8);
// mapLink =
//   '<a href="http://openstreetmap.org">OpenStreetMap</a>';
// L.tileLayer(
//   'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; ' + mapLink + ' Contributors',
//     maxZoom: 18,
//   }).addTo(map);

// for (var i = 0; i < locations.length; i++) {
//   marker = new L.marker([locations[i][1], locations[i][2]])
//     .bindPopup(locations[i][0])
//     .addTo(map);
// }
</script>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD0gSvAqRFb845tARxLBkcftW2_V7gh45g&callback=initMap"></script>


<?php
	$sql = "SELECT * FROM location";
	$query = mysqli_query($conn, $sql);
	if ($query) {
		if ($num = mysqli_num_rows($query)) {
			while ($row = mysqli_fetch_assoc($query)) {
				 
			}
		}
	}
?>
