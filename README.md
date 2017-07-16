# GitLab Source Code Statistics

## What does it do?

This application crawls the whole source code base which is available in your user context.
If you are a gitlab administrator, you will gain an overview of all sources.
Currently you are able to see file names, file extensions, and project names to identify the usage of the files,
e.g. to get an overview which programming languages are used inside of a project or overall projects.

## Requirements

you need the following dependencies installed
to run the application: 
1. docker 
1. docker-compose

If you do not have docker, you need to setup
1. elasticsearch
1. kibana
1. nodejs
1. npm

manually.
Keep in mind that you might need to customize your elasticsearch server url inside of config.js. 

## Setup

1. setup a new access token by visiting [https://yourgitlabinstance.example.com/profile/personal_access_tokens](https://yourgitlabinstance.example.com/profile/personal_access_tokens)
1. Rename config.example.js to config.js
1. add your gitlab instance url and your private token
1. run 
```
$ docker-compose up -d
```
1. visit your [Kibana](http://localhost:5601/app/kibana#/management/kibana/objects)-Instance and import the export.json file.
1. Switch to the [Dashboards](http://localhost:5601/app/kibana#/dashboard/b5b52080-69ab-11e7-88d5-79ac22af4634) to analyze your data.

Have Fun!
