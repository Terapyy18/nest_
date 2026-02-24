import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RscMaterial } from './entities/material.entity';
import { MaterialController } from './material.controller';
import { MaterialService } from './material.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            RscMaterial,
        ]),
    ],
    controllers: [MaterialController],
    providers: [MaterialService],
    exports: [MaterialService],
})
export class MaterialModule { }
