resource "digitalocean_vpc" "main" {
    name = "nordar-vpc"
    region = var.region
    ip_range = "10.30.0.0/16"
}
