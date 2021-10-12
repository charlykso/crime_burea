<?php
	include('inc/connection.php');
	include('inc/station_inc/station_head.php');
	$station_name = $_SESSION["station_name"];
?>
<body class="cbp-spmenu-push">
	<div class="main-content">
		<!--left-fixed -navigation-->
		<?php
			include('inc/station_inc/station_nav.php');
		?>
		<!--left-fixed -navigation-->
		<!-- header-starts -->
		<?php
			include('inc/station_inc/station_header.php');
		?>
		<!-- main content start-->
		<div id="page-wrapper">
			<div class="main-page">
				<div class="row-one">
					<div class="col-md-4 widget">
						<div class="stats-left ">
							<h5>Active</h5>
							<h4>Cases</h4>
							<?php
								
								$sql = "SELECT * FROM complaint WHERE station = '$station_name' AND status = 'active' ";
								$query = mysqli_query($conn, $sql);
								if ($query) {
									$rowcount = mysqli_num_rows($query);
								
							?>
						</div>
						<div class="stats-right">
							<label><?php echo $rowcount; ?></label>
							<?php } ?>
						</div>
						<div class="clearfix"> </div>	
					</div>
					<div class="col-md-4 widget states-mdl">
						<div class="stats-left">
							<h5>Pending</h5>
							<h4>Cases</h4>
							<?php
								include('inc/connection.php');
								$sql1 = "SELECT * FROM complaint WHERE station = '$station_name' AND status = 'pending' ";
								$query1 = mysqli_query($conn, $sql1);
								if ($query1) {
									$rowcount1 = mysqli_num_rows($query1);
							
							?>
						</div>
						<div class="stats-right">
							<label><?php echo $rowcount1; ?></label>
							<?php } ?>
						</div>
						<div class="clearfix"> </div>	
					</div>
					<div class="col-md-4 widget states-last">
						<div class="stats-left">
							<h5>Solved</h5>
							<h4>Cases</h4>
							<?php
								include('inc/connection.php');
								$sql2 = "SELECT * FROM complaint WHERE station = '$station_name' AND status = 'solved' ";
								$query2 = mysqli_query($conn, $sql2);
								if ($query2) {
									$rowcount2 = mysqli_num_rows($query2);
								
							?>
						</div>
						<div class="stats-right">
							<label><?php echo $rowcount2; ?></label>
							<?php } ?>
						</div>
						<div class="clearfix"> </div>	
					</div>
					<div class="clearfix"> </div>	
				</div>
				
					</div>
					<div class="clearfix"> </div>
				</div>
				<div class="clearfix"> </div>
			</div>
		</div>

	</div>

<?php

	include('inc/station_inc/station_footer.php');

?>