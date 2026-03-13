import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./ProfilePageStyle.css";
import { useState } from "react";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const getUser = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      const res = await fetch(
        `http://localhost:8080/api/users/email?email=${encodeURIComponent(user.email)}`,
      );

      if (!res.ok) {
        console.log("Failed to fetch user");
        return;
      }

      const data = await res.json();
      setName(data.username);
    } catch (error) {
      console.log("Error fetching user:", error);
    }

    useEffect(() => {
      getUser();
    }, []);
  };

  return (
    <div>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
