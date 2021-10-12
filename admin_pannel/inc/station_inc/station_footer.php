<?php
	// session_start();
?>
<div class="footer">
		   <p>&copy; Crime Decision System All Rights Reserved | Design by <a href="" target="_blank">Josephine</a></p>
		</div>
        <!--//footer-->
	</div>
	<!-- Classie -->
		<script src="js/classie.js"></script>
		<script src="js/sweetalert.min.js"></script>
		<script>
			var menuLeft = document.getElementById( 'cbp-spmenu-s1' ),
				showLeftPush = document.getElementById( 'showLeftPush' ),
				body = document.body;
				
			showLeftPush.onclick = function() {
				classie.toggle( this, 'active' );
				classie.toggle( body, 'cbp-spmenu-push-toright' );
				classie.toggle( menuLeft, 'cbp-spmenu-open' );
				disableOther( 'showLeftPush' );
			};
			
			function disableOther( button ) {
				if( button !== 'showLeftPush' ) {
					classie.toggle( showLeftPush, 'disabled' );
				}
			}
		</script>
	<!--scrolling js-->

	<script src="dataTables/js/dataTables.bootstrap.min.js"></script>
	<script src="dataTables/js/jquery.dataTables.min.js"></script>
	
	<script src="js/jquery.nicescroll.js"></script>
	<script src="js/scripts.js"></script>
	<!--//scrolling js-->
	<!-- Bootstrap Core JavaScript -->
   <script src="js/bootstrap.js"> </script>
   <?php
        if (isset($_SESSION["status"])) {
                //  echo $_SSESSION["status"];
                ?>
               <script> 
                swal({
                    title: "<?php echo $_SESSION['status_title']; ?>",
                    text: " <?php  echo $_SESSION['status_text']; ?>",
                    icon: "<?php echo $_SESSION['status']; ?>",
                    });
                
                </script>
                <?php
                unset($_SESSION["status"]);
            }else{
				// echo "not set";
			}
        ?>

</body>
</html>