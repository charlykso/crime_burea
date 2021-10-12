<?php
	session_start();
?>
<!DOCTYPE HTML>
<html lang="zxx">

<head>
	<title>Admin : login</title>
	<!-- Meta tag Keywords -->
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta charset="UTF-8" />
	<meta name="keywords" content=""
	/>
	<script>
		addEventListener("load", function () {
			setTimeout(hideURLbar, 0);
		}, false);

		function hideURLbar() {
			window.scrollTo(0, 1);
		}
	</script>
	<!-- Meta tag Keywords -->
	<!-- css files -->
	<link rel="stylesheet" href="css/style.css" type="text/css" media="all" />
	<!-- Style-CSS -->
	<link rel="stylesheet" href="css/fontawesome-all.css">
	<!-- Font-Awesome-Icons-CSS -->
	<!-- //css files -->
	<!-- web-fonts -->
	<link href="//fonts.googleapis.com/css?family=Reem+Kufi&amp;subset=arabic" rel="stylesheet">
	<link href="//fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i" rel="stylesheet">
	<link href="../css/bootstrap.css" rel='stylesheet' type='text/css' />
	<!-- //web-fonts -->
</head>

<body>
	<!-- title -->
	<h1>
	
		<span>L</span>ogin
		<span>F</span>orm</h1>
	<!-- //title -->
	<!-- content -->
	<div class="sub-main-w3" style="margin-left:25%">
		<form action="../processLogin.php" method="POST">
			<div class="form-style-agile "  >
				<label>
					Username
					<i class="fas fa-user"></i>
				</label>
				<input type="text" placeholder="Station Name" name="station_name" required="required">
			</div>
			<div class="form-style-agile">
				<label>
					Password
					<i class="fas fa-unlock-alt"></i>
				</label>
				<input type="password" placeholder="Password" name="password" required="">
			</div>
			<!-- checkbox -->
			<div class="wthree-text">
				<ul>
					<li>
						<label class="anim">
							<input type="checkbox" class="checkbox" required="">
							<span>Remember me</span>
						</label>
					</li>
					<li>
						<a href="#">Forgot Password?</a>
					</li>
				</ul>
			</div>
			<!-- //checkbox -->
			<input type="submit" name="login" value="Log In">
			<!-- social icons -->
			
		</form>
	</div>
	<!-- //content -->

	<script src="../js/jquery-1.11.1.min.js"></script>
	<!-- <script src="asset/js/jquery-2.2.3.min.js"></script> -->
    <script src="../js/sweetalert.min.js"></script>
</body>
<?php
 if (isset($_SESSION["status"])) {
	// echo $_SSESSION["status"];
	?>
   <script> 
	swal({
		title: "<?php echo $_SESSION['status_title']; ?>",
		text: "You can track your case with <?php  echo $track_id; ?>",
		icon: "<?php echo $_SESSION['status']; ?>",
		});
	
	</script>
	<?php
	session_unset();
}else{
	echo "not set";
}
?>

</html>