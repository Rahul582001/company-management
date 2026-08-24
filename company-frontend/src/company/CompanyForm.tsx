import { useState } from "react";
import { createCompany } from "../services/companyApi";
import type { CreateCompanyData } from "../types/company";

interface CompanyFormProps {
  onCompanyCreated: () => void;
}

interface FormErrors {
  companyName?: string;
  website?: string;
  industry?: string;
  employeeCount?: string;
}

const CompanyForm = ({ onCompanyCreated }: CompanyFormProps) => {
  const [formData, setFormData] = useState<CreateCompanyData>({
    companyName: "",
    website: "",
    industry: "",
    employeeCount: 0,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!formData.website.trim()) {
      newErrors.website = "Website is required";
    } else {
      try {
        new URL(formData.website);
      } catch {
        newErrors.website = "Please enter a valid website URL";
      }
    }

    if (!formData.industry.trim()) {
      newErrors.industry = "Industry is required";
    }

    if (!formData.employeeCount || formData.employeeCount <= 0) {
      newErrors.employeeCount = "Employee count must be greater than 0";
    }

    return newErrors;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: name === "employeeCount" ? Number(value) : value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: undefined,
    }));

    setError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setError("");

      await createCompany(formData);

      setFormData({
        companyName: "",
        website: "",
        industry: "",
        employeeCount: 0,
      });

      setErrors({});

      onCompanyCreated();
    } catch {
      setError("Failed to create company. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="company-form">
      <h2>Add Company</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Company Name</label>

          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter company name"
          />

          {errors.companyName && (
            <span className="field-error">{errors.companyName}</span>
          )}
        </div>

        <div>
          <label>Website</label>

          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://example.com"
          />

          {errors.website && (
            <span className="field-error">{errors.website}</span>
          )}
        </div>

        <div>
          <label>Industry</label>

          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            placeholder="Technology"
          />

          {errors.industry && (
            <span className="field-error">{errors.industry}</span>
          )}
        </div>

        <div>
          <label>Employee Count</label>

          <input
            type="number"
            name="employeeCount"
            value={formData.employeeCount || ""}
            onChange={handleChange}
            min="1"
            placeholder="100"
          />

          {errors.employeeCount && (
            <span className="field-error">{errors.employeeCount}</span>
          )}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Add Company"}
        </button>
      </form>
    </div>
  );
};

export default CompanyForm;
