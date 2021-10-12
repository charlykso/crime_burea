// $(function(){
//     $("#map").gmap({
//         'zoom': 4
//     });


//     var markers = [];

//     $("#addMarkerBtnId").click(function(){
//         var marker = {
//             "lat": $("#lat").val(),
//             "lng": $("#lng").val(),
//             "title": $("#placeName").val()
//         };
//         markers.push(marker);

//         $.each(markers, function(i, m) {
//             $("#map").gmap("addMarker", {
//                 "position":new google.maps.latlng(m.lat, m.lng),
//                 "title": m.title
//             }).click(function(){
//                 var contentString = "<table border='1'>" +
//                 "<tr><td>Place Name : </td><td>"+m.title+ "<?td></tr>"+
//                 "<tr><td>Latitude : </td><td>"+m.lat+ "<?td></tr>"+
//                 "<tr><td>Longitude : </td><td>"+m.lng+ "<?td></tr>"+
//                 "</table>";
//                 $("#map").gmap("openInfoWindow", {
//                     content:contentString
//                 }, this);
//             });
//         });
//     });

//     $("#findlatlngBtnId").click(function(){
//         var geocoder = new google.maps.Geocoder();
//         geocoder.geocode({
//             "address" : $("#placeName").val()
//         }, function(results, status){
//             if(status == google.maps.GeocoderStatus.Ok){
//                 // $("#lat").val(results[0].geometry.location.lat().toFixed(6));
//                 // $("#lng").val(results[0].geometry.location.lng().toFixed(6));
//                 var lat = results[0].geometry.location.lat().toFixed(6);
//                 var lng = results[0].geometry.location.lng().toFixed(6);
//             }else{
//                 alert("Please enter correct place name");
//             }
//         });
//         return false;
//     });
// });

