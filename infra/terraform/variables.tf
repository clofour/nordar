variable "domain" {
    type = string
}

variable "frontend_subdomain" {
    type = string
    default = "frontend"
}

variable "backend_subdomain" {
    type = string
    default = "backend"
}

variable "region" {
    type = string
    default = "fra1"
}

variable "backend_count" {
    type = number
    default = 2
}

variable "database_proxy_count" {
    type = number
    default = 2
}

variable "database_count" {
    type = number
    default = 3
}

variable "droplet_size" {
    type = string
    default = "s-1vcpu-2gb"
}
