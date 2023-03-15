import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { RouteMetadata } from 'nestjs-gis'

@RouteMetadata()
@Crud({
    model:{type:UsersEntity},
    params:{
    }
})
@Controller('rest/users')
export class UsersController {

  constructor(private service: UsersService) { }

}
