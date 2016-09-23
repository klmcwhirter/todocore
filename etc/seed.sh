#!/bin/bash

function getWord
{
    perl -nle '$word = $_ if rand($.) < 1; END { print $word }' /usr/share/dict/words
}

curl -v http://localhost:5000/api/todos/create/$(getWord)
curl -v http://localhost:5000/api/todos/create/$(getWord)
curl -v http://localhost:5000/api/todos/create/$(getWord)
curl -v http://localhost:5000/api/todos/create/$(getWord)
curl -v http://localhost:5000/api/todos/create/$(getWord)
curl -v http://localhost:5000/api/todos/create/$(getWord)
curl -v http://localhost:5000/api/todos/create/$(getWord)
curl -v http://localhost:5000/api/todos/create/$(getWord)
curl -v http://localhost:5000/api/todos/create/$(getWord)
curl -v http://localhost:5000/api/todos/create/$(getWord)

curl -v -X PUT http://localhost:5000/api/todos/markComplete/3/true
