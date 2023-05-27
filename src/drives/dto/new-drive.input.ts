import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length } from 'class-validator';

@InputType()
export class NewDriveInput {
  @Field()
  applicationId: number;

  @Field({ nullable: true })
  @IsOptional()
  @Length(10, 255)
  comment?: string;
}
