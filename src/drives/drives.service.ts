import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Connection, { Channel } from 'rabbitmq-client';
import { Drive } from './models/drive.model';
import { NewDriveInput } from './dto/new-drive.input';

@Injectable()
export class DrivesService {
  private ch: Channel;
  private acceptQueue: string = 'drives-accept';

  constructor(
    @InjectRepository(Drive)
    private readonly drivesRepository: Repository<Drive>,
  ) {}

  async onApplicationBootstrap() {
    const rabbit = new Connection({
      url: `amqp://${process.env.RMQ_USER}:${process.env.RMQ_PASSWORD}@${process.env.RMQ_HOST}:${process.env.RMQ_PORT}`,
    });

    rabbit.on('connection', () => {
      console.log('The connection to RMQ is successfully (re)established');
    });

    this.ch = await rabbit.acquire();

    await this.ch.queueDeclare({ queue: this.acceptQueue });
  }

  async create(data: NewDriveInput): Promise<Drive> {
    let d = { ...data } as Drive;
    await this.drivesRepository.save(d);
    await this.ch.basicPublish(
      { routingKey: this.acceptQueue },
      JSON.stringify({
        applicationId: data.applicationId,
        comment: data.comment ? data.comment : 'No comment',
      }),
    );
    return d;
  }

  async findAll(): Promise<Drive[]> {
    return await this.drivesRepository.find();
  }
}
