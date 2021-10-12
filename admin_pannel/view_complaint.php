<?php

	include('inc/head.php');
    include('inc/connection.php');
    session_start();

?>
<body class="cbp-spmenu-push">
	<div class="main-content">
		<!--left-fixed -navigation-->
		<?php
			include('inc/nav.php');
		?>
		<!--left-fixed -navigation-->
		<?php
            include('inc/header.php');

        ?>
		<!-- main content start-->
		<div id="page-wrapper">
			<div class="main-page">
                <h3 style="text-align: center">Complaints</h3>
				<table class="table table-responsive table-bordered" id="complaint_table">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>FIRST NAME</th>
                            <th>LAST NAME </th>
                            <th>GENDER</th>
                            <th>CONTACT ADDRESS</th>
                            <th>PHONE NO</th>
                            <th>COMPLAINT</th>
                            <th>STATION</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                    <?php
                        $sql = " SELECT * FROM complaint ";
                        $query = mysqli_query($conn, $sql);
                        $num = mysqli_num_rows($query);
                            
                        if($query){
                            
                            // for ($x = 1; $x <= $num; $x++) {
                                $x = 1;
                                $row = [];
                                while ($row = mysqli_fetch_assoc($query)) {
                                    
                                    echo "
                                    <tr>
                                    <td>".$x."</td>
                                    <td>".$row['first_name']."</td>
                                    <td>".$row['last_name']."</td>
                                    <td>".$row['gender']."</td>
                                    <td>".$row['contact_address']."</td>
                                    <td>".$row['phone_number']."</td>
                                    <td>".$row['main_complaint']."</td>
                                    <td>".$row['station']."</td>
                                </tr>
                                    ";
                                    $x++;
                                }
                                
                            // }
                        }
                        // echo $num;
                    ?>
                   </tbody> 
                </table>
			</div>
		</div>

	</div>
    <script>
        $(document).ready(function(){
            $('#complaint_table').DataTable();
            
        });
    </script>
    
<?php

	include('inc/footer.php');

?>