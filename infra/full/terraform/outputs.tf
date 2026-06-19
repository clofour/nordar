output "database_proxy_nodes" {
    value = { for k, v in digitalocean_droplet.database_proxy : k => v.ipv4_address }
}

output "database_nodes" {
    value = { for k, v in digitalocean_droplet.database : k => v.ipv4_address }
}

output "app_nodes" {
    value = { for k, v in digitalocean_droplet.app : k => v.ipv4_address }
}