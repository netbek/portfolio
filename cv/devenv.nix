{
  pkgs,
  lib,
  config,
  inputs,
  ...
}:
{
  env.DEVENV_TASKS_QUIET = 1;

  packages = with pkgs; [
    ripgrep
  ];

  languages = {
    javascript = {
      enable = true;
      package = pkgs.nodejs_20;
      npm = {
        enable = true;
        install = {
          enable = true;
        };
      };
    };
  };
}
