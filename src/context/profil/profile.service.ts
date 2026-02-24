import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Importez l'entité Profile si elle existe, sinon adaptez
// import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    // @InjectRepository(Profile)
    // private readonly profileRepository: Repository<Profile>
  ) {}

  async findAll() {
    // return this.profileRepository.find();
    return [];
  }
}
