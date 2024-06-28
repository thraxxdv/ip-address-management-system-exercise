### How to run the application

Machine versions

- PHP 8.3.7
- Node 20.2.0

1. Run `composer install` under the `./backend` directory.
2. Run `npm install` under the `./frontend` directory.
3. Run `./vendor/bin/sail up`. This boots up the Laravel application and NextJS application through a Docker container so it's easier to run from machine to machine.
   - Note: this runs the backend to the port 8085, mysql through the port 3350, and nextjs 3050. I have used uncommon ports to avoid conflicts with the reviewers local machine.

### Testing the application

1. Go to http://localhost:3050/login
2. Login with `test@example.com` as the email and `password` as the password.
