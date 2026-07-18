---
title: Workflow syntax for GitHub Actions
shortTitle: Workflow syntax
intro: A workflow is a configurable automated process made up of one or more jobs. You must create a YAML file to define your workflow configuration.
redirect_from:
  - /articles/workflow-syntax-for-github-actions
  - /github/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions
  - /actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions
  - /actions/learn-github-actions/workflow-syntax-for-github-actions
  - /actions/using-workflows/workflow-syntax-for-github-actions
  - /actions/writing-workflows/workflow-syntax-for-github-actions
  - /actions/reference/github_token-reference
  - /actions/reference/workflow-syntax-for-github-actions
versions:
  fpt: '*'
  ghes: '*'
  ghec: '*'
category:
  - Write workflows
contentType: reference
---

{% data reusables.actions.enterprise-github-hosted-runners %}

## About YAML syntax for workflows

Workflow files use YAML syntax, and must have either a `.yml` or `.yaml` file extension. {% data reusables.actions.learn-more-about-yaml %}

You must store workflow files in the `.github/workflows` directory of your repository.

## `name`

{% data reusables.actions.workflows.workflow-syntax-name %}

## `run-name`

The name for workflow runs generated from the workflow. {% data variables.product.prodname_dotcom %} displays the workflow run name in the list of workflow runs on your repository's "Actions" tab. If `run-name` is omitted or is only whitespace, then the run name is set to event-specific information for the workflow run. For example, for a workflow triggered by a `push` or `pull_request` event, it is set as the commit message or the title of the pull request.

This value can include expressions and can reference the [`github`](/actions/reference/workflows-and-actions/contexts#github-context) and [`inputs`](/actions/reference/workflows-and-actions/contexts#inputs-context) contexts.

### Example of `run-name`

{% raw %}

```yaml
run-name: Deploy to ${{ inputs.deploy_target }} by @${{ github.actor }}
```

{% endraw %}

## `on`

{% data reusables.actions.workflows.section-triggering-a-workflow %}

## `on.<event_name>.types`

{% data reusables.actions.workflows.section-triggering-a-workflow-types %}

## `on.<pull_request|pull_request_target>.<branches|branches-ignore>`

{% data reusables.actions.workflows.triggering-workflow-branches1 %}

### Example: Including branches

{% data reusables.actions.workflows.triggering-workflow-branches2 %}

### Example: Excluding branches

{% data reusables.actions.workflows.triggering-workflow-branches3 %}

### Example: Including and excluding branches

{% data reusables.actions.workflows.triggering-workflow-branches4 %}

## `on.push.<branches|tags|branches-ignore|tags-ignore>`

{% data reusables.actions.workflows.run-on-specific-branches-or-tags1 %}

### Example: Including branches and tags

{% data reusables.actions.workflows.run-on-specific-branches-or-tags2 %}

### Example: Excluding branches and tags

{% data reusables.actions.workflows.run-on-specific-branches-or-tags3 %}

### Example: Including and excluding branches and tags

{% data reusables.actions.workflows.run-on-specific-branches-or-tags4 %}

## `on.<push|pull_request|pull_request_target>.<paths|paths-ignore>`

{% data reusables.actions.workflows.triggering-a-workflow-paths1 %}

### Example: Including paths

{% data reusables.actions.workflows.triggering-a-workflow-paths2 %}

### Example: Excluding paths

{% data reusables.actions.workflows.triggering-a-workflow-paths3 %}

### Example: Including and excluding paths

{% data reusables.actions.workflows.triggering-a-workflow-paths4 %}

### Git diff comparisons

{% data reusables.actions.workflows.triggering-a-workflow-paths5 %}

## `on.schedule`

You can use `on.schedule` to define a time schedule for your workflows.

{% data reusables.repositories.actions-scheduled-workflow-example %}

For more information about `schedule` events, see [AUTOTITLE](/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule).

## `on.workflow_call`

Use `on.workflow_call` to define the inputs and outputs for a reusable workflow. You can also map the secrets that are available to the called workflow. For more information on reusable workflows, see [AUTOTITLE](/actions/how-tos/reuse-automations/reuse-workflows).

## `on.workflow_call.inputs`

When using the `workflow_call` keyword, you can optionally specify inputs that are passed to the called workflow from the caller workflow. For more information about the `workflow_call` keyword, see [AUTOTITLE](/actions/reference/workflows-and-actions/events-that-trigger-workflows#workflow_call).

In addition to the standard input parameters that are available, `on.workflow_call.inputs` requires a `type` parameter. For more information, see [`on.workflow_call.inputs.<input_id>.type`](#onworkflow_callinputsinput_idtype).

If a `default` parameter is not set, the default value of the input is `false` for a boolean, `0` for a number, and `""` for a string.

Within the called workflow, you can use the `inputs` context to refer to an input. For more information, see [AUTOTITLE](/actions/reference/workflows-and-actions/contexts#inputs-context).

If a caller workflow passes an input that is not specified in the called workflow, this results in an error.

### Example of `on.workflow_call.inputs`

{% raw %}

```yaml
on:
  workflow_call:
    inputs:
      username:
        description: 'A username passed from the caller workflow'
        default: 'john-doe'
        required: false
        type: string

jobs:
  print-username:
    runs-on: ubuntu-latest

    steps:
      - name: Print the input name to STDOUT
        run: echo The username is ${{ inputs.username }}
```

{% endraw %}

For more information, see [AUTOTITLE](/actions/how-tos/reuse-automations/reuse-workflows).

## `on.workflow_call.inputs.<input_id>.type`

Required if input is defined for the `on.workflow_call` keyword. The value of this parameter is a string specifying the data type of the input. This must be one of: `boolean`, `number`, or `string`.

## `on.workflow_call.outputs`

A map of outputs for a called workflow. Called workflow outputs are available to all downstream jobs in the caller workflow. Each output has an identifier, an optional `description,` and a `value.` The `value` must be set to the value of an output from a job within the called workflow.

In the example below, two outputs are defined for this reusable workflow: `workflow_output1` and `workflow_output2`. These are mapped to outputs called `job_output1` and `job_output2`, both from a job called `my_job`.

### Example of `on.workflow_call.outputs`

{% raw %}

```yaml
on:
  workflow_call:
    # Map the workflow outputs to job outputs
    outputs:
      workflow_output1:
        description: "The first job output"
        value: ${{ jobs.my_job.outputs.job_output1 }}
      workflow_output2:
        description: "The second job output"
        value: ${{ jobs.my_job.outputs.job_output2 }}
```

{% endraw %}

For information on how to reference a job output, see [`jobs.<job_id>.outputs`](#jobsjob_idoutputs). For more information, see [AUTOTITLE](/actions/how-tos/reuse-automations/reuse-workflows).

## `on.workflow_call.secrets`

A map of the secrets that can be used in the called workflow.

Within the called workflow, you can use the `secrets` context to refer to a secret.

> [!NOTE]
> If you are passing the secret to a nested reusable workflow, then you must use [`jobs.<job_id>.secrets`](#jobsjob_idsecrets) again to pass the secret. For more information, see [AUTOTITLE](/actions/how-tos/reuse-automations/reuse-workflows#passing-secrets-to-nested-workflows).

If a caller workflow passes a secret that is not specified in the called workflow, this results in an error.

### Example of `on.workflow_call.secrets`

{% raw %}

```yaml
on:
  workflow_call:
    secrets:
      access-token:
        description: 'A token passed from the caller workflow'
        required: false

jobs:

  pass-secret-to-action:
    runs-on: ubuntu-latest
    steps:
    # passing the secret to an action
      - name: Pass the received secret to an action
        uses: ./.github/actions/my-action
        with:
          token: ${{ secrets.access-token }}

  # passing the secret to a nested reusable workflow
  pass-secret-to-workflow:
    uses: ./.github/workflows/my-workflow
    secrets:
       token: ${{ secrets.access-token }}
```

{% endraw %}

## `on.workflow_call.secrets.<secret_id>`

A string identifier to associate with the secret.

## `on.workflow_call.secrets.<secret_id>.required`

A boolean specifying whether the secret must be supplied.

## `on.workflow_run.<branches|branches-ignore>`

{% data reusables.actions.workflows.section-specifying-branches %}

## `on.workflow_dispatch`

{% data reusables.actions.workflow-dispatch %}

## `on.workflow_dispatch.inputs`

{% data reusables.actions.workflow-dispatch-inputs %}

### Example of `on.workflow_dispatch.inputs`

{% data reusables.actions.workflow-dispatch-inputs-example %}

## `on.workflow_dispatch.inputs.<input_id>.required`

A boolean specifying whether the input must be supplied.

## `on.workflow_dispatch.inputs.<input_id>.type`

The value of this parameter is a string specifying the data type of the input. This must be one of: `boolean`, `choice`, `number`, `environment` or `string`.

## `permissions`

{% data reusables.actions.jobs.section-assigning-permissions-to-jobs %}

### Defining access for the `GITHUB_TOKEN` scopes

{% data reusables.actions.github-token-available-permissions %}

#### Changing the permissions in a forked repository

{% data reusables.actions.forked-write-permission %}

## How permissions are calculated for a workflow job

The permissions for the `GITHUB_TOKEN` are initially set to the default setting for the enterprise, organization, or repository. If the default is set to the restricted permissions at any of these levels then this will apply to the relevant repositories. For example, if you choose the restricted default at the organization level then all repositories in that organization will use the restricted permissions as the default. The permissions are then adjusted based on any configuration within the workflow file, first at the workflow level and then at the job level. Finally, if the workflow was triggered by a pull request event other than `pull_request_target` from a forked repository, and the **Send write tokens to workflows from pull requests** setting is not selected, the permissions are adjusted to change any write permissions to read only.

### Setting the `GITHUB_TOKEN` permissions for all jobs in a workflow

You can specify `permissions` at the top level of a workflow, so that the setting applies to all jobs in the workflow.

#### Example: Setting the `GITHUB_TOKEN` permissions for an entire workflow

{% data reusables.actions.jobs.setting-permissions-all-jobs-example %}

### Using the `permissions` key for forked repositories

You can use the `permissions` key to add and remove `read` permissions for forked repositories, but typically you can't grant `write` access. The exception to this behavior is where an admin user has selected the **Send write tokens to workflows from pull requests** option in the {% data variables.product.prodname_actions %} settings. For more information, see [AUTOTITLE](/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository#enabling-workflows-for-private-repository-forks).

### Permissions for workflow runs triggered by {% data variables.product.prodname_dependabot %}

{% data reusables.actions.workflow-runs-dependabot-note %}

## `env`

A `map` of variables that are available to the steps of all jobs in the workflow. You can also set variables that are only available to the steps of a single job or to a single step. For more information, see [`jobs.<job_id>.env`](#jobsjob_idenv) and [`jobs.<job_id>.steps[*].env`](#jobsjob_idstepsenv).

Variables in the `env` map cannot be defined in terms of other variables in the map.

{% data reusables.repositories.actions-env-var-note %}

### Example of `env`

```yaml
env:
  SERVER: production
```

## `defaults`

{% data reusables.actions.jobs.setting-default-values-for-jobs-defaults %}

## `defaults.run`

{% data reusables.actions.jobs.setting-default-values-for-jobs-defaults-run %}

## `defaults.run.shell`

{% data reusables.actions.jobs.setting-default-values-for-jobs-defaults-run-shell %}

## `defaults.run.working-directory`

{% data reusables.actions.jobs.setting-default-values-for-jobs-defaults-run-working-directory %}

## `concurrency`

{% data reusables.actions.jobs.section-using-concurrency %}

## `jobs`

{% data reusables.actions.jobs.section-using-jobs-in-a-workflow %}

## `jobs.<job_id>`

{% data reusables.actions.jobs.section-using-jobs-in-a-workflow-id %}

## `jobs.<job_id>.name`

{% data reusables.actions.jobs.section-using-jobs-in-a-workflow-name %}

## `jobs.<job_id>.permissions`

{% data reusables.actions.jobs.section-assigning-permissions-to-jobs-specific %}

{% data reusables.actions.github-token-scope-descriptions %}

### Defining access for the `GITHUB_TOKEN` scopes

{% data reusables.actions.github-token-available-permissions %}

#### Changing the permissions in a forked repository

{% data reusables.actions.forked-write-permission %}

#### Example: Setting the `GITHUB_TOKEN` permissions for one job in a workflow

{% data reusables.actions.jobs.setting-permissions-specific-jobs-example %}

## `jobs.<job_id>.needs`

{% data reusables.actions.jobs.section-using-jobs-in-a-workflow-needs %}

## `jobs.<job_id>.if`

{% data reusables.actions.jobs.section-using-conditions-to-control-job-execution %}

## `jobs.<job_id>.runs-on`

{% data reusables.actions.jobs.choosing-runner-overview %}

### Choosing {% data variables.product.prodname_dotcom %}-hosted runners

{% data reusables.actions.jobs.choosing-runner-github-hosted %}

### Choosing self-hosted runners

{% data reusables.actions.jobs.choosing-runner-self-hosted %}

### Choosing runners in a group

{% data reusables.actions.jobs.choosing-runner-group %}

{% ifversion not ghes %}

## `jobs.<job_id>.snapshot`

{% data reusables.actions.jobs.choosing-runner-custom-images %}

{% endif %}

## `jobs.<job_id>.environment`

{% data reusables.actions.jobs.section-using-environments-for-jobs %}

## `jobs.<job_id>.concurrency`

{% data reusables.actions.jobs.section-using-concurrency-jobs %}

## `jobs.<job_id>.outputs`

{% data reusables.actions.jobs.section-defining-outputs-for-jobs %}

## `jobs.<job_id>.env`

A `map` of variables that are available to all steps in the job. You can set variables for the entire workflow or an individual step. For more information, see [`env`](#env) and [`jobs.<job_id>.steps[*].env`](#jobsjob_idstepsenv).

{% data reusables.repositories.actions-env-var-note %}

### Example of `jobs.<job_id>.env`

```yaml
jobs:
  job1:
    env:
      FIRST_NAME: Mona
```

## `jobs.<job_id>.defaults`

{% data reusables.actions.jobs.setting-default-values-for-jobs-defaults-job %}

## `jobs.<job_id>.defaults.run`

{% data reusables.actions.jobs.setting-default-values-for-jobs-defaults-job-run %}

## `jobs.<job_id>.defaults.run.shell`

{% data reusables.actions.jobs.setting-default-values-for-jobs-defaults-run-shell %}

## `jobs.<job_id>.defaults.run.working-directory`

{% data reusables.actions.jobs.setting-default-values-for-jobs-defaults-run-working-directory %}

### Example: Setting default `run` step options for a job

{% data reusables.actions.jobs.setting-default-run-value-for-job-example %}

## `jobs.<job_id>.steps`

A job contains a sequence of tasks called `steps`. Steps can run commands, run setup tasks, or run an action in your repository, a public repository, or an action published in a Docker registry. Not all steps run actions, but all actions run as a step. Each step runs in its own process in the runner environment and has access to the workspace and filesystem. Because steps run in their own process, changes to environment variables are not preserved between steps. {% data variables.product.prodname_dotcom %} provides built-in steps to set up and complete a job.

{% data variables.product.prodname_dotcom %} only displays the first 1,000 checks, however, you can run an unlimited number of steps as long as you are within the workflow usage limits. For more information, see [AUTOTITLE](/actions/concepts/billing-and-usage) for {% data variables.product.prodname_dotcom %}-hosted runners and [AUTOTITLE](/actions/reference/limits) for self-hosted runner usage limits.

### Example of `jobs.<job_id>.steps`

{% raw %}

```yaml
name: Greeting from Mona

on: push

jobs:
  my-job:
    name: My Job
    runs-on: ubuntu-latest
    steps:
      - name: Print a greeting
        env:
          MY_VAR: Hi there! My name is
          FIRST_NAME: Mona
          MIDDLE_NAME: The
          LAST_NAME: Octocat
        run: |
          echo $MY_VAR $FIRST_NAME $MIDDLE_NAME $LAST_NAME.
```

{% endraw %}

## `jobs.<job_id>.steps[*].id`

A unique identifier for the step. You can use the `id` to reference the step in contexts. For more information, see [AUTOTITLE](/actions/reference/workflows-and-actions/contexts).

## `jobs.<job_id>.steps[*].if`

You can use the `if` conditional to prevent a step from running unless a condition is met. {% data reusables.actions.if-supported-contexts %}

{% data reusables.actions.expression-syntax-if %} For more information, see [AUTOTITLE](/actions/reference/workflows-and-actions/expressions).

### Example: Using contexts

This step only runs when the event type is a `pull_request` and the event action is `unassigned`.

```yaml
steps:
  - name: My first step
    if: {% raw %}${{ github.event_name == 'pull_request' && github.event.action == 'unassigned' }}{% endraw %}
    run: echo This event is a pull request that had an assignee removed.
```

### Example: Using status check functions

The `my backup step` only runs when the previous step of a job fails. For more information, see [AUTOTITLE](/actions/reference/workflows-and-actions/expressions#status-check-functions).

```yaml
steps:
  - name: My first step
    uses: octo-org/action-name@main
  - name: My backup step
    if: {% raw %}${{ failure() }}{% endraw %}
    uses: actions/heroku@1.0.0
```

### Example: Using secrets

Secrets cannot be directly referenced in `if:` conditionals. Instead, consider setting secrets as job-level environment variables, then referencing the environment variables to conditionally run steps in the job.

If a secret has not been set, the return value of an expression referencing the secret (such as {% raw %}`${{ secrets.SuperSecret }}`{% endraw %} in the example) will be an empty string.

{% raw %}

```yaml
name: Run a step if a secret has been set
on: push
jobs:
  my-jobname:
    runs-on: ubuntu-latest
    env:
      super_secret: ${{ secrets.SuperSecret }}
    steps:
      - if: ${{ env.super_secret != '' }}
        run: echo 'This step will only run if the secret has a value set.'
      - if: ${{ env.super_secret == '' }}
        run: echo 'This step will only run if the secret does not have a value set.'
```

{% endraw %}

For more information, see [AUTOTITLE](/actions/reference/workflows-and-actions/contexts#context-availability) and [AUTOTITLE](/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets).

## `jobs.<job_id>.steps[*].name`

A name for your step to display on {% data variables.product.prodname_dotcom %}.

## `jobs.<job_id>.steps[*].uses`

Selects an action to run as part of a step in your job. An action is a reusable unit of code. You can use an action defined in the same repository as the workflow, a public repository, or in a [published Docker container image](https://hub.docker.com/).

We strongly recommend that y
