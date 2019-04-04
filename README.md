# WebApp Backend

## Setup

- Download and install [Google Cloud SDK](https://cloud.google.com/sdk/docs/downloads-interactive)

  - Once installation is completed you must run `gcloud init` in your terminal and login with the google account associated with Google Cloud Platform

  - For the Cloud Project select **united-triode-233023**

  - For the Google Compute Engine zone select **us-east1-d**

## For Deployment

- Run `npm run deploy`, this will build the Vue app and upload the built files with the server code to Google Cloud Platform

## For Running the Server 

- Run `npm run start`

- Running with a new build from the Vue App run `npm run dev`