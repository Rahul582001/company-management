import type { Company } from "../types/company";

interface CompanyTableProps {
  companies: Company[];
  loading: boolean;
  error: string;
  onDelete: (id: number) => void;
}

const CompanyTable = ({
  companies,
  loading,
  error,
  onDelete,
}: CompanyTableProps) => {
  if (loading) {
    return <p>Loading companies...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (companies.length === 0) {
    return <p>No companies found.</p>;
  }

  return (
    <div className="company-table-container">
      <h2>Companies</h2>

      <table>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Website</th>
            <th>Industry</th>
            <th>Employees</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {companies.map((company) => (
            <tr key={company.id}>
              <td>{company.companyName}</td>

              <td>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Website
                </a>
              </td>

              <td>{company.industry}</td>

              <td>{company.employeeCount}</td>

              <td>{new Date(company.createdAt).toLocaleDateString()}</td>

              <td>
                <button type="button" onClick={() => onDelete(company.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyTable;
