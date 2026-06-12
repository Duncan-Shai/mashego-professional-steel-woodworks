import React, { useState } from "react";

export default function MashegoQuoteForm() {
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    email: "",
    serviceType: "",
    projectType: "",
    dimensions: "",
    description: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("http://localhost:3000/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          attachments: [],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit quote request.");
      }

      const data = await response.json();
      setMessage(`Quote request submitted successfully. Reference: ${data.quote.id}`);

      setForm({
        customerName: "",
        phone: "",
        email: "",
        serviceType: "",
        projectType: "",
        dimensions: "",
        description: "",
      });
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Mashego Professional Steel and Woodworks</h1>
      <h2>Request a Quote</h2>
      <p>Fill in the form below and the Mashego team will review your request.</p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Full Name</label><br />
          <input
            type="text"
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Phone Number</label><br />
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Email Address</label><br />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Service Type</label><br />
          <select
            name="serviceType"
            value={form.serviceType}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px" }}
          >
            <option value="">Select service type</option>
            <option value="steel">Steel Fabrication</option>
            <option value="wood">Woodworking</option>
            <option value="combined">Combined Steel + Wood Project</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Project Type</label><br />
          <select
            name="projectType"
            value={form.projectType}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px" }}
          >
            <option value="">Select project type</option>
            <option value="gate">Gate</option>
            <option value="burglar-bars">Burglar Bars</option>
            <option value="carport">Carport</option>
            <option value="balustrade">Balustrade</option>
            <option value="cabinet">Cabinet</option>
            <option value="wardrobe">Wardrobe</option>
            <option value="furniture">Furniture</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Dimensions / Measurements</label><br />
          <input
            type="text"
            name="dimensions"
            value={form.dimensions}
            onChange={handleChange}
            placeholder="Example: 3m x 2.4m"
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Project Description</label><br />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows="5"
            style={{ width: "100%", padding: "10px" }}
            placeholder="Describe the project, materials, finish, colour, and any special requirements"
          />
        </div>

        {message && (
          <div style={{ marginBottom: "15px", color: "green" }}>
            {message}
          </div>
        )}

        {error && (
          <div style={{ marginBottom: "15px", color: "red" }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px 20px",
            backgroundColor: "#0d6efd",
            color: "#fff",
            border: "none",
            cursor: "pointer"
          }}
        >
          {loading ? "Submitting..." : "Submit Quote Request"}
        </button>
      </form>
    </div>
  );
}
