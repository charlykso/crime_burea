
<!-- header-starts -->
<div class="sticky-header header-section ">
			<div class="header-left">
				<!--toggle button start-->
				<button id="showLeftPush"><i class="fa fa-bars"></i></button>
				<!--toggle button end-->
				<!--logo -->
				<div class="logo">
					<a href="index.html">
						<h1>STATION</h1>
						<span>AdminPanel</span>
					</a>
				</div>
				<!--//logo-->
				<!--search-box-->
				<div class="search-box">
					<form class="input">
						<input class="sb-search-input input__field--madoka" placeholder="Search..." type="search" id="input-31" />
						<label class="input__label" for="input-31">
							<svg class="graphic" width="100%" height="100%" viewBox="0 0 404 77" preserveAspectRatio="none">
								<path d="m0,0l404,0l0,77l-404,0l0,-77z"/>
							</svg>
						</label>
					</form>
				</div><!--//end-search-box-->
				<div class="clearfix"> </div>
			</div>
			<div class="header-right">
				<div class="profile_details_left"><!--notifications of menu start -->
					<ul class="nofitications-dropdown">
						<li class="dropdown head-dpdn">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
							<?php
								$sql = "SELECT * FROM complaint WHERE `station` = '$station_name' AND `notification` = 0 ORDER BY `complaint_time` DESC";
								$query = mysqli_query($conn, $sql); 
								if ($query) {
									$count = mysqli_num_rows($query);
									if ($count > 0) {
										?>
							<i class="fa fa-bell"></i><span class="badge blue"><?php echo $count; ?></span></a>
							<ul class="dropdown-menu">
								<li>
									<div class="notification_header">
										<h3>You have <?php echo $count;  ?> new notification</h3>
									</div>
								</li>
								
									<?php
										while ($row = mysqli_fetch_assoc($query)) {
											$complaint_time = $row['complaint_time'];
											$first_name = $row['first_name'];
									?>
								<li><a href="station_view_notify.php?id=<?php echo $row['complaint_id']; ?>" style="<?php 
									if ($row['notification'] == 0) {
										echo 'font-weight:bold';
									}
								?>">
									<!-- <div class="user_img"><img src="images/2.png" alt=""></div> -->
								   <div class="notification_desc">
									<p><?php echo $first_name; ?> made a complaint</p>
									<p><span><small><i><?php echo date('F,j, Y, gia', strtotime($complaint_time)); ?></i></small></span></p>
									</div>
								  <div class="clearfix"></div>	
								 </a>
								 </li>
								 <?php 
										}
									?>
								 <li>
									<div class="notification_bottom">
										<a href="#">See all notifications</a>
									</div>
								</li>
							</ul>
						</li>	
											<?php
										
									}else{
										?>
							<i class="fa fa-bell"></i><span class="badge blue">0</span></a>
							<ul class="dropdown-menu">
								<li>
									<div class="notification_header">
										<h3>You have 0 new notification</h3>
									</div>
								</li>
								<li><a href="" style="">
								   <div class="notification_desc">
								   
									<p>No Complaint yet</p>
									</div>
								  <div class="clearfix"></div>	
								 </a></li>
								 <!-- <li>
									<div class="notification_bottom">
										<a href="#">See all notifications</a>
									</div> 
								</li> -->
							</ul>
						</li>




										<?php
										
										// echo("No Records");
									
									
								
							}
						}
								
							?>
							
								
						
					</ul>
					<div class="clearfix"> </div>
				</div>
				<!--notification menu end -->
				<div class="profile_details">		
					<ul>
						<li class="dropdown profile_details_drop">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
								<div class="profile_img">	
									<span class="prfil-img"><img src="images/a.png" alt=""> </span> 
									<div class="user-name">
										<p>Station</p>
										<span>Administrator</span>
									</div>
									<i class="fa fa-angle-down lnr"></i>
									<i class="fa fa-angle-up lnr"></i>
									<div class="clearfix"></div>	
								</div>	
							</a>
							<ul class="dropdown-menu drp-mnu">
								<li> <a href="#"><i class="fa fa-cog"></i> Settings</a> </li> 
								<li> <a href="#"><i class="fa fa-user"></i> Profile</a> </li> 
								<li> <a href="../inc/logout.php"><i class="fa fa-sign-out"></i> Logout</a> </li>
							</ul>
						</li>
					</ul>
				</div>
				<div class="clearfix"> </div>				
			</div>
			<div class="clearfix"> </div>	
		</div>
		<!-- //header-ends -->