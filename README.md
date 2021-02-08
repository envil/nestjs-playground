# Nestjs Playground: Weather Alert Service
This application use Nx to maintain the monorepo architecture.
MongoDB, Mongoose.
There's a cronjob to periodically (every 30 seconds) get weather forecast data from https://openweathermap.org/ 
# Development Setup
```
# for the first time:
docker-compose build
npm install # for intellisense and testing

# every time:
docker-compose up
```
The watcher will watch and build the code automatically when it sees changes.

Go to `apps/api/src/environments/environment.ts` to change app configurations.
# Testing
 ```
nx test <PROJECT-NAME>
# E.g. nx test backend-weather
```
# TDD
Perform unittests as you write code.
```
nx test <PROJECT-NAME> --watch
# E.g. nx test backend-weather --watch
```
# Endpoints
After running `docker-compose up`:
## Get Weather Alert
### Get Last Weather Alert
```
curl http://localhost:3333/api/weather/cold-alert
```
