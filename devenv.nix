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
    ];

    languages.typescript.enable = true;

    dotenv.enable = true;
  };

}
