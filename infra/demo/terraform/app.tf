resource "digitalocean_app" "main" {
    spec {
        name = "nordar"
        region = var.region

        ingress {
            rule {
                component {
                    name = "frontend"
                }
                match {

                }
            }

            rule {
                component {
                    name = "backend"
                }
                match {

                }
            }
        }

        job {
            name = "migrations"
            kind = "POST_DEPLOY"

            github {
                branch = "main"
                deploy_on_push = true
                repo = "clofour/nordar"
            }
        }

        static_site {
            name = "frontend"
            build_command = "npm run build"

            github {
                branch = "main"
                deploy_on_push = true
                repo = "clofour/nordar"
            }
        }

        service {
            name = "backend"
            instance_count = 2
            instance_size_slug = "apps-s-1vcpu-1gb"

            github {
                branch = "main"
                deploy_on_push = true
                repo = "clofour/nordar"
            }

            source_dir = "app/backend"
            http_port = 8080

            run_command = "dotnet run"
        }

        database {
            name = "database"
            engine = "PG"
            version = 18
            production = false
        }
    }
}