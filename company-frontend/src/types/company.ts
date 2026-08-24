export interface Company {
  id: number;
  companyName: string;
  website: string;
  industry: string;
  employeeCount: number;
  createdAt: string;
}

export interface CreateCompanyData {
  companyName: string;
  website: string;
  industry: string;
  employeeCount: number;
}

export interface PaginatedCompanies {
  data: Company[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
