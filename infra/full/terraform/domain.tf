locals {
    network = yamldecode(file("${path.module}/../shared/network.yaml"))
    hostnames = local.network.hostnames

    public_records = {
        frontend = {
            type = "A",
            name = var.frontend_subdomain,
            value = digitalocean_loadbalancer.app.ip
        },
        backend = {
            type = "A",
            name = var.backend_subdomain,
            value = digitalocean_loadbalancer.app.ip
        }
    }

    private_records = {
        for name, instance in digitalocean_droplet.database_proxy : name => {
            type = "A",
            name = local.hostnames.database,
            value = instance.ipv4_address_private
        }
    }
}

data "digitalocean_domain" "domain" {
    name = var.domain
}

resource "digitalocean_record" "public" {
    for_each = local.public_records

    type = each.value.type
    domain = var.domain
    name = each.value.name
    value = each.value.value
}

resource "digitalocean_record" "private" {
    for_each = local.private_records

    type = each.value.type
    domain = var.domain
    name = each.value.name
    value = each.value.value
}

resource "digitalocean_certificate" "certificate" {
    name = "certificate"
    type = "lets_encrypt"
    domains = [
        var.domain,
        "${var.frontend_subdomain}.${var.domain}",
        "${var.backend_subdomain}.${var.domain}"
    ]
}