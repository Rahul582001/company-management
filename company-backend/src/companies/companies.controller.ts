import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  //For Creating the Company
  //Using POST http method
  @Post()
  async createCompany(@Body() createCompanyDto: CreateCompanyDto) {
    return await this.companiesService.createCompany(createCompanyDto);
  }

  //List of all companies
  //Using GET http method
  @Get()
  async getCompanies(
    @Query('page') page = '1',
    @Query('limit') limit = '5',
    @Query('sortBy') sortBy = 'createdAt',
    @Query('order') order: 'ASC' | 'DESC' = 'DESC',
  ) {
    return this.companiesService.getCompanies(
      Number(page),
      Number(limit),
      sortBy,
      order,
    );
  }

  //Search a company by its name
  //Using GET http method
  @Get('search')
  async searchCompanies(@Query('search') name: string) {
    return await this.companiesService.searchCompanies(name);
  }

  //For removing a company from companies list
  //Using DELETE http method
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.companiesService.remove(+id);
  }
}
