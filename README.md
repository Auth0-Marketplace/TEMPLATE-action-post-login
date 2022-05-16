# Post Login Action Integration Template

This template is used to create Action Integrations in the Login flow. The Login Flow runs when a user logs in to any application in an Auth0 tenant.

## Documentation

- [Login flow documentation](https://auth0.com/docs/customize/actions/flows-and-triggers/login-flow)
- [Event object documentation](https://auth0.com/docs/customize/actions/flows-and-triggers/login-flow/event-object)
- [API object documentation](https://auth0.com/docs/customize/actions/flows-and-triggers/login-flow/api-object)
- [Action Integrations documentation](https://auth0.com/docs/customize/integrations/marketplace-partners/actions-integrations-for-partners)
- [Coding guidelines](https://auth0.com/docs/customize/actions/action-coding-guidelines)

## Getting started

This repo contains all the files required to create an integration that our mutual customers can install. In the `integration` folder you'll find the following files:
- [configuration.json](#configurationjson)
- [installation_guide.md](#installationguidemd)
- [integration.action.js](#integrationactionjs)
- [integration.action.spec.js](#integrationactionspecjs)

### `configuration.json`

This file defines environment secrets, variables(configuration), and dependencies for the Action execution runtime. When building your Action, use `events.secrets` for all values required from the customer through **secrets** and **configuration**.

This file has 3 main keys:
- `secrets` - array of values that need encryption (API keys, signing keys, etc.).
- `configuration` - array of values that are stored and edited in plain text  (URLs, labels, etc.).
- `dependencies` - Node.js dependencies used in the Action execution runtime

**Secrets** and **Configuration**:
- `name`: Required; the name used in the code. This value should be `ALL_CAPS_UNDERSCORE`.
- `label`: Required; the field label that will be used in the Auth0 dashboard.
- `description`: Required; the field description that will be used in the Auth0 dashboard.
- `default_value`: Optional; the default value to use.
- `options`: Optional; an array of option objects to use for a `configuration` select field:
    - `value`: Required; the value of the option if selected
    - `label`: Required; the text shown in the UI for this option

**Dependencies**:
- `name`: name of the package as listed on https://npmjs.com/
- `version`: version of the package

Here is an example `configuration.json` file
```json
{
  "secrets": [
    {
      "name": "ALL_CAPS_UNDERSCORE_SECRET",
      "label": "Field label that will be used in Auth0 Dashboard form",
      "description": "Field Description used in Auth0 Dashboard form",
      "default_value": "optional default value to use"
    }
  ],
  "configuration": [
    {
      "name": "ALL_CAPS_UNDERSCORE",
      "label": "Field label that will be used in Auth0 Dashboard form",
      "description": "Field Description used in Auth0 Dashboard form",
      "default_value": "optional default value to use",
      "options": [
        "value": "Optional array for a multi select of predefined values -- omit options for an input field",
        "label": "Text to show in multi select option field in Auth0 Dashboard"
      ]
    }
  ],
  "dependencies": [ 
    {
      "name": "package-name",
      "version": "latest" 
    }
  ]
}
```

### `installation_guide.md`

This is the Markdown-formatted instructions that tenant admins will use to install and configure your Action. This file has a number of `TODO` items that indicate what needs to be added. Your guide should retain the same format and general Auth0 installation steps.

### `integration.action.js`

This is the code that will run on a customer's tenant on all logins. See the [Login flow documentation](https://auth0.com/docs/customize/actions/flows-and-triggers/login-flow) for information on the data contained in the `event` object and the methods available on the `api` object.

### `integration.action.spec.js`

This is the [Jest](https://jestjs.io/docs/using-matchers) unit test suite that will run against your completed Action code. Add tests for success and failure paths.

## Build and test your Action

We've included a few helpful scripts in a `Makefile` that should help you build, test, and submit a quality integration. The commands below require Docker to be installed and running on your local machine (though no direct Docker experience is necessary). Download and install Docker [using these steps for your operating system](https://docs.docker.com/get-docker/). 

* `make test` - this will run the spec file explained above, along with a few other integrity checks.
* `make lint` - this will check and format your JS code according to our recommendations.
* `make deploy_init` - use this command to initialize deployments to a test tenant. You will need to [create a machine-to-machine application](https://auth0.com/docs/get-started/auth0-overview/create-applications/machine-to-machine-apps) authorized for the Management API with permissions `read:actions`, `update:actions`, `delete:actions`, and `create:actions`.
* `make deploy_get_token` - use this command after `deploy_init` to generate an access token
* `make deploy_create` - use this command to create a new Action based on the current integration files. If this successfully completes, you will see a URL in your terminal that will allow you to deploy and add the Action to a flow
* `make deploy_update` - use this command to update the created Action based on the current integration files.
* `make deploy_delete` - use this command to destoy the Action.

## Add documentation

The `README.md` file in the `integration` directory is provided as a template for your installation guide. Look for `TODO:` items to determine what needs to be filled out. 

## Submit for review

When your integration has been written and tested, it's time to submit it for review.

1. Replace the `media/256x256-logo.png` file with an image of the same size and format (256 pixel square on a transparent background)
1. If you provided value-proposition columns and would like to include images, replace the `media/460x260-column-*.png` files with images of the same size and format; otherwise, delete these images before submitting
1. Run `make zip` in the root of the integration package and upload the resulting archive to the Jira ticket.

If you have any questions or problems with this, please reply back on the support ticket!
