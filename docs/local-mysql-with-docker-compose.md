# Setting up MySQL Instance with Docker Compose

## Prerequisites
Before getting started, ensure that you have the following prerequisites installed on your machine:
- Docker: Visit the official Docker website ([https://www.docker.com/](https://www.docker.com/)) and download the appropriate Docker version for your operating system.
- Docker Compose: Docker Compose should be included in the Docker installation for macOS and Windows. For Linux, follow the official Docker Compose installation guide ([https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)) to install it separately if needed.

## Instructions

### macOS

1. Open a terminal.

2. Navigate to the `sdc` project directory where you'll find the `docker-compose.dev.yml` file.

3. Run the following command to start the MySQL container:

```shell
docker compose -f docker-compose.dev.yml -up -d
```

4. Wait for Docker to download the MySQL image and start the container. You can check the container status by running the command:

```shell
docker compose -f docker-compose.dev.yml ps
```

You should see an output similar to the following:
```shell
NAME                COMMAND                  SERVICE             STATUS              PORTS
sdc-v3-mysql-1      "docker-entrypoint.s…"   mysql               running             0.0.0.0:3306->3306/tcp
```
5. Once the container is up and running, you can connect to the MySQL instance using a MySQL client tool of your choice. Here's an example using the `mysql` command-line client:

```shell
mysql -h localhost -P 3306 -u sdc -p
```

You will be prompted to enter the password. Enter `sdc_password`.

6. Congratulations! You are now connected to the MySQL instance and ready to work with the `sdc` database.

### Windows

1. Open a Command Prompt or PowerShell.

2. Navigate to the `sdc` project directory where you'll find the `docker-compose.dev.yml` file.

3. Run the following command to start the MySQL container:

```shell
docker compose -f docker-compose.dev.yml -up -d
```

4. Wait for Docker to download the MySQL image and start the container. You can check the container status by running the command:

```shell
docker compose -f docker-compose.dev.yml ps
```


### Linux

See macOS instructions above.
