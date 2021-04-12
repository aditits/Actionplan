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
                <div class="form-container z-depth-5">
                    <div class="row">
                        <?php
                            $db=mysqli_connect('localhost','betaform','prem@123','betaform');
                            if(mysqli_connect_errno($db)){
                                echo 'Failed to connect';
                            }
                            $errors = array();
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

                            $query1 = "SELECT * FROM apdata2k18 WHERE team_name ='$team_name'";
                            $query2 = "SELECT * FROM apdata2k18 WHERE team_leader ='$team_leader'";
                            $result1 = mysqli_query($db, $query1);
                            $result2 = mysqli_query($db, $query2);
                            if(mysqli_num_rows($result1) > 0){
                                array_push($errors, "Team name already exits, Please select another team name");
                            }
                            if(mysqli_num_rows($result2) > 0){
                                array_push($errors, "You are registered already. If not, mail us at tech.abhyuday@gmail.com");
                            }
                            if (count($errors) == 0) {
$query = "INSERT INTO apdata2k18(team_name,team_leader,leader_email,leader_phone,alternate_phone,organization,city,member2,member3,member4,member5,member6,member7,member8)
VALUES('$team_name','$team_leader','$email','$phone',$alt_phone','$college','$city','$team2','$team3','$team4','$team5','$team6','$team7','$team8')";
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
                                $message = "Greetings from Abhyuday IIT Bombay!<br>You are registered succesfully. Please be in touch with our managers for regular updates.<br><br>Ojas Khewale<br>ojas@abhyudayiitb.org<br>7410551100<br><br>Mayank Sultania<br>mayanksul@abhyudayiitb.org<br>8291474011";
                                $headers = "MIME-Version: 1.0" . "\r\n";
                                $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
                                $headers .= 'From: <abhyuday@abhyudayiitb.org>' . "\r\n";
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
                            <button type="button" class="btn submitbtn waves-effect waves-light"><a href="../index.html">Back to the website</a></button>
                        </div>
                    </div>
                </div>
            </div>
            <!--Import jQuery before materialize.js-->
            <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/js/materialize.min.js"></script>
        </div>
    </body>
</html>