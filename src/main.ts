import { NestFactory } from '@nestjs/core'; 
import { AppModule } from './app.module';  
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; 
import { ValidationPipe } from '@nestjs/common'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule); 
  const config = new DocumentBuilder()            
    .setTitle('Task manager') 
    .setDescription('The task manager API description.') 
    .setVersion('2.0.7') 
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },                 
      'access-token'
    )
    .build();   
  app.useGlobalPipes(new ValidationPipe()); 
  const documentFactory = () => SwaggerModule.createDocument(app, config); 
  SwaggerModule.setup('api-docs', app, documentFactory);
  await app.listen(process.env.PORT || 3000); 
}
bootstrap();
