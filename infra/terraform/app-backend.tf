resource "digitalocean_loadbalancer" "backend" {
    name = "backend-lb"
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

    droplet_tag = "backend"
}

data "digitalocean_images" "backend" {
    filter {
        key = "tags"
        values = ["backend"]
    }
    sort {
        key = "name"
        direction = "desc"
    }

}

resource "digitalocean_droplet" "backend" {
    count = var.backend_count

    region = var.region
    image = data.digitalocean_images.backend.images[0].id
    name = "backend-${count.index}"
    size = var.droplet_size

    vpc_uuid = digitalocean_vpc.main.id

    tags = [
        "backend"
    ]
}
