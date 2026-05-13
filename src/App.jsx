import { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("Submitting...");

    try {
      const response = await fetch(
        "/webhook/universal-lead-intake",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            source_platform: "frontend_form",
            business_category: "shared",
            business_module: "frontend_intake",
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            lead_status: "new",
            lead_score: 80,
            ai_summary: "Lead submitted through frontend form",
          }),
        }
      );

      if (response.ok) {
        setStatus("Lead submitted successfully");

        setFormData({
          name: "",
          email: "",
          phone: "",
        });
      } else {
        setStatus("Submission failed");
      }
    } catch (error) {
      setStatus("Server connection failed");
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "50px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        fontFamily: "Arial",
      }}
    >
      <h1>BusinessOS Lead Intake</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "12px 20px",
            cursor: "pointer",
          }}
        >
          Submit Lead
        </button>
      </form>

      <p style={{ marginTop: "20px" }}>{status}</p>
    </div>
  );
}