[//]: # "This README.md file is auto-generated, all changes to this file will be lost."
[//]: # "To regenerate it, use `npm run generate-scaffolding`."
<img src="https://avatars2.githubusercontent.com/u/2810941?v=3&s=96" alt="Google Cloud Platform logo" title="Google Cloud Platform" align="right" height="96" width="96"/>

# [Google Cloud Datastore: Node.js Client](https://github.com/googleapis/nodejs-datastore)

[![release level](https://img.shields.io/badge/release%20level-general%20availability%20%28GA%29-brightgreen.svg?style&#x3D;flat)](https://cloud.google.com/terms/launch-stages)
[![npm version](https://img.shields.io/npm/v/@google-cloud/datastore.svg)](https://www.npmjs.org/package/@google-cloud/datastore)
[![codecov](https://img.shields.io/codecov/c/github/googleapis/nodejs-datastore/master.svg?style=flat)](https://codecov.io/gh/googleapis/nodejs-datastore)

[Cloud Datastore](https://cloud.google.com/datastore/docs) is a NoSQL document database built for automatic scaling, high performance, and ease of application development. While the Cloud Datastore interface has many of the same features as traditional databases, as a NoSQL database it differs from them in the way it describes relationships between data objects.


* [Using the client library](#using-the-client-library)
* [Samples](#samples)
* [Versioning](#versioning)
* [Contributing](#contributing)
* [License](#license)

## Using the client library

1.  [Select or create a Cloud Platform project][projects].

1.  [Enable billing for your project][billing].

1.  [Enable the Google Cloud Datastore API][enable_api].

1.  [Set up authentication with a service account][auth] so you can access the
    API from your local workstation.

1. Install the client library:

        npm install --save @google-cloud/datastore

1. Try an example:

```javascript
// Imports the Google Cloud client library
const {Datastore} = require('@google-cloud/datastore');

async function quickStart() {
  // Your Google Cloud Platform project ID
  const projectId = 'YOUR_PROJECT_ID';

  // Creates a client
  const datastore = new Datastore({
    projectId: projectId,
  });

  // The kind for the new entity
  const kind = 'Task';
  // The name/ID for the new entity
  const name = 'sampletask1';
  // The Cloud Datastore key for the new entity
  const taskKey = datastore.key([kind, name]);

  // Prepares the new entity
  const task = {
    key: taskKey,
    data: {
      description: 'Buy milk',
    },
  };

  // Saves the entity
  await datastore.save(task);
  console.log(`Saved ${task.key.name}: ${task.data.description}`);
}
quickStart().catch(console.error);
```

## Samples

Samples are in the [`samples/`](https://github.com/googleapis/nodejs-datastore/tree/master/samples) directory. The samples' `README.md`
has instructions for running the samples.

| Sample                      | Source Code                       | Try it |
| --------------------------- | --------------------------------- | ------ |
| Tasks | [source code](https://github.com/googleapis/nodejs-datastore/blob/master/samples/tasks.js) | [![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-datastore&page=editor&open_in_editor=samples/tasks.js,samples/README.md) |
| Concepts | [source code](https://github.com/googleapis/nodejs-datastore/blob/master/samples/concepts.js) | [![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-datastore&page=editor&open_in_editor=samples/concepts.js,samples/README.md) |

The [Cloud Datastore Node.js Client API Reference][client-docs] documentation
also contains samples.

## Versioning

This library follows [Semantic Versioning](http://semver.org/).

This library is considered to be **General Availability (GA)**. This means it
is stable; the code surface will not change in backwards-incompatible ways
unless absolutely necessary (e.g. because of critical security issues) or with
an extensive deprecation period. Issues and requests against **GA** libraries
are addressed with the highest priority.

More Information: [Google Cloud Platform Launch Stages][launch_stages]

[launch_stages]: https://cloud.google.com/terms/launch-stages

## Contributing

Contributions welcome! See the [Contributing Guide](https://github.com/googleapis/nodejs-datastore/blob/master/CONTRIBUTING.md).

## License

Apache Version 2.0

See [LICENSE](https://github.com/googleapis/nodejs-datastore/blob/master/LICENSE)

## What's Next

* [Cloud Datastore Documentation][product-docs]
* [Cloud Datastore Node.js Client API Reference][client-docs]
* [github.com/googleapis/nodejs-datastore](https://github.com/googleapis/nodejs-datastore)

Read more about the client libraries for Cloud APIs, including the older
Google APIs Client Libraries, in [Client Libraries Explained][explained].

[explained]: https://cloud.google.com/apis/docs/client-libraries-explained

[client-docs]: https://cloud.google.com/nodejs/docs/reference/datastore/latest/
[product-docs]: https://cloud.google.com/datastore/docs
[shell_img]: https://gstatic.com/cloudssh/images/open-btn.png
[projects]: https://console.cloud.google.com/project
[billing]: https://support.google.com/cloud/answer/6293499#enable-billing
[enable_api]: https://console.cloud.google.com/flows/enableapi?apiid=datastore.googleapis.com
[auth]: https://cloud.google.com/docs/authentication/getting-started
