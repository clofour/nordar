resource "digitalocean_loadbalancer" "app" {
    name = "app-lb"
    region = var.region

    vpc_uuid = digitalocean_vpc.main.id

    healthcheck {
        protocol = "http"
        port = 80
        path = "/healthz"
    }

    forwarding_rule {
        entry_port = 443
        entry_protocol = "https"

        target_port = 80
        target_protocol = "http"

        certificate_name = digitalocean_certificate.certificate.name
    }

    droplet_tag = "app"
}
