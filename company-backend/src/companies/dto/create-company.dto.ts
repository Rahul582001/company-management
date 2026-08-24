import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  isNumber,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

export class CreateCompanyDto {
  @IsString({ message: 'Company name should be string' })
  @IsNotEmpty({ message: 'Company cannot be empty' })
  companyName!: string;

  @IsUrl()
  @IsNotEmpty({ message: 'Website cannot be empty' })
  website!: string;

  @IsString({ message: 'Industry must be string' })
  @IsNotEmpty({ message: 'Industry cannot be empty' })
  industry!: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(1)
  employeeCount!: number;
}
