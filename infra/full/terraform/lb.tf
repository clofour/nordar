resource "digitalocean_loadbalancer" "frontend" {
    name = "frontend-lb"
    type = "REGIONAL"
    region = var.region

    vpc_uuid = digitalocean_vpc.main.id

    redirect_http_to_https = true

    healthcheck {
        protocol = "http"
        port = 80
        path = "/healthz"
    }

    forwarding_rule {
        entry_port = 443
        entry_protocol = "https"

        target_port = 3080
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
        port = 80
        path = "/healthz"
    }

    forwarding_rule {
        entry_port = 443
        entry_protocol = "https"

        target_port = 8080
        target_protocol = "http"

        certificate_name = digitalocean_certificate.certificate.name
    }

    droplet_tag = "app"
}
