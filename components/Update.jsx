"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Update({ id, name, email, message }) {
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [newMessage, setNewMessage] = useState(message);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/form/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newName, newEmail, newMessage }),
      });

      if (!res.ok) {
        throw new Error("Failed to update Product");
      }

      router.refresh();
      router.push("/read");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl text-center font-bold my-10 underline underline-offset-8">
        Update User {id}
      </h1>
      <center>
        <form
          onSubmit={handleSubmit}
          className="py-4 mt-4 border-t flex flex-col gap-5 w-2/4"
        >
          <div>
            <label htmlFor="fullname">Full Name</label>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              type="text"
              id="fullname"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              type="text"
              id="email"
              placeholder="john@gmail.com"
            />
          </div>

          <div>
            <label htmlFor="message">Your Message</label>
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="h-32"
              id="message"
              placeholder="Type your message here..."
            ></textarea>
          </div>

          <button
            className="bg-green-700 p-3 text-white font-bold"
            type="submit"
          >
            Update
          </button>
        </form>
      </center>
    </div>
  );
}

export default Update;
