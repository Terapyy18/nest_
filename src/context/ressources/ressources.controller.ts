import { Controller, Get } from '@nestjs/common';
import { RessourcesService } from './ressources.service';

@Controller('ressources')
export class RessourcesController {
  constructor(private readonly ressourcesService: RessourcesService) {}

  @Get()
  async getAllRessources() {
    return this.ressourcesService.getAllRessources();
  }
}
