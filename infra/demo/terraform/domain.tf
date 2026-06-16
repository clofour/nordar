resource "digitalocean_domain" "main" {
    name = var.domain
}

resource "digitalocean_record" "frontend" {
    domain = digitalocean_domain.main.default.id
    type = "CNAME"
    name = var.frontend_subdomain
    value = digitalocean_app.main.live_domain
}

resource "digitalocean_record" "backend" {
    domain = digitalocean_domain.main.default.id
    type = "CNAME"
    name = var.backend_subdomain
    value = digitalocean_app.main.live_domain
}
