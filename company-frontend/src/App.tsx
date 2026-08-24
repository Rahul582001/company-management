import { useEffect, useState } from "react";

import CompanyForm from "./company/CompanyForm";
import CompanyTable from "./company/CompanyTable";
import SearchBar from "./company/SearchBar";

import {
  deleteCompany,
  getCompanies,
  searchCompanies,
} from "./services/companyApi";

import type { Company } from "./types/company";

import "./App.css";

function App() {
  const [companies, setCompanies] = useState<Company[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Sorting
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState<"ASC" | "DESC">("DESC");

  const LIMIT = 5;

  // Fetch companies
  const fetchCompanies = async (currentPage: number) => {
    try {
      setLoading(true);
      setError("");

      const result = await getCompanies(currentPage, LIMIT, sortBy, order);

      setCompanies(result.data);
      setTotalPages(result.totalPages);
    } catch {
      setError("Failed to load companies");
    } finally {
      setLoading(false);
    }
  };

  // Load companies whenever page/sorting changes
  useEffect(() => {
    fetchCompanies(page);
  }, [page, sortBy, order]);

  // After creating a company
  const handleCompanyCreated = () => {
    fetchCompanies(page);
  };

  // Search companies
  const handleSearch = async (name: string) => {
    if (!name) {
      setSearchError("");
      setSearchLoading(false);

      // Clear search and restore original company list
      setPage(1);

      await fetchCompanies(1);

      return;
    }

    try {
      setSearchLoading(true);
      setSearchError("");

      const results = await searchCompanies(name);

      setCompanies(results);
      setTotalPages(1);
    } catch {
      setSearchError("Failed to search companies");
    } finally {
      setSearchLoading(false);
    }
  };

  // Delete company
  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this company?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteCompany(id);

      /*
       * If this was the last company on the current page
       * and we are not on the first page, move to previous page.
       */
      if (companies.length === 1 && page > 1) {
        setPage((previous) => previous - 1);
      } else {
        /*
         * Refresh current page because total number
         * of companies may have changed.
         */
        fetchCompanies(page);
      }
    } catch {
      setError("Failed to delete company");
    }
  };

  // Change sorting field
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);

    // Start from first page after changing sorting
    setPage(1);
  };

  // Change sorting order
  const handleOrderChange = () => {
    setOrder((previous) => (previous === "ASC" ? "DESC" : "ASC"));

    // Start from first page after changing order
    setPage(1);
  };

  return (
    <div className="app">
      <header>
        <h1>Company Management</h1>
        <p>Manage your companies</p>
      </header>

      <main>
        {/* Create Company */}
        <CompanyForm onCompanyCreated={handleCompanyCreated} />

        {/* Search */}
        <SearchBar onSearch={handleSearch} />

        {searchLoading && <p>Searching...</p>}

        {searchError && <p className="error">{searchError}</p>}

        {/* Sorting */}
        {!searchLoading && !searchError && (
          <div className="sorting">
            <label htmlFor="sortBy">Sort By</label>

            <select id="sortBy" value={sortBy} onChange={handleSortChange}>
              <option value="createdAt">Created Date</option>

              <option value="companyName">Company Name</option>

              <option value="industry">Industry</option>

              <option value="employeeCount">Employee Count</option>

              <option value="website">Website</option>
            </select>

            <button type="button" onClick={handleOrderChange}>
              {order === "ASC" ? "Ascending ↑" : "Descending ↓"}
            </button>
          </div>
        )}

        {/* Company Table */}
        <CompanyTable
          companies={companies}
          loading={loading}
          error={error}
          onDelete={handleDelete}
        />

        {/* Pagination */}
        {!searchLoading && !searchError && totalPages > 1 && (
          <div className="pagination">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((previous) => previous - 1)}
            >
              Previous
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              type="button"
              disabled={page === totalPages}
              onClick={() => setPage((previous) => previous + 1)}
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
