<?php
include('../inc/connection.php');

$pattern = '/^[a-zA-Z \s.]+$/';

$pattern_num = '/^[0-9 \]+$/';

if (isset($_POST['submit'])) {

    ?>

    <?php

    if (!preg_match("/^([a-zA-Z ' ]+)$/", $_POST['first_name'])) 
    {
        session_start();
        $_SESSION['err'] = "error";
        $_SESSION['err_title'] = "Invalid first name";
        $err = base64_encode('Invalid');
        header('location: ../index.php?err=' .$err);

    }elseif (!preg_match("/^([a-zA-Z ' ]+)$/", $_POST['last_name'])) {
        session_start();
        $_SESSION['err'] = "error";
        $_SESSION['err_title'] = "Invalid last name";
        $err = base64_encode('Invalid');
        header('location: ../index.php?err=' .$err);
        
    }elseif (!preg_match("/^([a-zA-Z0-9 ' ]+)$/", $_POST['contact_address'])) {
        session_start();
        $_SESSION['err'] = "error";
        $_SESSION['err_title'] = "Invalid contact address";
        $err = base64_encode('Invalid');
        header('location: ../index.php?err=' .$err);
        
    }elseif (!preg_match("/^([a-zA-Z0-9 ' ]+)$/", $_POST['crime_location'])) {
        session_start();
        $_SESSION['err'] = "error";
        $_SESSION['err_title'] = "Invalid crime location";
        $err = base64_encode('Invalid');
        header('location: ../index.php?err=' .$err);
        
    }elseif (!preg_match("/^([0-9 ' ]+)$/", $_POST['phone_number'])) {
        session_start();
        $_SESSION['err'] = "error";
        $_SESSION['err_title'] = "Invalid phone number";
        $err = base64_encode('Invalid');
        header('location: ../index.php?err=' .$err);
    }
    else{


        $first_name = $_POST['first_name'];
        $last_name = $_POST['last_name'];
        $gender= $_POST['gender'];
        $contact_address = $_POST['contact_address'];
        $phone_number= $_POST['phone_number'];
        $crime_type= $_POST['crime_type'];
        $crime_location= $_POST['crime_location'];
        $main_complaint= $_POST['main_complaint'];
        $station= $_POST['station'];
        $local_govt= $_POST['local_govt'];
        $longitude = $_POST['longitude'];
        $latitude = $_POST['latitude'];
        $track_id = "CS".rand(10000, 20000);
        $status = "pending";

        

        $sql = "INSERT INTO complaint (first_name, last_name, gender, contact_address, phone_number, main_complaint, station, track_id, local_govt, status) 
        VALUES('$first_name', '$last_name', '$gender', '$contact_address', '$phone_number', '$main_complaint', '$station', '$track_id', '$local_govt', '$status')";
        $query = mysqli_query($conn, $sql);
        if ($query) {
            $sql3 = "SELECT * FROM complaint WHERE track_id = '$track_id'";
            $query3 = mysqli_query($conn, $sql3);
            if ($query3) {
                $num = mysqli_num_rows($query3);
                if ($num > 0) {
                    while($row = mysqli_fetch_array($query3)){
                        $complaint_id = $row['complaint_id'];
                    }

                    $sql2 = "INSERT INTO crimes(crime_type, crime_location, complaint_id) 
                    VALUES('$crime_type', '$crime_location', '$complaint_id')";
                    $query2 = mysqli_query($conn, $sql2);
                    if ($query2){
                     
                        $sql4 = "INSERT INTO location(complaint_id, longitude, latitude, crime_type) 
                        VALUES( '$complaint_id', '$longitude', '$latitude', '$crime_type')";
                        $query4 = mysqli_query($conn, $sql4);
                        if ($query4){
                            session_start();
                            $_SESSION['$track_id'] = $track_id;
                            $_SESSION['status'] = "success";
                            $_SESSION['status_title'] = "Successful";
                            $succ = base64_encode('Sucesful');
                            header('location: ../index.php?succ=' .$succ);
                        }
                        
                    }
                    
                }
            }
            
        }else{
            echo("not entering the table");
        }

    }
}
?>