# How to Boot & Run (EC2 + Docker Compose)

## Section 0: Cloning the repo (skip if already cloned)

Below are some commands you can use to clone the repo if you haven't already.

HTTPS
```
https://github.com/CSC-648-SFSU/csc648-fa25-03-team04.git
```
SSH
```
git@github.com:CSC-648-SFSU/csc648-fa25-03-team04.git
```
Github-cli
```
gh repo clone CSC-648-SFSU/csc648-fa25-03-team04
```

## Section 1: Accessing the ec2 Server

### Go to the credentials folder to get instructions and how to use the credentials given.

   If an error is encountered, then contact our **Team Leader Matthew**.


## Section 2: In the Server

* Navigate into the folder
  ```
  cd ~/csc648-fa25-03-team04
  ```
  
* Switch to the development branch
  or whichever branch you are trying to acces
  ```
  git checkout development
  ```
  
* Navigate into application folder
  ```
  cd application
  ```
  
* Docker Compose
  ```
  docker-compose up
  ```

### ! If an error is encountered relating to front end

* If you encountered an error in the front end, it might have something to do with
  `nginx` using port `80`. To solve that, simply stop nginx.
  ```
  sudo systemctl stop nginx
  ```

* Then run `docker-compose` again.
  ```
  docker-compose up
  ```

### !! But if something was preventing docker from running, then just run the following commands.

* removes containers, networks, volumes, etc.
  ```
  sudo docker-compose down --remove-orphans
  ```

* Then run `docker-compose` again. (This might take a while)
  ```
  docker-compose up --build
  ```

* The server should be running, proceed to the next step.

### !!! If github repo doesn't exist, clone using.
```
gh repo clone CSC-648-SFSU/csc648-fa25-03-team04
```

### !!!! If the error is about some tokens and keys.

Likely a missing env file

* ### Contact Mathew

<br>

## Section 3: Accessing the front end
you can access the front end using
```
http://3.216.62.166/
```

---

### If you encountered an error that wasn't covered

### Contact Mathew
