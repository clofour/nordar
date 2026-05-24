data "digitalocean_images" "database" {
    filter {
        key = "tags"
        values = ["database"]
    }
    sort {
        key = "name"
        direction = "desc"
    }

}

resource "digitalocean_droplet" "database" {
    count = var.database_count

    region = var.region
    image = data.digitalocean_images.database.images[0].id
    name = "database-${count.index}"
    size = var.droplet_size

    vpc_uuid = digitalocean_vpc.main.id

    tags = [
        "database"
    ]
}
