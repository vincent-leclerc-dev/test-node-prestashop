import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const apiMetrics = require('prometheus-api-metrics');
const health = require('@cloudnative/health-connect');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(apiMetrics());

  let healthcheck = new health.HealthChecker();
  app.use('/live', health.LivenessEndpoint(healthcheck));
  app.use('/ready', health.ReadinessEndpoint(healthcheck));
  app.use('/health', health.HealthEndpoint(healthcheck));

  await app.listen(3000);
}
bootstrap();
