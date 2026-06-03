terraform {
    required_version = "~> 1.14.7"

    required_providers {
      digitalocean = {
        source = "digitalocean/digitalocean"
        version = "~> 2.81.0"
      }
      random = {
        source = "hashicorp/random"
        version = "~> 3.9.0"
      }
    }
}