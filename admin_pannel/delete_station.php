<?php
    include('inc/connection.php');
    session_start();
    
    if (isset($_POST['delete'])) {
        $station_id = $_REQUEST['remove'];

        $sql = "DELETE FROM station WHERE station_id = '$station_id'";
        $query = mysqli_query($conn, $sql);
        if ($query) {
            $_SESSION["status"] = "success";
            $_SESSION["status_title"] = "Successful";
            $_SESSION["status_text"] = "Deleted";
            header('location:view_station.php');
        }
    }

    if (isset($_POST['edit'])) {
        $stationname = $_POST['stationname'];
        $stationaddress = $_POST['stationaddress'];
        $stationemail = $_POST['stationemail'];
        $stationnumber = $_POST['stationnumber'];
        $station_id = $_REQUEST['station_id'];
        // echo $station_id;
        $sql1 = "UPDATE station SET `station_name` = '$stationname',
                                    `station_address` = '$stationaddress',
                                    `station_email` = '$stationemail',
                                    `station_number` = '$stationnumber' WHERE station_id = '$station_id'";
        $query1 = mysqli_query($conn, $sql1);
        if ($query1) {
            $_SESSION["status"] = "success";
            $_SESSION["status_title"] = "Successful";
            $_SESSION["status_text"] = "Updated successfuly";
            header('location:view_station.php');
        }else{
            echo "Not entering";
        }
    }
?>