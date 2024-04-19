// components/ContactForm.jsx
"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export const metadata = {
  title: "Next.js",
};
export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:3000/api/form", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/read");
      } else {
        throw new Error("Failed to create user");
      }
    } catch (error) {
      console.error(error);
    } 
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="py-4 mt-4 border-t flex flex-col gap-5"
    >
      <div>
        <label htmlFor="fullname">Full Name</label>
        <input
          type="text"
          id="fullname"
          placeholder="John Doe"
          {...register("name", { required: true })}
        />
        {errors.name && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          placeholder="john@gmail.com"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      <div>
        <label htmlFor="message">Your Message</label>
        <textarea
          className="h-32"
          id="message"
          placeholder="Type your message here..."
          {...register("message", { required: true })}
        ></textarea>
        {errors.message && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      <button
        className="bg-green-700 p-3 text-white font-bold"
        type="submit"
      >
        Send
      </button>
    </form>
  );
}
