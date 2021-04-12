<!DOCTYPE html>
<html lang="en-US" dir="ltr">
   <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!--  
    Document Title
    =============================================
    -->
    <title>Action Plan | Abhyuday,IIT Bombay</title>
    <!--  
    Favicons
    =============================================
    -->
    <link rel="apple-touch-icon" sizes="57x57" href="assets/images/favicons/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="assets/images/favicons/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="assets/images/favicons/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="assets/images/favicons/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="assets/images/favicons/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="assets/images/favicons/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="assets/images/favicons/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="assets/images/favicons/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="assets/images/favicons/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192" href="assets/img/black.png">
    <link rel="icon" type="image/png" sizes="32x32" href="assets/img/favicons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="assets/img/favicons/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/img/favicons/favicon-16x16.png">
    <link rel="manifest" href="/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="assets/images/favicons/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">
    <!--  
    Stylesheets
    =============================================
    
    -->
    <!-- Default stylesheets-->
    <link href="assets/lib/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Template specific stylesheets-->
    <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Volkhov:400i" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800" rel="stylesheet">
    <link href="assets/lib/animate.css/animate.css" rel="stylesheet">
    <link href="assets/lib/components-font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <link href="assets/lib/et-line-font/et-line-font.css" rel="stylesheet">
    <link href="assets/lib/flexslider/flexslider.css" rel="stylesheet">
    <link href="assets/lib/owl.carousel/dist/assets/owl.carousel.min.css" rel="stylesheet">
    <link href="assets/lib/owl.carousel/dist/assets/owl.theme.default.min.css" rel="stylesheet">
    <link href="assets/lib/magnific-popup/dist/magnific-popup.css" rel="stylesheet">
    <link href="assets/lib/simple-text-rotator/simpletextrotator.css" rel="stylesheet">
    <!-- Main stylesheet and color file-->
    <link href="assets/css/style.css" rel="stylesheet">
    <link id="color-scheme" href="assets/css/colors/default.css" rel="stylesheet">
  </head>
  <body data-spy="scroll" data-target=".onpage-navigation" data-offset="60">
    <main>
      <div class="page-loader">
        <div class="loader">Loading...</div>
      </div>
      <nav class="navbar navbar-custom navbar-dark navbar-fixed-top one-page" role="navigation">
        <div class="container">
          <div class="navbar-header">
            <button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#custom-collapse"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>
            <a  href="index.html"><img src="assets/img/logologo.png" style="width:160px"></a>
          </div>
        </div>
      </nav>
      <div class="main">
        <section class="module bg-dark-30 about-page-header" data-background="assets/img/pc.png">
          
        </section>
        <section class="module">
          <div class="container">
            <div class="row">
                <?php
                    $host = 'mysql';
                    $password = 'abhyuday#user_20^21';
                    $user = 'abhyuday';
                    $dbname = 'abhyuday';
                    $dsn = 'mysql:host='.$host.';dbname='.$dbname;
                    try{
                        $db = new PDO($dsn,$user,$password);
                        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    } catch(PDOException $e){
                        echo "DB connection failed";
                        die();
                    }
                    
                    if($db)
                    {
                        echo "Connected";
                        $email = trim($_POST['email']);
                        $mentor_name = trim($_POST['mentor_name']);
                        $phone = trim($_POST['phone']);
                        $city = trim($_POST['city']);
                        $state = trim($_POST['state']);
                        $skype = trim($_POST['skype']);
                        $portfolio = trim($_POST['portfolio']);
                        $ask_phone = trim($_POST['ask_phone']);
                        $sectors = $_POST['sectors'];
                        $mentor_type = trim($_POST['mentor_type']);
                        $avail_time = trim($_POST['avail_time']);
                        $about = trim($_POST['about']);
                        $linkedin = trim($_POST['linkedin']);

                        $section = join(", ",$sectors);

                        $query = "INSERT INTO apmentors2k20(email,name,phone,city,state,skype,portfolio,ask_phone,sectors,type,availability,about,linkedin) VALUES(:email,:name,:phone,:city,:state,:skype,:portfolio,:ask_phone,:sectors,:mentor_type,:avail_time,:about,:linkedin)";
                        $values = array(':email'=>$email,':name'=>$mentor_name,':phone'=>$phone,':city'=>$city,':state'=>$state,':skype'=>$skype,':portfolio'=>$portfolio,':ask_phone'=>$ask_phone,':sectors'=>$section,':mentor_type'=>$mentor_type,':avail_time'=>$avail_time,':about'=>$about,':linkedin'=>$linkedin);

                        try{

                            $res = $db->prepare($query);
                            $res->execute($values);

                        } catch(PDOException $e){
                            echo $e->getMessage();
                            die();
                        }

                        // function sanitize_my_email($field) {     
                        //     $field = filter_var($field, FILTER_SANITIZE_EMAIL);
                        //     if (filter_var($field, FILTER_VALIDATE_EMAIL)) {
                        //         return true;
                        //     }
                        //     else {
                        //         return false;
                        //     }
                        // }

                    }          
                    else {
                        echo '<div class="alert alert-danger" role="alert">Failed to connect to the database.</div>';
                    }
                    
                ?>
              <a href="index.html" title="home"><button class="btn btn-primary btn-round btn-block" type="button" >Go back to the Website</button></a> 
            </div>
          </div>
        </section>
        
          </div>
        </div>
        <hr class="divider-d">
        <footer class="footer bg-dark" style="bottom: 0%;
    position: absolute;
    width: 100%;">
          <div class="container">
            <div class="row">
              <div class="col-sm-6">
                <p class="copyright font-alt">&copy; 2019&nbsp;<a href="index.html">Abhyuday, IIT Bombay</a>, All Rights Reserved</p>
              </div>
              <div class="col-sm-6">
                <div class="footer-social-links">
                <a href="https://www.facebook.com/abhyuday.iitb/"><i class="fa fa-facebook"></i></a>
                <a href="https://twitter.com/Abhyuday_IITB?s=07"><i class="fa fa-twitter"></i></a>
                <a href="https://www.instagram.com/iitbombay_abhyuday/"><i class="fa fa-instagram"></i></a>
                <a href="https://www.linkedin.com/company/abhyuday-iit-bombay/"><i class="fa fa-linkedin"></i></a>
                <a href="https://www.youtube.com/channel/UCFbU2VmJjC9QQuExaampqGA"><i class="fa fa-youtube"></i></a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
      <div class="scroll-up"><a href="#totop"><i class="fa fa-angle-double-up"></i></a></div>
    </main>
    <!--  
    JavaScripts
    =============================================
    -->
    <script src="assets/lib/jquery/dist/jquery.js"></script>
    <script src="assets/lib/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="assets/lib/wow/dist/wow.js"></script>
    <script src="assets/lib/jquery.mb.ytplayer/dist/jquery.mb.YTPlayer.js"></script>
    <script src="assets/lib/isotope/dist/isotope.pkgd.js"></script>
    <script src="assets/lib/imagesloaded/imagesloaded.pkgd.js"></script>
    <script src="assets/lib/flexslider/jquery.flexslider.js"></script>
    <script src="assets/lib/owl.carousel/dist/owl.carousel.min.js"></script>
    <script src="assets/lib/smoothscroll.js"></script>
    <script src="assets/lib/magnific-popup/dist/jquery.magnific-popup.js"></script>
    <script src="assets/lib/simple-text-rotator/jquery.simple-text-rotator.min.js"></script>
    <script src="assets/js/plugins.js"></script>
    <script src="assets/js/main.js"></script>
  </body>
</html>