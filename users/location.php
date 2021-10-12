<?php
function getLatLng(){
    include('../inc/connection.php');

    $sql = "SELECT * FROM location";
    $query = mysqli_query($conn, $sql);
    if ($query) {
        if ($num = mysqli_num_rows($query)) {
            $row = mysqli_fetch_assoc($query);
        }
    }
    return $row;
}
    
?>