import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Drive } from './models/drive.model';
import { DrivesService } from './drives.service';
import { NewDriveInput } from './dto/new-drive.input';

@Resolver((of) => Drive)
export class DrivesResolver {
  constructor(private readonly drivesService: DrivesService) {}

  @Query((returns) => [Drive])
  async drives(): Promise<Drive[]> {
    return await this.drivesService.findAll();
  }

  @Mutation((returns) => Drive)
  async addDrive(
    @Args('newDriveData') newDriveData: NewDriveInput,
  ): Promise<Drive> {
    const drive = await this.drivesService.create(newDriveData);
    return drive;
  }
}
