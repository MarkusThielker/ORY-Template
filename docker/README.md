# Starting as a container

Starting this project in a container makes testing it really easy. \
The only steps you got to take are described in this README.

1. Generate a self-signed certificate to enable TLS encryption. \
   From the location of this README, execute these commands:

```bash
# navigate to the oathkeeper configuration directory
cd development/ory/oathkeeper

# generate a certificate using openssl
openssl req -newkey rsa:2048 -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```

2. Now start up the docker container:

```bash
# move back to the docker compose file
cd ../..

# execute the docker compose file
docker compose up -d --force-recreate
```

3. This command will start up multiple containers in the background. \
   Due to the configuration, access to the service through the proxy (oathkeeper) is only allowed
   using the url "dev.thielker.net".

To make this work on your local device, make sure to enter this domain in you machines
local dns file and point it to your device. In case you don't want to do this, modify the
urls used in kratos.yml, access-rules.yml and oathkeeper.yml to the value you prefer.

If you want to add the url to your dns, execute the following commands

```bash
# on a Linux or Mac device execute
sudo nano /etc/hosts

# on a Windows device execute
start-process notepad -verb runAs C:\Windows\System32\drivers\etc\hosts

# add this line (same for all systems) to the file you just opened
127.0.0.1 dev.thielker.net
```

If you have done that open https://dev.thielker.net/auth/ to start exploring.

## Services and Ports

As mentioned above, the docker container starts multiple services which interact with
each other. To access the services separately, not going through port 80/443 and the
oathkeeper redirect use the following ports.

| Service        | Port | Description                                                   |
|----------------|------|---------------------------------------------------------------|
| ORY Oathkeeper | 4455 | Working as a proxy with authentication and permission checks. |
| ORY Kratos     | 4433 | User management system handling users and self-service flows. |
| ORY Kratos-DB  | 5432 | A Postgres database for storing user data                     |
| ORY Kratos-UI  | 4466 | The default UI to test the ORY Kratos capabilities.           |
 
