# nordar
Nordar is a research-backed galaxy-themed web application to help you set meaningful goals. It comes with two deployment modes: demo (for demonstrations) and full (for production, with a HA setup).

 I created this project as I struggled with keeping up with my goals; I would usually give up after only a couple of weeks. Ironically enough, the time spent on this project ended up harming my ambitions. Regardless, I did learn a couple of tips from all the research I did.

## Quick Start

To run the web application on your machine, you can use the provided Docker Compose project.
1. Run docker compose *
********

## Knowledge Base

### Concepts

Nordar uses a navigational metaphor:
* **North Stars** are life ambitions such as "be healthy".
* **Bearings**  are strategies to accomplish North Stars, such as "go to sleep early", "exercise regularly" or "eat a healthy diet".
* **Movements** are concrete actions tied to Bearings, such as "walk 8.000 steps daily" or "cook dinner 5 nights a week."

### Features

Nordar has a variety of pages:
* The **Landing** page is a marketing page with various sections to entice users.
* The **Dashboard** page shows basic statistics as well as the events scheduled for that day.
* The **Calendar** page lets users manage their events, which can be linked to Movements. Events can be one-time or recurring, where the latter is defined with RRULEs.
* The **Stars** page, users can create, update and delete North Stars, Bearings and Movements.
* In the **Reflections** page, users can look back at their past reflections to learn from them.

It also comes with a couple of miscellaneous features:
* There is a **Theme Toggle** for switching between dark and light theme.

### Architecture

#### Stack

#### Frontend

* **Development**: Biome
* **Bundler**: Vite
* **Framework**: React and TypeScript
* **Routing**: React Router
* **UI**: Mantine and Tabler Icons
* **Validation**: Zod

#### Backend

* **Framework**: C# and ASP.NET
* **Identity**: ASP.NET Core Identity
* **ORM**: Entity Framework Core and Npgsql
* **Mapping**: AutoMapper
* **Logging**: Serilog and Destructurama
* **API Contract**: OpenAPI

#### Infrastructure

* **Cloud**: DigitalOcean
* **Provisioning**: Terraform
* **Configuration Management**: Ansible
* **Golden Images**: Packer
* **Containers**: Docker

#### Deployment

##### Demo

Demo mode, as its name suggests, is meant for demonstrations. It uses DigitalOcean App Platform. It creates four components:
* An ingress, to route requests to the frontend and backend
* A static site, for the frontend
* A backend service
* A database

To use this mode, run the `terraform-deploy` workflow with the demo parameter. Updates will be deployed automatically.

##### Full

Full mode is meant for production deployments, as it comes with a HA setup (intentionally avoiding managed services for learning purposes). It creates:
* Backend LB
* Backend nodes, with Docker installed
* HAProxy nodes, to route to backend nodes
* Database nodes, with PostgreSQL, Patroni and etcd

It is deployed in four stages:
* Packer builds and uploads three machine images (backend, database-proxy, database) on top of Debian 13 images. It uses Ansible to apply server hardening as well as machine-type specific configuration.
* Terraform provisions nodes, LBs and DNS records.
* Ansible 
