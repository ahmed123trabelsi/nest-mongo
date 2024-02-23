import { Prop, Schema, SchemaFactory  } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { UserSettings } from "./UserSettings.schema";


@Schema()
export  class Domaine {
@Prop({unique:true,required:true})
NomService:string;
@Prop({unique:false})
Description:string;





}
export const DomaineSchema= SchemaFactory.createForClass(Domaine)