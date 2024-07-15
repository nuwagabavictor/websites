<!-- <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body> -->
    <?php 
    $servername = "localhost";
    $password = "Myyear2022*";
    $username = "root";
    $dbname = "expenditure";
    //connection to database

    $conn = new mysqli($servername, $password, $username, $dbname);

    //check for connectivity

    if(!$conn = new mysqli($servername, $password, $username, $dbname))
    {
        echo "<script> alert('connection failed')></script>";
    }
    else{
        echo "<script> alert('connection successful')></script>";
    }

    $Fname = $Lname = $Email = $PhoneNumber =$Password =$Gender = "";

    if($_SERVER["REQUEST_METHOD"] == "POST")
    {
        $Fname = test_input($_POST["Fname"]);
        $Lname = test_input($_POST["Lname"]);
        $Email = test_input($_POST["Email"]);
        $PhoneNumber = test_input($_POST["PhoneNumber"]);
        $Password = test_input($_POST["Password"]);
        $Gender = test_input($_POST("Gender"));
    }

    $sql = "INSERT INTO register(Fname, Lname, Email, Phone, Password, Sex, reg_date)
    VALUES ('$Fname', '$Lname', '$Email', '$PhoneNumber', '$Password','$Gender')";

    if($conn->query($sql) == TRUE){
        echo "<script> alert ('information saved')</script>";
    }
    else{
        echo "<script> alert ('information not saved')</script>"; 
    }

    function test_input($data){
        $data =stripslashes($data);
        $data =trim($data);
        $data = htmlspecialchars($data);
        return $data;
    }
    ?>
     <!-- <h1>Registration Form</h1>
    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="POST" class="fom">
        <label for="fname">FirstName:</label>
        <input type="text" id="name" name="FirstName" required>
        <br><br>
        <label for="lname">LastName:</label>
        <input type="text" id="name" name="LastName" required>
        <br><br>
        <label for="email">Email:</label>
        <input type="email" id="email" name="Email" required>
        <br><br>
        <label for="phnum">PhoneNumber:</label>
        <input type="number" id="phone" name="PhoneNumber" required>
        <br><br>
        <label for="pword">Password:</label>
        <input type="password" id="pword" name="Password" required>
        <br><br>
        <label for="gender">Gender:</label>
        <input type="radio" name="Gender" value="male">Male
        <input type="radio" name="Gender" value="female">Female
        <input type="radio" name="Gender" value="other">other
        <br><br>
        <input type="Submit" id="sub">
    </form>
    <p><b>Already Have An Account?</b> <a href="Login.html">Log In</a></p>
        
</body>
</html> -->