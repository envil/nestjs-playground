# Nestjs Playground: Weather Alert Service
This application use Nx to maintain the monorepo architecture.
# Development Setup
```
# for the first time:
docker-compose build
npm install # for intellisense and testing

# every time:
docker-compose up
```
The watcher will watch and build the code automatically when it sees changes.
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
