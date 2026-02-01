# Portfolio

## Installation

1. Install Nix:

    ```shell
    sh <(curl -L https://nixos.org/nix/install) --daemon
    ```

2. Configure Nix. Edit `/etc/nix/nix.conf` (for a multi-user installation) or `~/.config/nix/nix.conf` (for a single-user installation) to include the following lines:

    ```shell
    experimental-features = nix-command flakes
    trusted-users = root <USER>
    ```

    Replace `<USER>` with your username on your computer.

3. Install direnv:

    ```shell
    sudo apt install direnv
    ```

4. Enable direnv in your shell by adding a line to your shell configuration file.

    For Bash, edit `~/.bashrc`:

    ```shell
    eval "$(direnv hook bash)"
    ```

5. Allow `.envrc`:

    ```shell
    direnv allow
    ```

## Development

Run locally with LiveReload:

```shell
gulp livereload
```

## Deployment

Build for production:

```shell
npm run build
```

Deploy to GitHub Pages:

```shell
npm run deploy
```

## License

Copyright (c) 2018 Hein Bekker. Licensed under the GNU Affero General Public License, version 3.
