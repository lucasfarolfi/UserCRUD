import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

export const ServeStatic = ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'uploads')
})