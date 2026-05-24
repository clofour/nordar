data "digitalocean_images" "database_proxy" {
    filter {
        key = "tags"
        values = ["database_proxy"]
    }
    sort {
        key = "name"
        direction = "desc"
    }

}

resource "digitalocean_droplet" "database_proxy" {
    count = var.database_proxy_count

    region = var.region
    image = data.digitalocean_images.database_proxy.images[0].id
    name = "database_proxy-${count.index}"
    size = var.droplet_size

    vpc_uuid = digitalocean_vpc.main.id

    tags = [
        "database_proxy"
    ]
}
