gcloud SDK setup


1. install google cloud sdk
Visit: https://cloud.google.com/sdk/docs/quickstart-macos

2. make sure `gcloud -v` works in the terminal
3. login with the gcloud account. `gcloud auth login`
4. initialize gcloud and connect to the desired project. `gcloud init`
5. add project context to docker k8s so we can switch context. `gcloud container clusters get-credentials ticketing-dev`
