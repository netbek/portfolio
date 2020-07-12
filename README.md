# Portfolio

## Installation

1. Install NVM and Node 8.x:

    ```shell
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
    source ~/.bashrc
    nvm install v10.19.0
    nvm alias default v10.19.0
    ```

2. Install global dependencies:

    ```shell
    npm i -g gulp-cli
    ```

3. Install local dependencies:

    ```shell
    npm ci
    ```

## Development

Run locally with LiveReload:

```shell
gulp livereload
```

## Deployment

Build for production:

```shell
gulp prod
```

Deploy to GitHub Pages:

```shell
npm run deploy
```

## License

Copyright (c) 2018 Hein Bekker. Licensed under the GNU Affero General Public License, version 3.
