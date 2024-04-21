import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions( { schemaOptions: { timestamps: true } } )
export class User {
  public _id?: string

  @prop( { required: true } )
  public name!: string

  @prop( { required: true } )
  public email!: string

  @prop( { required: true } )
  public password!: string

  @prop( { required: true } )
  public isAdmin!: boolean
}

export const UserModel = getModelForClass( User )