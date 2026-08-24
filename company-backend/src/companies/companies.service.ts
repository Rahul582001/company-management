import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  //For Creating the Company
  async createCompany(createCompanyDto: CreateCompanyDto) {
    const company = await this.companyRepository.create(createCompanyDto);
    return this.companyRepository.save(company);
  }

  //List of all companies
  async getCompanies(
    page: number,
    limit: number,
    sortBy: string = 'createdAt',
    order: 'ASC' | 'DESC' = 'DESC',
  ) {
    const skip = (page - 1) * limit;

    const allowedSortFields = [
      'companyName',
      'website',
      'industry',
      'employeeCount',
      'createdAt',
    ];

    const safeSortBy = allowedSortFields.includes(sortBy)
      ? sortBy
      : 'createdAt';

    const [companies, total] = await this.companyRepository.findAndCount({
      skip,
      take: limit,
      order: {
        [safeSortBy]: order,
      },
    });

    return {
      data: companies,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      sortBy: safeSortBy,
      order,
    };
  }

  //Search a company by its name
  async searchCompanies(search: string) {
    return await this.companyRepository
      .createQueryBuilder('company')
      .where('LOWER(company.companyName) LIKE LOWER(:name)', {
        name: `%${search}%`,
      })
      .getMany();
  }

  //For removing a company from companies list
  async remove(id: number) {
    const result = await this.companyRepository.delete(id);

    return {
      message: 'Company deleted successfully',
    };
  }
}
