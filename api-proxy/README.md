# Apigee API Proxy
This API Proxy surfaces the Google NLP API and backend (Firebase) through a REST API. Endpoints available: `POST|GET /comments, DELETE /comments/{comment-id}.

## Demo Setup Instructions for Backend and Proxy

This document includes instructions for setting up the Firebase backend database, and API Proxy dependencies on Apigee Edge.

### Setting up Firebase backend
The demo API proxy stores customer comments and their sentiments data in a Firebase database on Google Cloud Platform. This process below can be used to set up a new backend database. 

#### Overview
Instructions for creating a firebase project to contain the backend data is shown below. A ZIP file, demo-setup.zip, contains everything needed to populate the Firebase database. 
Runtime access to the Firebase database is only via the Apigee Edge proxy. 

#### Pre-requisites
* Node.js and npm installed locally
* GCP account
* Apigee Edge account
* Your GCP service_account.json file

#### Set Up Node Directory
* Unzip demo-setup.zip.
* Change to demo-setup directory.
* Run "npm install" to install required node modules.

#### Create Firebase DB and Import
* Go to https://firebase.google.com .
* Click Go to Console at the top right.
* Click +ADD PROJECT button. Select your GCP project name from the drop-down list or enter a new project name.
* Click on Continue once the project is ready
* Accept defaults, terms, and Click Add Firebase button.
* Click Develop > Database in the left nav menu, scroll down to choose Realtime Database, and then click Create database button.
* Accept default read/write rules (Start in locked mode), and click Enable button.
* You will see the database URI to access your Firebase instance (https://{your-gcp-project-name}.firebaseio.com/). You'll need this later.

##### Import data into Firebase. 
* Click three dots on the right and select IMPORT JSON. Navigate to the data directory and select the demo-setup/firebase.data/apigee-partner-demo-db-firebase.json file. Click the IMPORT button.

##### Update Firebase Rules
* In the Firebase Console, select Develop > Database and click the Rules tab. 
* Open the demo-setup/firebase.rules file and copy the JSON from that file into the rules text box and hit Publish. 


#### Setting up Edge Proxy dependencies
The demo includes the CustomerSentiments API proxy that will run on Apigee Edge. In order to function, there are a few dependencies that must be pre-installed.

* KVM - that contains your GCP ServiceAccount credentials for access to the Firebase database using the admin SDK.
* SharedFlow - that contains the logic to generate an Oauth access token and cache it, for use in calls to the Google NLP target API.
* TargetServer - configuration to your Firebase backend database
* Caches - to cache the Google access token and pagination information

##### Update config.js
* Modify the following fields:
* config.defaultOrg (Edge org name)
* config.defaultEnv (Edge env name)
* config.defaultUsername (Edge login email address)
* config.defaultFirebaseHost (hostname to access API for your firebase DB -- should look like "*****.firebaseio.com")
You shouldn't need to modify the other configs if you are using Edge cloud.
Deploy
* Run "node ./setup.js".
* Answer questions. 
The org, env, username, and firebase hostname should default to the values you changed in config.js. 
You will have to enter password (Edge password), and 
the path to your GCP service_account.json file. 

When done answering these, the KVM, Caches, TargetServer, CustomerSentiments, and FirebaseAuthSharedFlow will be deployed to your chosen Edge org and environment.
