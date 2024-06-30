import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { env } from 'process';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function bootstrap(): Promise<any> {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(Number(env.API_PORT) ?? 3000);
}
bootstrap();
