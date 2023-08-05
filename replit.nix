{ pkgs }: {
    deps = [
        pkgs.sudo
        pkgs.openssh_with_kerberos
        pkgs.nodejs-16_x
        pkgs.nodePackages.typescript
        pkgs.ffmpeg
        pkgs.imagemagick
        pkgs.git
        pkgs.neofetch
        pkgs.libwebp
        pkgs.speedtest-cli
        pkgs.wget
        pkgs.yarn
        pkgs.libuuid
        pkgs.libpng
    ];
    env = {
        LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [
            pkgs.libuuid
            pkgs.libpng
        ];
    };
}