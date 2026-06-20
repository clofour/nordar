data "digitalocean_domain" "main" {
    name = var.domain
}

resource "digitalocean_record" "frontend" {
    domain = data.digitalocean_domain.main.id
    type = "CNAME"
    name = var.frontend_subdomain
    value = "${trimprefix(digitalocean_app.main.default_ingress, "https://")}."
}

resource "digitalocean_record" "backend" {
    domain = data.digitalocean_domain.main.id
    type = "CNAME"
    name = var.backend_subdomain
    value = "${trimprefix(digitalocean_app.main.default_ingress, "https://")}."
}
