# Prerequisites
- Visual Studio Code / vim,
- Git cli,
- GitHub,
- DockerHub,
- Nest.js cli,
- Docker Desktop, 
- Kubernetes (minikube),
- Chrome / curl.

# Part 1
Write a node.js application which displays in http on / "hello world".

1. Installation
```zsh
$ mkdir -p ~/workspace/prestashop
$ cd ~/workspace/prestashop
$ nest new test-node
```

2. Test with Jest
```zsh
$ npm run test
$ PASS  src/app.controller.spec.ts
  AppController
    root
      ✓ should return "hello world" (35ms)

  console.log src/app.service.ts:6
    hello world

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        3.604s
Ran all test suites.
```

3. Run application
```zsh
$ cd test-node && npm start
$ curl -w '\n' localhost:3000
$ hello world
```

# Part 2 : 
Run it on a container Docker. 

1. Make the Dockerfile
```zsh
$ touch Dockerfile
```

2. Check last version LTS of nodejs
ex: 12.16.1

3. Ignore useless files to build our Docker image
```zsh
$ touch .dockerignore
```

4. Build an image of our application
```zsh
$ docker build -t vleclerc/test-node-prestashop:0.0.1 .
```

5. Show images
```zsh
$ docker images
```

Result:
```zsh
REPOSITORY                           TAG                 IMAGE ID            CREATED             SIZE
vleclerc/test-node-prestashop        0.0.1               45752af18474        13 seconds ago      344MB
```

5. Run a container of our application with this image
```zsh
$ docker run --name test-node-prestashop --rm -p 8080:3000 -d vleclerc/test-node-prestashop:0.0.1
```

6. Show containers
```zsh
$ docker ps
```

Result:
```zsh
CONTAINER ID        IMAGE                                 COMMAND                  CREATED             STATUS              PORTS                              NAMES
a032f056de60        vleclerc/test-node-prestashop:0.0.1   "docker-entrypoint.s…"   3 seconds ago       Up 2 seconds        8080/tcp, 0.0.0.0:8080->3000/tcp   test-node-prestashop
```

7. Follow application logs in the container
In a new terminal:
```zsh
$ docker logs -f test-node-prestashop
```

Result:
```zsh
> test-node@0.0.1 start /usr/src/app
> nest start

[Nest] 30   - 03/16/2020, 12:39:25 PM   [NestFactory] Starting Nest application...
[Nest] 30   - 03/16/2020, 12:39:25 PM   [InstanceLoader] AppModule dependencies initialized +36ms
[Nest] 30   - 03/16/2020, 12:39:25 PM   [RoutesResolver] AppController {/}: +12ms
[Nest] 30   - 03/16/2020, 12:39:25 PM   [RouterExplorer] Mapped {/, GET} route +8ms
[Nest] 30   - 03/16/2020, 12:39:25 PM   [NestApplication] Nest application successfully started +5ms
```

8. Test our container application
```zsh
$ curl -w '\n' localhost:8080
```

Result:
```zsh
hello world
```

Logs:
```zsh
hello world
```

9. Stop the container
```zsh
$ docker stop test-node-prestashop
```