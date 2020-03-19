# Prerequisites
- Visual Studio Code / vim,
- Git cli,
- GitHub,
- DockerHub,
- Nest.js cli,
- Docker Desktop, 
- Kubernetes (minikube),
- Chrome / curl,
- Prometheus.

# Part 1
Write a node.js application which displays in http on / "hello world".

**1. Installation**
```zsh
$ mkdir -p ~/workspace/prestashop
$ cd ~/workspace/prestashop
$ nest new test-node
```
-Replace string by hello world in method getHello of AppService

**2. Test with Jest**
```zsh
$ npm run test
PASS  src/app.controller.spec.ts
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

**3. Run application**
```zsh
$ cd test-node && npm start
$ curl -w '\n' localhost:3000
hello world
```
**4. Save code in Github**
```zsh
$ git init
$ git add .
$ git commit -m "exercice 1"
$ git remote add origin https://github.com/vleclerc/test-node-prestashop.git
$ git push -u origin master
```

# Part 2 : 
Run it on a container Docker. 

**1. Make the Dockerfile**
```zsh
$ touch Dockerfile
```

**2. Check last version LTS of nodejs**
ex: 12.16.1

**3. Ignore useless files to build our Docker image**
```zsh
$ touch .dockerignore
```

**4. Build an image of our application**
```zsh
$ docker build -t vleclerc/test-node-prestashop:0.0.1 .
```

**5. Show images**
```zsh
$ docker images
```

Result:
```zsh
REPOSITORY                           TAG                 IMAGE ID            CREATED             SIZE
vleclerc/test-node-prestashop        0.0.1               45752af18474        13 seconds ago      344MB
node                                 12.16.1-slim        26932a190e66        3 weeks ago         140MB
...
```

**6. Run a container of our application with this image**
```zsh
$ docker run --name test-node-prestashop --rm -p 8080:3000 -d vleclerc/test-node-prestashop:0.0.1
```

**7. Show containers**
```zsh
$ docker ps
```

Result:
```zsh
CONTAINER ID        IMAGE                                 COMMAND                  CREATED             STATUS              PORTS                              NAMES
a032f056de60        vleclerc/test-node-prestashop:0.0.1   "docker-entrypoint.s…"   3 seconds ago       Up 2 seconds        8080/tcp, 0.0.0.0:8080->3000/tcp   test-node-prestashop
```

**8. Follow application logs in the container**
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

**9. Test our container application**
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

**10. Stop the container**
```zsh
$ docker stop test-node-prestashop
```

# Part 3 : 

Updates the application to display : "hello PrestaShop"

**1. Update code**

-Replace string world by PrestaShop in method getHello of AppService

**2. Test with Jest**

```zsh
$ npm run test
FAIL  src/app.controller.spec.ts
  AppController
    root
      ✕ should return "hello world" (36ms)

  ● AppController › root › should return "hello world"

    expect(received).toBe(expected) // Object.is equality

    Expected: "hello world"
    Received: "hello PrestaShop"

      17 |   describe('root', () => {
      18 |     it('should return "hello world"', () => {
    > 19 |       expect(appController.getHello()).toBe('hello world');
         |                                        ^
      20 |     });
      21 |   });
      22 | });

      at Object.<anonymous> (app.controller.spec.ts:19:40)

  console.log src/app.service.ts:6
    hello PrestaShop
```

**3. Update Test**

Replace string world by PrestaShop in file app.controller.spec.ts

**4. Run test again**
```zsh
$ npm run test
PASS  src/app.controller.spec.ts
  AppController
    root
      ✓ should return "hello PrestaShop" (30ms)

  console.log src/app.service.ts:6
    hello PrestaShop

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        3.692s
Ran all test suites.
```

**5.  Build a new image version of our application**
```zsh
$ docker build -t vleclerc/test-node-prestashop:0.0.2 .
```

**6. Show images**
```zsh
$ docker images
```

Result:
```zsh
REPOSITORY                           TAG                 IMAGE ID            CREATED             SIZE
vleclerc/test-node-prestashop        0.0.2               f64abb651979        10 seconds ago      344MB
vleclerc/test-node-prestashop        0.0.1               45752af18474        2 days ago          344MB
node                                 12.16.1-slim        26932a190e66        3 weeks ago         140MB
...
```

**7. Run a container of our application with this image**
```zsh
$ docker stop test-node-prestashop
$ docker run --name test-node-prestashop --rm -p 8080:3000 -d vleclerc/test-node-prestashop:0.0.2
```

**8. Show containers**
```zsh
$ docker ps
```

Result:
```zsh
CONTAINER ID        IMAGE                                 COMMAND                  CREATED             STATUS              PORTS                              NAMES
672de4d069e4        vleclerc/test-node-prestashop:0.0.2   "docker-entrypoint.s…"   15 seconds ago      Up 14 seconds       8080/tcp, 0.0.0.0:8080->3000/tcp   test-node-prestashop
```

**9. Follow application logs in the container**
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

**10. Test our container application**
```zsh
$ curl -w '\n' localhost:8080
```

Result:
```zsh
hello PrestaShop
```

Logs:
```zsh
hello PrestaShop
```

**10. Stop the container**
```zsh
$ docker stop test-node-prestashop
```
**11. Save local images in DockerHub**
```zsh
$ docker tag vleclerc/test-node-prestashop:0.0.1 vleclercdev/test-node-prestashop:0.0.1
$ docker push vleclercdev/test-node-prestashop:0.0.1
$ docker tag vleclerc/test-node-prestashop:0.0.2 vleclercdev/test-node-prestashop:0.0.2
$ docker push vleclercdev/test-node-prestashop:0.0.2
```

# Part 4 :
**1. Start minikube to deploy containers**
```zsh
$ minikube start
$ kubectl cluster-info
Kubernetes master is running at https://192.168.64.3:8443
KubeDNS is running at https://192.168.64.3:8443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
```

**2. Start Kubernetes Dashboard**
cf. https://github.com/vleclerc/k8s-dashboard

**3. Configure and Start Prometheus**
cf. https://github.com/vleclerc/prometheus

**4. Add monitoring, liveness and readness endpoints on your app**
```zsh
$ npm i prometheus-api-metrics && npm prom-client
$ npm i @cloudnative/health-connect
```
Add global middleware in main.ts and test metrics endpoint.
```zsh
$ npm start
```
Test endpoints in your favorite browser:
http://localhost:3000/metrics 
http://localhost:3000/live
http://localhost:3000/ready
http://localhost:3000/health

**5. Recreate tag and push test-node-prestashop:0.0.1 and 0.0.2 with endpoints**
```zsh
$ docker rmi vleclerc/test-node-prestashop:0.0.1
$ docker build -t vleclerc/test-node-prestashop:0.0.1 .
$ docker tag vleclerc/test-node-prestashop:0.0.1 vleclercdev/test-node-prestashop:0.0.1
$ docker push vleclercdev/test-node-prestashop:0.0.1
$
$ docker rmi vleclerc/test-node-prestashop:0.0.2
$ docker build -t vleclerc/test-node-prestashop:0.0.2 .
$ docker tag vleclerc/test-node-prestashop:0.0.2 vleclercdev/test-node-prestashop:0.0.2
$ docker push vleclercdev/test-node-prestashop:0.0.2
```

**6. Make a deployment of the test-node-prestashop:0.0.1 (stable)**
In a kube directory create app-deployment.yml
Reference dockerhub image vleclercdev/test-node-prestashop:0.0.1
Configure number of replica and blue/green deployment strategy partial ex:
```zsh
...
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
...
```

```zsh
$ kubectl apply -f kube
```

**7. Prometheus Graph**
update Prometheus target with cluste_rip:service_port

get cluster ip
```zsh
$ kubectl cluster-info
```

get service port 
```zsh
$ kubectl describe service app-lb
```

go to http://localhost:9090/graph
Filter by up expression
Look at the graph when you deploy there is no downtime.

**8. Make a deployment of 25% the test-node-prestashop:0.0.2 (canary strategy)**
There is 3 replicas on stable version
if you deploy 1 replica on carany the total of replicas is 4
stable app : 3/4 = 75%
canary app : 1/4 = 25%

```zsh
$ kubectl apply -f kubectl apply -f kube/app-deployment-canary.yaml 
```

**9. Test deployment of canary app**

On 30 calls we have 7 HelloPrestaShop 7*100/30=23.333... approximatly 25%

```zsh
➜  test-node git:(master) ✗ curl -w '\n' http://192.168.64.3:31534/
hello world
➜  test-node git:(master) ✗ curl -w '\n' http://192.168.64.3:31534/
hello PrestaShop
➜  test-node git:(master) ✗ curl -w '\n' http://192.168.64.3:31534/
hello world
➜  test-node git:(master) ✗ curl -w '\n' http://192.168.64.3:31534/
hello world
➜  test-node git:(master) ✗ curl -w '\n' http://192.168.64.3:31534/
hello world
➜  test-node git:(master) ✗ curl -w '\n' http://192.168.64.3:31534/
hello world
➜  test-node git:(master) ✗ curl -w '\n' http://192.168.64.3:31534/
hello world
➜  test-node git:(master) ✗ curl -w '\n' http://192.168.64.3:31534/
hello PrestaShop
➜  test-node git:(master) ✗ curl -w '\n' http://192.168.64.3:31534/
hello world
➜  test-node git:(master) ✗ curl -w '\n' http://192.168.64.3:31534/
hello world
➜  test-node git:(master) ✗ curl -w '\n' http://192.168.64.3:31534/
hello world
➜  test-node git:(master) ✗ curl -w '\n' http://192.168.64.3:31534/
hello PrestaShop
➜  test-node git:(master) ✗ curl -w '\n' http://192.168.64.3:31534/
hello world
➜  test-node git:(master) ✗ curl -w '\n' http://192.168.64.3:31534/
hello world
➜  test-node git:(master) ✗ curl -w '\n' http://192.168.64.3:31534/
hello world
➜  test-node git:(master) ✗ curl -w '\n' http://192.168.64.3:31534/
hello PrestaShop
➜  test-node git:(master) ✗ curl -w '\n' http://192.168.64.3:31534/
hello world
➜  test-node git:(master) ✗ curl -w '\n' http://192.168.64.3:31534/
hello world
➜  test-node git:(master) ✗ curl -w '\n' http://192.168.64.3:31534/
hello world
➜  test-node git:(master) ✗ curl -w '\n' http://192.168.64.3:31534/
hello world
➜  test-node git:(master) ✗ curl -w '\n' http://192.168.64.3:31534/
hello PrestaShop
➜  test-node git:(master) ✗ curl -w '\n' http://192.168.64.3:31534/
hello world
➜  test-node git:(master) ✗ curl -w '\n' http://192.168.64.3:31534/
hello PrestaShop
➜  test-node git:(master) ✗ curl -w '\n' http://192.168.64.3:31534/
hello world
➜  test-node git:(master) ✗ curl -w '\n' http://192.168.64.3:31534/
hello world
➜  test-node git:(master) ✗ curl -w '\n' http://192.168.64.3:31534/
hello world
➜  test-node git:(master) ✗ curl -w '\n' http://192.168.64.3:31534/
hello world
➜  test-node git:(master) ✗ curl -w '\n' http://192.168.64.3:31534/
hello world
➜  test-node git:(master) ✗ curl -w '\n' http://192.168.64.3:31534/
hello world
➜  test-node git:(master) ✗ curl -w '\n' http://192.168.64.3:31534/
hello PrestaShop