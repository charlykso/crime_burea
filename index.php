<?php
    include('inc/header.php');
    include('inc/connection.php');
    session_start();
    if (isset($_SESSION['$track_id'])) {
        $track_id = $_SESSION['$track_id'];
       
    }
?>

            <div class="container" onLoad="getLocation()">
                <!-- banner-text -->
                <div class="banner-text text-center">
                <script>
                    getLocation();
                    var x = document.getElementById("demo");

                    function getLocation() {
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(showPosition);
                        }else {
                            x.innerHTML = "Geolocation is not supported by this browser.";
                        }
                    }
                    function showPosition(position) {
                        document.getElementById("latitude").value = position.coords.latitude;
                        document.getElementById("longitude").value = position.coords.longitude;
                    }
                </script>
                <?php
                        if (isset($_GET['succ'])) {
                          
                    ?>
                        <div class="flash-data" data-flashdata = "<?php $_GET['succ']; ?>"></div>
                      
                    <?php
                        // $succ = base64_decode($_GET['succ']);
                        }
                    ?>
                    <div class="slider-info">
                        <h3> DONOT HESITATE!! <BR> REPORT THAT CRIME</h3>
                        <a class="btn btn-theme mt-lg-5 mt-3 agile-link-bnr scroll btn-outline-secondary btn-change5" href="#register" role="button">REPORT</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- report -->
        <div class="w3-register py-4  position-relative" id="register">
            <img class="position-absolute img-fluid agile-img" src="asset/images/i1.png" alt="" />
            <div class="container py-lg-5">
                <div class="row register-form py-md-5">
                
                    <!-- <div class="wthree-form-left py-md-5 pt-sm-5 pb-sm-3"> -->
                    <div class="col-md-6">
                        <div class="title-wthree">
                            <h3 class="agile-title">
                            report
                            </h3>
                            <span></span>
                        </div>
                        <!-- report form grid -->
                        <div class="register-top1" >
                            <form  method="POST"  action="users/complaint.php" class="register-wthree">
                                <div id="demo"></div>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-1 d-md-flex align-items-end justify-content-end px-md-0">
                                            <label class="mb-0">
                                            </label>
                                        </div>
                                        <div class="col-md-6">
                                            <label>
                                                First name
                                            </label>
                                            <input class="form-control" type="text"  name="first_name" required="">
                                        </div>
                                        <div class="col-md-5">
                                            <label>
                                                Last name
                                            </label>
                                            <input class="form-control" type="text"  name="last_name" required="">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-1 d-md-flex align-items-end justify-content-end px-md-0">
                                            <label class="mb-0">
                                            </label>
                                        </div>
                                        <div class="col-md-6">
                                            <label>
                                                Gender
                                            </label>
                                            <select name="gender" id="" class="form-control" required="">
                                                <option value="Select Gender" disabled selected>Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </div>
                                        <div class="col-md-5">
                                            <label>
                                                Contact address
                                            </label>
                                            <input class="form-control" type="text"  name="contact_address" required="">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-1 d-md-flex align-items-end justify-content-end px-md-0">
                                        <label class="mb-0">
                                        </label>
                                    </div>
                                    <div class="col-md-11">
                                        <label>
                                            Phone number
                                        </label>
                                        <input class="form-control" type="text" placeholder="" name="phone_number" required="">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-1 d-md-flex align-items-end justify-content-end px-md-0">
                                            <label class="mb-0">
                                            </label>
                                        </div>
                                        <div class="col-md-6">
                                            <label>
                                                Crime Type
                                            </label>
                                            <select name="crime_type" id="" class="form-control" required="">
                                                <option value="Select Crime"  disabled selected>Select Crime</option>
                                                <option value="Arson">Arson</option>
                                                <option value="Buglary">Buglary</option>
                                                <option value="Child_abuse">Child Abuse/Domestic Abuse</option>
                                                <option value="Fraud">Fraud</option>
                                                <option value="Kidnap">Kidnap</option>
                                                <option value="Murder">Murder/Man slaughter</option>
                                                <option value="Rape">Rape/Sexual Assault</option>
                                                <option value="Robbery">Robbery</option>
                                                <option value="Stalking">Stalking and harrassment</option>
                                                <option value="Terrorism">Terrorism</option>

                                            </select>
                                        </div>
                                        <div class="col-md-5">
                                            <label>
                                                Crime Location
                                            </label>
                                            <input class="form-control" type="text" placeholder="" name="crime_location" required="">
                                            <input type="hidden" id="latitude" name="latitude"><br>
                                            <input type="hidden" id="longitude" name="longitude">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-1 d-md-flex align-items-end justify-content-end px-md-0">
                                            <label class="mb-0">
                                            </label>
                                        </div>
                                        <div class="form-group col-md-6">
                                        <label for="inputState">Local Govt </label>
                                        <select id="stlState2" class="form-control" onchange="populate(this.id,'stlCity2');" name="local_govt" required></select> 
                                    </div>
                                        <div class="form-group col-md-5">
                                        <label for="inputCity">Station</label>
                                        <select id="stlCity2"  class="form-control" required name="station"></select>   
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-1 d-md-flex align-items-end justify-content-end px-md-0">
                                            <label class="mb-0">
                                            </label>
                                        </div>
                                        <div class="col-md-12">
                                            <label>
                                                Your report
                                            </label>
                                            <input class="form-control" type="text" placeholder="Add a detailed description of the incident" name="main_complaint" required="">
                                        </div>
                                    </div> <br>
                                    
                                </div>
                                <div class="row mt-lg-5 mt-3">
                                    <div class="offset-1"></div>
                                    <div class="col-md-11">
                                        <button type="submit" name="submit" class="btn btn-agile btn-block w-100">submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <!--  //report form grid ends here -->
                        
                    </div>
                    <div class="col-md-6" style=" text-align: center; border-left: 1px solid #000">
                        <div class="title-wthree">
                            <h3 class="agile-title" >
                            Track your case
                            </h3>
                            <span style=""></span>
                        </div>
                        <form action="" method="post" class="register-wthree">
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-1 d-md-flex align-items-end justify-content-end px-md-0">
                                        <label class="mb-0">
                                        </label>
                                    </div>
                                    <div class="col-md-12">
                                        <label for="trackId">Your TrackId</label>
                                        <input class="form-control" type="text"  name="trackid" placeholder="Enter your TrackId" required="">
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-lg-5 mt-3">
                                <div class="offset-1"></div>
                                <div class="col-md-11">
                                    <button type="submit" name="track" class="btn btn-agile btn-block w-100">submit</button>
                                </div>
                            </div>
                        </form>
                        <?php

                            if (isset($_POST['track'])) {
                                $trackid = $_POST['trackid'];

                                $sql = "SELECT * FROM complaint WHERE track_id = '$trackid'";
                                $track_query = mysqli_query($conn, $sql);
                                if ($track_query) {
                                    if (mysqli_num_rows($track_query) == 1) {
                                        $row = mysqli_fetch_array($track_query);
                                        $tracking_status = $row['status'];
                                        $first_name = $row['first_name'];
                                        $last_name = $row['last_name'];
                                        $main_complaint = $row['main_complaint'];
                                        $station = $row['station'];

                                    ?>
                                        <div class="row">
                                            <div class="col-md-1 d-md-flex align-items-end justify-content-end px-md-0">
                                                <label class="mb-0">
                                                </label>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="title-wthree">
                                                    <h3 class="agile-title" >
                                                    See the status of your case
                                                    </h3>
                                                    <span style=""></span>
                                                </div>
                                                <h5>This case was reported by:</h5>
                                                <label> <?php echo strtoupper($last_name. " " .$first_name); ?></label><br>
                                                <h5>To:</h5>
                                                <label><?php echo strtoupper($station); ?></label><br>
                                                <h5>The complaint:</h5>
                                                <label> <?php echo strtoupper($main_complaint); ?></label>
                                                <h5>The status of the complaint is:</h5>
                                                <label><?php echo strtoupper($tracking_status);  ?> </label>
                                                
                                            </div>
                                        </div>
                                        <?php
                                    }
                                }
                            }

                        ?>
                        
                    </div>
                    

                </div>
                <!-- //report details container -->
            </div>
        </div>
       
        <!-- contact us-->
        <div class="contact-wthree position-relative" id="contact">
            <span class="letter-02">c</span>
            <div class="container py-sm-5">
                <div class="row py-lg-5 py-4">
                    <div class="col-lg-4">
                        <div class="title-wthree">
                            <h3 class="agile-title">
                                contact us
                            </h3>
                            <span></span>
                        </div>
                        <p>Donec mi nulla, auctor nec sem a, ornare auctor mi. Sed mi tortor, commodo a felis in, fringilla
                            tincidunt nulla. Vestibulum volutpat non eros ut vulpuuctor nec sem </p>
                        <div class="d-sm-flex">
                            <a class="btn btn-theme mt-lg-5 mt-3 agile-link-cnt scroll btn-change5" href="#contact" role="button">email us</a>
                            <a class="btn btn-theme mt-lg-5 mt-3 ml-sm-4 agile-link-cnt  scroll btn-change5" href="#footer">call us</a>
                        </div>
                    </div>
                    <div class="offset-2"></div>
                    <div class="col-lg-6 mt-lg-0 mt-5">
                        <!-- register form grid -->
                        <div class="register-top1">
                            <form action="#" method="get" class="register-wthree">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-2 d-md-flex align-items-end justify-content-end px-md-0">
                                            <label class="mb-0">
                                                <span class="fas fa-user"></span>
                                            </label>
                                        </div>
                                        <div class="col-md-5">
                                            <label>
                                                First name
                                            </label>
                                            <input class="form-control" type="text" placeholder="Josephine" name="firstname" required="">
                                        </div>
                                        <div class="col-md-5">
                                            <label>
                                                Last name
                                            </label>
                                            <input class="form-control" type="text" placeholder="Awah" name="lastname" required="">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-2 d-md-flex align-items-end justify-content-end px-md-0">
                                            <label class="mb-0">
                                                <span class="fas fa-envelope-open"></span>
                                            </label>
                                        </div>
                                        <div class="col-md-10">
                                            <label>
                                                Email
                                            </label>
                                            <input class="form-control" type="email" placeholder="example@email.com" name="email" required="">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-2 d-md-flex align-items-end justify-content-end px-md-0">
                                            <label class="mb-0">
                                                <span class="far fa-edit"></span>
                                            </label>
                                        </div>
                                        <div class="col-md-10">
                                            <label>
                                                Your message
                                            </label>
                                            <textarea placeholder="Type your message here" class="form-control"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-lg-5 mt-3">
                                    <div class="offset-2"></div>
                                    <div class="col-md-10">
                                        <button type="submit" class="btn btn-agile btn-block w-100">Send</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <!--  //register form grid ends here -->
                    </div>
                </div>
            </div>
        </div>
        <!-- //contact -->
            <script>
            $(function(){
                const flashdata = $('.flash-data').data('flashdata')
                if (flashdata) {
                    
                }
            })
        </script>  

        
        <?php
            include('inc/footer.php');
        ?>
    </div>
    

</body>

</html>