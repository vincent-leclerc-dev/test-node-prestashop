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
$ curl localhost:3000
$ hello world
```