import React, { useState, useEffect } from "react";

export default function DashboardPage() {
  const [name, setName] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const email = localStorage.getItem("email");

    try {
      const res = await fetch(`http://localhost:8080/api/user?email=${email}`);

      const data = await res.json();

      setName(data.username);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <div>
      <h1>Welcome {name}</h1>
    </div>
  );
}
