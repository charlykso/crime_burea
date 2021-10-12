<?php

	include('inc/head.php');
    include('inc/connection.php');
    session_start();
    // if (!isset($_SESSION['status'])) {
    //     header('location:signin/login.php');
    // }


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
        <style>
            tbody{
                text-align:center;
            }
        </style>
		<!-- main content start-->
		<div id="page-wrapper">
			<div class="main-page">
                <h3 style="text-align: center">Registered Stations</h3>
				<table class="table table-responsive table-bordered" id="station_table">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>STATION NAME</th>
                            <th>STATION ADDRESS </th>
                            <th>STATION EMAIL</th>
                            <th>STATION NUMBER</th>
                            <th>ACTION</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                    <?php
                        $sql = " SELECT * FROM station ";
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
                                        <td>".$row['station_name']."</td>
                                        <td>".$row['station_address']."</td>
                                        <td>".$row['station_email']."</td>
                                        <td>".$row['station_number']."</td>";
                                        ?>
                                        <td><form action='delete_station.php' method='post' style="margin-bottom:5px">
                                            <input type='hidden' name='remove' value="<?php echo $row['station_id']; ?>">
                                            <input type="submit" name="delete" class="btn btn-danger btn-md" value="Del">
                                            <span class="glyphicon glyphicon-trash" ></span>
                                            
                                        </form>
                                        <button type='button' class='btn btn-md btn-primary' 
                                            data-toggle='modal' name='edit' 
                                            data-target="#myModal<?php echo $row['station_id'];?>">
                                           Edit
                                        </button><span class="glyphicon glyphicon-edit" ></span>
                                        </td>
                                    </tr>

                                    <!-- Modal -->
                                    <div id="myModal<?php echo $row['station_id'];?>" class="modal fade" role="dialog" aria-hidden="true">
                                    <div class="modal-dialog ">

                                        <!-- Modal content-->
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                                            <h4 class="modal-title">Edit Status</h4>
                                        </div>
                                        <div class="modal-body">
                                            
                                                <form action="delete_station.php" method="POST" class="form">
                                                    <div class="form-group">
                                                        <input type="text" value="<?php echo $row['station_name']; ?>" name="stationname" placeholder="Station Name" class="form-control">
                                                    </div>
                                                    <div class="form-group">
                                                        <input type="text" value="<?php echo $row['station_address']; ?>" name="stationaddress" placeholder="Station Address" class="form-control">
                                                    </div>
                                                    <div class="form-group">
                                                        <input type="email" value="<?php echo $row['station_email']; ?>" name="stationemail" placeholder="Station Email" class="form-control">
                                                    </div>
                                                    <div class="form-group">
                                                        <input type="text" value="<?php echo $row['station_number']; ?>" name="stationnumber" placeholder="Station Number" class="form-control">
                                                    </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                                    <input type="hidden" value="<?php echo $row['station_id']; ?>"  name="station_id">
                                                    <input type="submit" class="btn btn-primary" name="edit" value="Save" >
                                                </div>
                                            </form>
                                        </div>
                                        </div>
                                    </div>
                                    </div>


                                <?php
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
            $('#station_table').DataTable();
            
        });
    </script>
    
<?php

	include('inc/footer.php');

?>