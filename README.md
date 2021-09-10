# Summary

## Deployment

Server deployment based off this kubernetes quickstart: https://cloud.google.com/kubernetes-engine/docs/quickstarts/deploying-a-language-specific-app

Server deploys based on kubernetes/cloudbuild.yaml. Deploys to static IP address (34.66.93.190), which is also hosted at http://hs.lakegh.com. Has continous integration off of `main` branch at https://github.com/SolomonLake/human-stratego-web.

## Local dev

Run `yarn run start-server`
Open new terminal tab
Run `yarn run start-client`
