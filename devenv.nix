{
  pkgs,
  lib,
  config,
  inputs,
  ...
}:

{
  config = {
    packages = with pkgs; [
      git
      nodejs_22
      nodePackages.eas-cli
    ];

    languages.typescript.enable = true;

    dotenv.enable = true;
  };

}
