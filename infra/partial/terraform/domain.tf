data "digitalocean_domain" "main" {
    name = var.domain
}

resource "digitalocean_record" "frontend" {
    domain = data.digitalocean_domain.main.id
    type = "CNAME"
    name = var.frontend_subdomain
    value = "${trimsuffix(digitalocean_app.main.live_domain, "https://")}."
}

resource "digitalocean_record" "backend" {
    domain = data.digitalocean_domain.main.id
    type = "CNAME"
    name = var.backend_subdomain
    value = "${trimsuffix(digitalocean_app.main.live_domain, "https://")}."
}
