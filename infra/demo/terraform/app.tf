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
                    authority {
                      exact = "${var.frontend_subdomain}.${var.domain}"
                    }
                    path {
                      prefix = "/"
                    }
                }
            }

            rule {
                component {
                    name = "backend"
                    preserve_path_prefix = true
                }
                match {
                    authority {
                      exact = "${var.backend_subdomain}.${var.domain}"
                    }
                    path {
                      prefix = "/"
                    }
                }
            }
        }

        static_site {
            name = "frontend"
            build_command = "npm run build"

            environment_slug = "node-js"
            env {
                key = "VITE_API_ORIGIN"
                scope = "BUILD_TIME"
                value = "${var.backend_subdomain}.${var.domain}"
            }

            catchall_document = "index.html"

            github {
                branch = "main"
                deploy_on_push = true
                repo = "clofour/nordar"
            }
        }

        service {
            name = "backend"

            environment_slug = "dotnet"
            env {
                key = "ConnectionStrings__Default"
                scope = "RUN_TIME"
                value = "${database.DATABASE_URL}"
            }
            env {
                key = "Origins__Frontend"
                scope = "RUN_AND_BUILD_TIME"
                value = "${var.frontend_subdomain}.${var.domain}"
            }

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

        job {
            name = "migrations"
            kind = "POST_DEPLOY"

            environment_slug = "dotnet"
            build_command = ""
            run_command = ""

            instance_count = 1
            instance_size_slug = "apps-s-1vcpu-1gb"

            github {
                branch = "main"
                deploy_on_push = true
                repo = "clofour/nordar"
            }
            source_dir = "app/backend"
        }
    }
}