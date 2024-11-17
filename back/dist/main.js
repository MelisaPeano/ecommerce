"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const logger_middleware_1 = require("./middlewares/logger.middleware");
const common_1 = require("@nestjs/common");
const http_exception_filter_1 = require("./Filters/http-exception.filter");
const categoriesSeed_1 = require("./seeder/categoriesSeed");
const express_openid_connect_1 = require("express-openid-connect");
const auth0_config_1 = require("./config/auth0.config");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(logger_middleware_1.LoggerMiddleware);
    app.use((0, express_openid_connect_1.auth)(auth0_config_1.config));
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    const categoriesSeed = app.get(categoriesSeed_1.CategoriesSeed);
    await categoriesSeed.seed();
    console.log('pre-seeding completed');
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Ecommerce API')
        .addBearerAuth()
        .setDescription('Ecommerce API description')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map