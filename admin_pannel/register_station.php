<?php

	include('inc/head.php');
    include('inc/connection.php');

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
                <div class="row">
                    <div class="col-md-2"></div>

                    <div class="col-md-6">
                    <div class="text-center"><h1>Station Registration</h1></div> <br>
                        <form action="registerStation.php" method="POST">
                            <div class="form-group">
                                <input type="text" name="station_name" class="form-control station-form" placeholder="Station Name">
                            </div>
                            <div class="form-group">
                                <input type="text" name="station_addr" class="form-control station-form" placeholder="Station Address">
                            </div>
                            <div class="form-group">
                                <input type="email" name="station_email" class="form-control station-form" placeholder="Station Email">
                            </div>
                            <div class="form-group">
                                <input type="number" name="station_number" class="form-control station-form" placeholder="Station Phone Number">
                            </div>
                            <div class="form-group">
                                <input type="password" name="password"  class="form-control station-form"  placeholder="Create Password">
                            </div>
                            <div class="form-group">
                                <input type="password" name="confirm_pass"  class="form-control station-form"  placeholder="Confirm Password">
                            </div>
                            
                            <button type="submit" name="submit" class="btn btn-primary btn-block">Submit</button>
                        </form>
                    </div>

                    <div class="col-md-3"></div>
                </div>
			</div>
		</div>
<?php

include('inc/footer.php');

?>