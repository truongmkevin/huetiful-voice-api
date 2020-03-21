# Database & Models

## Initializing your MongoDB


## Database Seeding

Due to the lack of straightforward seeding tools and plugins out there, I've written one for us that allows us to use the models to quickly generate data using [Faker](https://github.com/marak/Faker.js/).

```
models
-- User.js
-- Hub.js
-- YourModel.js

seeds
-- seeder.js
-- UserSeeder.js
-- HubSeeder.js
```

Utilizing our models, our seeds can quickly generate some data by running our seed command `node seeds/seeder.js`.

The `seeder.js` file is our executable script for emptying our database and running all of our seed data inputs. it is configurable with the following options:

`--drop-all`: this will drop all collections before seeding. 

## Add a new seed

We use `faker` to fill an array with dummy data, then export the method so it can be run in `seeder.js`. See the `HubSeeder.js` for an example.


