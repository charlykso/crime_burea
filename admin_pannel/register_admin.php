<?php

	include('inc/head.php');
    include('inc/connection.php');
    session_start();
    if (!isset($_SESSION['status'])) {
        header('location:signin/login.php');
    }

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
                    <div class="text-center"><h1>Admin Registration</h1></div> <br>
                        <form action="registerStation.php" method="POST">
                            <div class="form-group">
                                <input type="text" name="username" class="form-control station-form" placeholder="Username">
                            </div>
                            <div class="form-group">
                                <input type="text" name="password" class="form-control station-form" placeholder="Password">
                            </div>
                            
                            <button type="submit" name="register" class="btn btn-primary btn-block">Submit</button>
                        </form>
                    </div>

                    <div class="col-md-3"></div>
                </div>
			</div>
		</div>
<?php

include('inc/footer.php');

?>