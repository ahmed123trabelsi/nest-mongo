import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { entreprise } from 'src/schemas/entreprise.schema';
import { CreateEntrepriseDto } from './dto/createEntreprise.dto';

@Injectable()
export class EntrepriseService {
    constructor(@InjectModel(entreprise.name) private entrepriseModel:Model<entreprise>){}
     createEntreprise(entreprisedto:CreateEntrepriseDto){
        const newEntreprise= new this.entrepriseModel(entreprisedto)
        return newEntreprise.save();
}
getEntreprises(){
    return this.entrepriseModel.find();
}
async getUserByNom(NomEntreprise:string){
    return   await this.entrepriseModel.find({ NomEntreprise });
}

async updateEntreprise(NomEntreprise: string,entreprisedto:CreateEntrepriseDto) {
    return  this.entrepriseModel.updateOne({NomEntreprise},entreprisedto,{new:true})
  }
  deleteEntreprise(id:string){
    return this.entrepriseModel.findByIdAndDelete(id);
 
  }
}
