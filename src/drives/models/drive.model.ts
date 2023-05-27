import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType({ description: 'drive' })
@Entity()
export class Drive {
  @Field()
  @Column()
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Field()
  @Column({
    nullable: false,
  })
  applicationId: number;

  @Field({ nullable: true })
  @Column({
    nullable: true,
  })
  comment?: string;
}
