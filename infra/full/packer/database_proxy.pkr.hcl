source "digitalocean" "database_proxy" {
    api_token = var.do_api_token
    image = "debian-13-x64"
    region = "fra1"
    size = "s-1vcpu-512mb-10gb"
    ssh_username = "root"

    snapshot_name = "database_proxy-${formatdate("YYYYMMDDhhmmss", timestamp())}"
    snapshot_tags = [
        "database_proxy"
    ]
}

build {
    sources = ["source.digitalocean.database_proxy"]

    provisioner "ansible" {
        groups = [
            "database_proxy"
        ]
        playbook_file = "../ansible/database-proxy.yaml"
    }
}
