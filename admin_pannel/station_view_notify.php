<?php
    include('inc/connection.php');
    include('inc/station_inc/station_head.php');
    session_start();
    if (isset($_SESSION['station_name'])) {
        $station_name = $_SESSION['station_name'];
    }else{
        echo("not set");
    }

    //getting the id of the sellected notification
    $complaint_id = $_GET['id'];
    $sql01 = "UPDATE  complaint SET `notification` = 1 WHERE `complaint_id` = '$complaint_id'";
    $query01 = mysqli_query($conn, $sql01);
    // if ($query01) {
    //     if (mysqli_num_rows($query01) > 0) {
    //         while ($row01 = mysqli_fetch_assoc($query01)) {
                
    //         }
    //     }
    // }
    
    // echo($station_name);
?>
<style>
            tbody{
                text-align:center;
            }
        </style>
<body class="cbp-spmenu-push">
	<div class="main-content">
		<!--left-fixed -navigation-->
		<?php
			include('inc/station_inc/station_nav.php');
		?>
		<!--left-fixed -navigation-->
		<?php
            include('inc/station_inc/station_header.php');

        ?>
		<!-- main content start-->
		<div id="page-wrapper">
			<div class="main-page">
                <h3 style="text-align: center">View Complaints</h3>
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
                            <th>STATUS</th>
                            <th>ACTION</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                    <?php
                        $sql = "SELECT * FROM complaint WHERE `complaint_id` = '$complaint_id'";
                        $query = mysqli_query($conn, $sql);
                        if($query){
                            $num = mysqli_num_rows($query);
                            if ($num > 0) {
                            
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
                                    <td>".$row['status']."</td>
                                    <td>";
                                    ?>
                                    <button type='button' class='btn btn-sm btn-primary' 
                                    data-toggle='modal' name='edit' 
                                    data-target="#myModal<?php echo $row['complaint_id'];?>">
                                    Edit
                                    </button></td>
                                    
                                </tr>
            <!-- Modal -->
            <div id="myModal<?php echo $row['complaint_id'];?>" class="modal fade" role="dialog" aria-hidden="true">
            <div class="modal-dialog ">

                <!-- Modal content-->
                <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Edit Status</h4>
                </div>
                <div class="modal-body">
                    
                        <form action="edit_status.php" method="POST" class="form">
                            <div class="form-group">
                    
                            <select name="status" id="" class="form-control">
                                <option value="select status">Select status</option>
                                <option value="pending">pending</option>
                                <option value="active">active</option>
                                <option value="solved">solved</option>
                            </select>
                            <?php 
                            
                                // echo $row['complaint_id'];
                            
                            ?>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            <input type="hidden" value="<?php echo $row['complaint_id']; ?>"  name="comp_id">
                            <input type="submit" class="btn btn-primary" name="update" value="Save" >
                        </div>
                    </form>
                </div>
                </div>
            </div>
            </div>
                                <?php
                                    $x++;
                                }
                            }
                                
                            
                        }
                        
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

    include('inc/station_inc/station_footer.php');

?>