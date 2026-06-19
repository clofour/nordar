source "digitalocean" "app" {
    api_token = var.do_api_token
    image = "debian-13-x64"
    region = "fra1"
    size = "s-1vcpu-512mb-10gb"
    ssh_username = "root"

    snapshot_name = "app-${formatdate("YYYYMMDDhhmmss", timestamp())}"
    snapshot_tags = [
        "app"
    ]
}

build {
    sources = ["source.digitalocean.app"]

    provisioner "ansible" {
        groups = [
            "app"
        ]
        playbook_file = "../ansible/app.yaml"
    }
}
