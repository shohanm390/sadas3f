"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Remove from "@/components/Remove";

const getList = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/form", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }
    return res.json();
  } catch (error) {
    console.error("Error Loading Users", error);
    return []; // Return an empty array in case of error
  }
};

export default function Read() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getList();
        setUsers(fetchedData); // Update users state with fetched data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData(); // Call fetchData when component mounts
  }, []);

  return (
    <div>
      <div className="flex justify-between px-44 mt-20">
        <h1 className="text-2xl font-semibold  first-letter:">
          Welcome to Crud app
        </h1>
        <Link
          href="/"
          className="bg-purple-800 text-white px-2 py-1 rounded-xl text-2xl"
        >
          Add new
        </Link>
      </div>
      <div>
        <table className="mt-20 ml-96">
          <tbody>
            <tr>
              <th className="px-5">Sl</th>
              <th className="px-5">Name</th>
              <th className="px-5">Email</th>
              <th className="px-5">Message</th>
              <th className="px-5">Actions</th>
            </tr>
            {users.map((item, index) => (
              <tr key={item._id} className="">
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2 text-center">{item.name}</td>
                <td className="px-4 py-2 text-center">{item.email}</td>
                <td className="px-4 py-2 text-center">{item.message}</td>
                <td>
                  <Link
                    href={`/editUser/${item._id}`}
                    className="px-2 py-1 text-xl rounded-xl bg-yellow-800 text-white mx-5"
                  >
                    Edit
                  </Link>
                    <button>
                    <Remove id={item._id} />
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
