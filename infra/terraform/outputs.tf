output "frontend_spaces_bucket" {
    value = digitalocean_spaces_bucket.frontend.name
}


output "database_proxy_nodes" {
    value = { for k, v in digitalocean_droplet.database_proxy : k => v.ipv4_address }
}

output "database_nodes" {
    value = { for k, v in digitalocean_droplet.database : k => v.ipv4_address }
}

output "backend_nodes" {
    value = { for k, v in digitalocean_droplet.backend : k => v.ipv4_address }
}