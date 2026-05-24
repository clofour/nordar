variable "do_api_token" {
    default = env("DIGITALOCEAN_TOKEN")
    sensitive = true
}
