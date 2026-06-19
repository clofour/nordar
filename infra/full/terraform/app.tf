data "digitalocean_images" "app" {
    filter {
        key = "tags"
        values = ["app"]
    }
    sort {
        key = "name"
        direction = "desc"
    }

}

resource "digitalocean_droplet" "app" {
    count = var.app_count

    region = var.region
    image = data.digitalocean_images.app.images[0].id
    name = "app-${count.index}"
    size = var.droplet_size

    vpc_uuid = digitalocean_vpc.main.id

    tags = [
        "app"
    ]
}
