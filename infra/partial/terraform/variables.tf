variable "repo" {
    type = string
}

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
