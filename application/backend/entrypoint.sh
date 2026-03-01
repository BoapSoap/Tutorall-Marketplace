#!/bin/sh

# Creates the migrations and the preloading the database from the json
# before the main command executes
python3 manage.py collectstatic --noinput
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py loaddata contributors/fixtures/contributors_fixture.json
python3 manage.py loaddata users/fixtures/auth_users.json
python3 manage.py loaddata users/fixtures/users.json
python3 manage.py loaddata files/fixtures/files.json
python3 manage.py loaddata professors/fixtures/professor.json
python3 manage.py loaddata courses/fixtures/courses.json
python3 manage.py loaddata catagories/fixtures/catagories.json
python3 manage.py loaddata adverts/fixtures/adverts.json
python3 manage.py loaddata users_messages/fixtures/users_messages.json

exec "$@"
