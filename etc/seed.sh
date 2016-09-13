#!/bin/bash

curl -v http://localhost:5000/api/todos/create
curl -v http://localhost:5000/api/todos/create
curl -v http://localhost:5000/api/todos/create
curl -v http://localhost:5000/api/todos/create
curl -v http://localhost:5000/api/todos/create

curl -v -X PUT http://localhost:5000/api/todos/markComplete/3/true
