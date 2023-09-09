# CV

## Installation

1. Install NVM and Node 18.x:

    ```shell
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
    source ~/.bashrc
    nvm install v18.16.0
    nvm alias default v18.16.0
    ```

2. Install local dependencies:

    ```shell
    npm ci
    ```

## Development

TODO

## Deployment

Build for production:

```shell
npm run build
```

## License

Copyright (c) 2023 Hein Bekker. Licensed under the GNU Affero General Public License, version 3.
