import axios from "axios";
import type {
  Company,
  CreateCompanyData,
  PaginatedCompanies,
} from "../types/company";

const API_URL = `${import.meta.env.VITE_API_URL}/companies`;

export const getCompanies = async (
  page = 1,
  limit = 5,
  sortBy = "createdAt",
  order: "ASC" | "DESC" = "DESC",
): Promise<PaginatedCompanies> => {
  const response = await axios.get(API_URL, {
    params: {
      page,
      limit,
      sortBy,
      order,
    },
  });

  return response.data;
};

export const createCompany = async (
  company: CreateCompanyData,
): Promise<Company> => {
  const response = await axios.post(API_URL, company);
  return response.data;
};

export const searchCompanies = async (name: string): Promise<Company[]> => {
  const response = await axios.get(`${API_URL}/search`, {
    params: {
      search: name,
    },
  });

  return response.data;
};

export const deleteCompany = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
