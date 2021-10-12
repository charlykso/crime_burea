<?php
    include('../inc/connection.php');

    if (isset($_POST['submit'])) {
        $station_name = $_POST['station_name'];
        $station_address = $_POST['station_addr'];
        $station_email = $_POST['station_email'];
        $station_number = $_POST['station_number'];
        $password = $_POST['password'];
        $confirm_pass = $_POST['confirm_pass'];
        
        // Hash function
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        $sql = "INSERT INTO station (station_name, station_address, station_email, station_number, station_password) 
        VALUES('$station_name', '$station_address','$station_email', '$station_number', '$hashed_password')";
        $query = mysqli_query($conn, $sql);
        
        if ($query) {
            //echo "Registration Successful";
            session_start();
            $_SESSION['status'] = "success";
            $_SESSION['status_title'] = "Successful";
            $_SESSION['status_text'] = "Registration was successful!";
            header('location: register_station.php');
        }

        
    }



    if (isset($_POST['register'])) {
        $username = $_POST['username'];
        $password = $_POST['password'];
        
        // Hash function
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        $sql = "INSERT INTO admin_table ( username, password) 
        VALUES('$username', '$hashed_password')";
        $query = mysqli_query($conn, $sql);
        
        if ($query) {
            //echo "Registration Successful";
            session_start();
            $_SESSION['status'] = "success";
            $_SESSION['status_title'] = "Successful";
            $_SESSION['status_text'] = "Registration was successful!";
            header('location: register_admin.php');
        }

        
    }
?>