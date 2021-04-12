<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Registration | Action Plan</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/css/materialize.min.css">
        <link rel="stylesheet" href="form.css">
    </head>
    <body >
        <div class="container">
            <div class="imagebg"></div>
            <div class="container">
                <div class="form-container z-depth-5" style="margin-top: 0px; top: 50%;">
                    <div class="row">
                        <?php
                            $db=mysqli_connect('localhost','root','','betaform');
                            if(mysqli_connect_errno($db)){
                                echo 'Failed to connect';
                            }
                            else{
                            // receive all input values from the form
                            $team_name = $_POST['team_name'];
                            $team_leader = $_POST['team_leader'];
                            $email = $_POST['email'];
                            $phone = $_POST['phone'];
                            $alt_phone = $_POST['alt_phone'];
                            $college = $_POST['college'];
                            $city = $_POST['city'];
                            $team2 = $_POST['team2'];
                            $team3 = $_POST['team3'];
                            $team4 = $_POST['team4'];
                            $team5 = $_POST['team5'];
                            $team6 = $_POST['team6'];
                            $team7 = $_POST['team7'];
                            $team8 = $_POST['team8'];

                            $query = "INSERT INTO apdata2k19(teamname,teamleader,email,phone,alternatephone,organization,city,member2,member3,member4,member5,member6,member7,member8)
                            VALUES('$team_name','$team_leader','$email','$phone','$alt_phone','$college','$city','$team2','$team3','$team4','$team5','$team6','$team7','$team8')";
                            mysqli_query($db, $query);
            
                            function sanitize_my_email($field) {     
                                $field = filter_var($field, FILTER_SANITIZE_EMAIL);
                                if (filter_var($field, FILTER_VALIDATE_EMAIL)) {
                                    return true;
                                }
                                else {
                                    return false;
                                }
                            }


                                $to = $email;
                                $subject = "Welcome to Abhyuday IIT Bombay!";
                                $message = "Greetings from Abhyuday IIT Bombay!
                                <br>You are registered succesfully.
                                <br>Please find link of the Playbook and Competition Manual.
                                <br>You need to submit your playbook on the link given below:
                                <br>http://abhyudayiitb.org/aplansubmission<br>
                                Link for Playbook: http://abhyudayiitb.org/Actionplan/register/Playbook.pdf<br>
                                Link for the Manual: http://abhyudayiitb.org/Actionplan/register/manual.pdf<br>
                                Please be in touch with our managers for regular updates.<br>
                                <br>Prateek Khichi
                                <br>Competition Manager
                                <br>prateek@abhyudayiitb.org
                                <br>+919602166601
                                <br>
                                <br>Sajal Choudhary
                                <br>Competition Manager
                                <br>sajal@abhyudayiitb.org
                                <br>+919057559452";

                                $headers = "MIME-Version: 1.0" . "\r\n";
                                $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
                                $headers .= 'From: <support@abhyudayiitb.org>' . "\r\n";
                                $secure_check = sanitize_my_email($to);
                                if ($secure_check == false) {     
                                    echo "Invalid input"; 
                                } 
                                else {//send email     
                                    mail($to, $subject, $message, $headers);     
                                }
                            }
                        ?>
                        <p style="font-family: 'Ubuntu', 'Arial', sans-serif;text-align: center;font-size: 30px;">Your reponse has been recorded, will get back to you soon.. </p>
                        <div style="margin:0;text-align:center">
                            <button type="button" class="btn submitbtn waves-effect waves-light"><a href="../index.html" style="color: white;">Back to the website</a></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>