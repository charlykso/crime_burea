<?php
    include('connection.php');
    $output = '';
    $sql = "SELECT * FROM complaint WHERE crime_type LIKE '%" .$_POST["search"]. "%'"; 
    $result = mysqli_query($conn, $sql);
    if ($result) {
        $num = mysqli_num_rows($result);
        if ($num > 0) {
            $output = '<h4 align ="center">Search Result</h4>';
            $output = '<div class="table responsive">
                            <table class= "table table bordered">
                            <tr>
                                <th>FIRST NAME</th>
                                <th>LAST NAME </th>
                                <th>GENDER</th>
                                <th>CONTACT ADDRESS</th>
                                <th>PHONE NO</th>
                                <th>COMPLAINT</th>
                                <th>LOCAL GOVT</th>
                                <th>STATION</th>
                            </tr>';
            while ($row = mysqli_fetch_array($result)) {
                $output ='
                <tr>
                    <td>'.$row["first_name"].'<td>
                    <td>'.$row["last_name"].'<td>
                    <td>'.$row["gender"].'<td>
                    <td>'.$row["contact_address"].'<td>
                    <td>'.$row["phone_number"].'<td>
                    <td>'.$row["main_complaint"].'<td>
                    <td>'.$row["local_govt"].'<td>
                    <td>'.$row["station"].'<td>
                </tr>';
            }  
            echo $output;              
        }
        else{
            echo 'Data Not Found';
        }
    }else{
        echo 'not working';
    }
    
?>