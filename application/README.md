# Application Folder

## Purpose
The purpose of this folder is to store all the source code and related files for your team's application. Source code MUST NOT be in any of folder. <strong>YOU HAVE BEEN WARNED</strong>

You are free to organize the contents of the folder as you see fit. But remember your team is graded on how you use Git. This does include the structure of your application. Points will be deducted from poorly structured application folders.

## Please use the rest of the README.md to store important information for your team's application.

### Building the application

Docker (Recommended)
1. Clone the repository
    ```
    git clone https://github.com/CSC-648-SFSU/csc648-fa25-03-team04.git

    cd ~/csc648-fa25-03-team04/application
    ```
2. Run the docker command
    ```
    docker compose -f compose.prod.yml up --build
    ```
3. To stop the application
    ``` 
    docker compose -f compose.prod.yml down --remove-orphans
    ```
### Contributions
1. For local development and wanted to add new model. With Docker or Docker desktop Run the following command
    ```
    docker compose -f compose.dev.yml run django-web-backend-local python3 manage.py startapp <new_model_here>
    ```
2. To develop locally without affecting the production build. Run the following command
    ```
    docker compose -f compose.dev.yml up --build
    ```
    To turn it off run
    ```
    docker compose -f compose.dev.yml down --remove-orphans
    ```