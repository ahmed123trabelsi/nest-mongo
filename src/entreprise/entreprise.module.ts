import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Domaine, DomaineSchema } from 'src/schemas/Domaine.schema';
import { entreprise, EntrepriseSchema } from 'src/schemas/entreprise.schema';
import { EntrepriseController } from './entreprise.controller';
import { EntrepriseService } from './entreprise.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: entreprise.name, schema: EntrepriseSchema },
      { name: Domaine.name, schema: DomaineSchema },
     
    ])],
  controllers: [EntrepriseController],
  providers: [EntrepriseService]
})
export class EntrepriseModule {}
