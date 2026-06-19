locals {
    network = yamldecode(file("${path.module}/../shared/network.yaml"))
    ports = local.network.ports
}

resource "digitalocean_loadbalancer" "frontend" {
    name = "frontend-lb"
    type = "REGIONAL"
    region = var.region

    vpc_uuid = digitalocean_vpc.main.id

    redirect_http_to_https = true

    healthcheck {
        protocol = "http"
        port = local.ports.frontend
        path = "/healthz"
    }

    forwarding_rule {
        entry_port = local.ports.https
        entry_protocol = "https"

        target_port = local.ports.frontend
        target_protocol = "http"

        certificate_name = digitalocean_certificate.certificate.name
    }

    droplet_tag = "app"
}

resource "digitalocean_loadbalancer" "backend" {
    name = "backend-lb"
    type = "REGIONAL"
    region = var.region

    vpc_uuid = digitalocean_vpc.main.id

    redirect_http_to_https = true

    healthcheck {
        protocol = "http"
        port = local.ports.backend
        path = "/healthz"
    }

    forwarding_rule {
        entry_port = local.ports.https
        entry_protocol = "https"

        target_port = local.ports.backend
        target_protocol = "http"

        certificate_name = digitalocean_certificate.certificate.name
    }

    droplet_tag = "app"
}
