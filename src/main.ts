import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { LoggingInterceptor } from './helper/logging.interceptor';
import { TransformInterceptor } from './helper/transform.interceptor';
import { GlobalExceptionFilter } from './helper/errors.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'www.hieinspect.com',
      methods: 'GET,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type,Authorization',
      credentials: true, // If using cookies or authorization headers
    },
  });
  app.use(
    helmet({
      referrerPolicy: { policy: 'strict-origin' },
    }),
  );
  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new LoggingInterceptor(),
  );
  app.useGlobalFilters(new GlobalExceptionFilter());

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
