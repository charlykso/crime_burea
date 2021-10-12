
    <!-- js -->
    <script src="asset/js/jquery-2.2.3.min.js"></script>
    <script src="asset/js/local_govt.js"></script>
    <script src="asset/sweetalert.min.js"></script>
    <!-- //js -->
    <!-- testimonials  Responsiveslides -->
    <script src="asset/js/responsiveslides.min.js"></script>
    <script>
        // You can also use"$(window).load(function() {"
        $(function () {
            // Slideshow 4
            $("#slider3").responsiveSlides({
                auto: true,
                pager: true,
                nav: false,
                speed: 500,
                namespace: "callbacks",
                before: function () {
                    $('.events').append("<li>before event fired.</li>");
                },
                after: function () {
                    $('.events').append("<li>after event fired.</li>");
                }
            });

        });
        
    <?php
        // 

    ?>
    </script>
    <!-- //testimonials  Responsiveslides -->
    <!-- start-smooth-scrolling -->
    <script src="asset/js/move-top.js"></script>
    <script src="asset/js/easing.js"></script>
    <script>
        jQuery(document).ready(function ($) {
            $(".scroll").click(function (event) {
                event.preventDefault();

                $('html,body').animate({
                    scrollTop: $(this.hash).offset().top
                }, 1000);
            });
        });
    </script>
    <!-- //end-smooth-scrolling -->
    <!-- smooth-scrolling-of-move-up -->
    <script>
        $(document).ready(function () {
            /*
            var defaults = {
                containerID: 'toTop', // fading element id
                containerHoverID: 'toTopHover', // fading element hover id
                scrollSpeed: 1200,
                easingType: 'linear' 
            };
            */

            $().UItoTop({
                easingType: 'easeOutQuart'
            });

        });
    </script>
    <script src="asset/js/SmoothScroll.min.js"></script>
    <script src="js/local_govt.js"></script>
    <!-- //smooth-scrolling-of-move-up -->
    <!-- Bootstrap core JavaScript
================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <!-- <script src="asset/js/bootstrap.js"></script>
    <script src="asset/js/sweetalert2.js"></script> -->
<!-- footer -->
<footer id="footer" style="background-color: #02265A;" class="text-sm-left text-center">
            <div class="container py-4 py-sm-5" style="background color:black">
                <h2>
                    <a class="navbar-brand text-white" href="index.html">
                        CRIME BUREAU
                    </a>
                </h2>
                <div class="row py-sm-5 py-3">
                    <div class="col-lg-2 col-md-4 col-sm-6">
                        <ul class="list-agileits">
                            <li>
                                <a href="index.html" class="nav-link">
                                    Home
                                </a>
                            </li>
                            <li class="my-2">
                                <a href="#register" class="nav-link scroll">
                                    REPORT
                                </a>
                            </li>
                            
                            
                            <li>
                                <a href="#contact" class="nav-link scroll">
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-lg-2 col-md-4 col-sm-6 mt-sm-5">
                        <ul class="list-agileits">
                            <li>
                                <a href="#register" class="nav-link scroll">
                                    Report
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="offset-lg-5"></div>
                    <div class="col-lg-3 col-md-4 footer-end-grid mt-md-0 mt-sm-5">
                        <div class="fv3-contact">
                            <span class="fas fa-phone mr-2"></span>
                            <p class="d-inline">
                                +234 817 062 4081
                            </p>
                        </div>
                        <div class="fv3-contact">
                            <span class="fas fa-mobile mr-2"></span>
                            <p class="d-inline">
                                +234 705 722 8462
                            </p>
                        </div>
                        <div class="fv3-contact">
                            <span class="fas fa-envelope-open mr-2"></span>
                            <p class="d-inline">
                                <a href="mailto:example@email.com">crimebureau@gmail.com</a>
                            </p>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="d-flex justify-content-between footer-bottom-cpy">
                    
                    <div class="social-icons pb-md-0 pb-4">
                        <ul class="social-iconsv2 agileinfo">
                            <li>
                                <a href="#">
                                    <i class="fab fa-facebook-f"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="fab fa-twitter"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="fab fa-google-plus-g"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="fab fa-linkedin-in"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
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
                session_unset($_SESSION["status"]);
            }elseif(isset($_SESSION["err"])){
                ?>
                <script> 
                swal({
                    title: "<?php echo $_SESSION['err_title']; ?>",
                    text: "Please insert a valid input",
                    icon: "<?php echo $_SESSION['err']; ?>",
                    });
                
                </script>
                <?php
                session_unset($_SESSION["err"]);
            }else{
                // echo "not set";
            }

        ?>
        </footer>
        <!-- //footer -->