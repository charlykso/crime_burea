<?php
     include('../inc/connection.php');

     if (isset($_POST['login'])) {

        $station_name = $_POST['station_name'];
        $password = $_POST['password'];

        $sql = "SELECT * FROM station WHERE station_name = '$station_name'";
        $query = mysqli_query($conn, $sql);
        if ($query) {
           $num = mysqli_num_rows($query);
           if ($num > 0) {
            while($row = mysqli_fetch_array($query)){
               $hashed_password = $row['station_password'];
               session_start();
               $_SESSION['station_name'] = $row['station_name'];
               }
               if (password_verify($password, $hashed_password)) {
                 
                $_SESSION["loged_in"];
                $_SESSION["status"] = "success";
                $_SESSION["status_title"] = "Successful";
                $_SESSION["status_text"] = "Welcome " .$_SESSION['station_name']."";
                header('location:station_index.php');
               }else{
                session_start();
                $_SESSION["status"] = "warning";
                $_SESSION["status_title"] = "error";
                $_SESSION["status_text"] = "Invalid station name";
                header('location:signin/login.php');
               }
              
           }else{
            $sql2 = "SELECT * FROM admin_table WHERE username = '$station_name'";
            $query2 = mysqli_query($conn, $sql2);
            if ($query2) {
               $num2 = mysqli_num_rows($query2);
               if ($num2 > 0) {
                  while($row2 = mysqli_fetch_array($query2)){
                     $hashed_password2 = $row2['password'];
                     }
                     if (password_verify($password, $hashed_password2)) {
                     // if ($password = $row['password']) {
                        session_start();
                        $_SESSION["loged_in"];
                        $_SESSION["status"] = "success";
                        $_SESSION["status_title"] = "Successful";
                        $_SESSION["status_text"] = "Welcome $station_name";
                        header('location:index.php');
                     }else{
                        session_start();
                        $_SESSION["status"] = "warning";
                        $_SESSION["status_title"] = "error";
                        $_SESSION["status_text"] = "Invalid station name";
                        header('location:signin/login.php');
                     }
               }else{
                  echo "not in";
               }
               
            }else{
               echo "not seen1";
            }
         }
           
        }else{
            echo "not seen2";
         }
     }
?>