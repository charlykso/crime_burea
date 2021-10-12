<?php   
    include('inc/connection.php');
    session_start();
    if (isset($_POST['update'])) {
        $status = $_POST['status'];
        $comp_id = $_REQUEST['comp_id'];
        // echo $status;
        $sql = "UPDATE complaint SET `status` = '$status' WHERE complaint_id = '$comp_id'";
        $query = mysqli_query($conn, $sql);
        if ($query) {
            $_SESSION["status"] = "success";
            $_SESSION["status_title"] = "Successful";
            $_SESSION["status_text"] = "Updated successfuly";
            header('location:station_view_complaint.php');
        }else{
            echo "Not entering";
        }
    }
?>