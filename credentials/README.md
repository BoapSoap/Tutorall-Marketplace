# Credentials Folder

## The purpose of this folder is to store all credentials needed to log into your server and databases. This is important for many reasons. But the two most important reasons is
    1. Grading , servers and databases will be logged into to check code and functionality of application. Not changes will be unless directed and coordinated with the team.
    2. Help. If a class TA or class CTO needs to help a team with an issue, this folder will help facilitate this giving the TA or CTO all needed info AND instructions for logging into your team's server. 


# Below is a list of items required. Missing items will causes points to be deducted from multiple milestone submissions.

1. Server URL or IP
   ```
   ip: 3.216.62.166
   ```
   
3. SSH username
   ```
   username: ubuntu
   ```
   
5. SSH password or key.
    <br> If a ssh key is used please upload the key to the credentials folder.
   
   SSH Key is inside the folder, its name is `Justine.pem` in the `csc648-fa25-03-team04/credentials/` folder

7. Database URL or IP and port used.
    <br><strong> NOTE THIS DOES NOT MEAN YOUR DATABASE NEEDS A PUBLIC FACING PORT.</strong> But knowing the IP and port number will help with SSH tunneling into the database. The default port is more than sufficient for this class.
    ```
    127.0.0.1:3306
    ```
8. Database username
   ```
   tutorall_db_user
   ```
9. Database password
   ```
   UQ{SV3"c)}Re|hU894?@AHfTKS*_CB
   ```
10. Database name (basically the name that contains all your tables)
   ```
   tutorall_db
   ```
11. Instructions on how to use the above information.

---

# How to access the EC2 server.

This will be a guide on how to use the information given above. Make sure you have a terminal running if you're using Mac/Linux (or git bash/WSL on windows) as this will be the primary mode of navigation

*There's an ssh key provided in the credentials folder named `Justine.pem`.*

1. On a terminal navigate to the github folder then do:
    ```
    git checkout development
    ```

2. Set the right pemission for the key.

    * On Linux/Unix/Mac just follow the instructions below.
      
        * You can either use the command provided or locate the key (should be in the credentials folder)
        then use `chmod 400` on it.
             ```
             chmod 400 credentials/Justine.pem
             ```
             
        * Or you can just replace the path here.
             ```
             chmod 400 path/to/ssh/key.pem
             ```

    * On Windows
  
        * You can either use git bash and follow the instruction above.
     
        * Or use a windows tool to run linux commands like Windows Subsystem for Linux or `WSL` for short. Then follow the instructions given for Linux.
    
4. Access the server using `ssh`.

   * If you used the command on step 2, you could just copy this command as well and you should get
   to the server.
       ```
       ssh -i credentials/Justine.pem ubuntu@3.216.62.166
       ```

   * Otherwise, simply replace the path with your path to the ssh key.
       ```
       ssh -i path/to/ssh/key.pem ubuntu@3.216.62.166
       ```    

   If an error is encountered, then contact our **Team Leader Matthew**.

   But if all things went well, you should be in the server now.

---

# Most important things to Remember
## These values need to kept update to date throughout the semester. <br>
## <strong>Failure to do so will result it points be deducted from milestone submissions.</strong><br>
## You may store the most of the above in this README.md file. DO NOT Store the SSH key or any keys in this README.md file.




