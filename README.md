# What is this?

This the source for [carbonmanifesto.org](http://carbonmanifesto.org)

# How to run locally

1. Install [node](https://nodejs.org/en/download/)
2. Install [meteor](https://www.meteor.com/install)
3. Type `meteor` in this folder
4. Surf to http://localhost:3000

# How to administrate

The only administrative task is to approve translations.
Do that by surfing to http://localhost:3000/admin

On first start, a default admin user "admin@carbonmanifesto.org" is created with password "admin".
You'll obviously need to change that if running in production...

# How to add more administrators

1. Surf to http://localhost:3000/admin
2. Click "Sign In" and create a new user
3. Open the Mongo DB directly, open the users collection, find the new user and add `roles: ["admin"]`

If you want an example check the default admin user.

# How to test

There are some unit tests. To run them, type `npm test`

# How to deploy

Depends on which hosting provider you use. The deploy.sh script is based on the current
hosting environment at nodechef.

# Environment variables

* Google translation only works if you set env variable GOOGLE_API_KEY
* Slack notifications only work if you set env variable SLACK_WEBHOOK_URL

