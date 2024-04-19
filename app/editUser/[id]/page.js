import Update from "@/components/Update";
const getUserId = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/form/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch the data");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return { user: null }; // Return a default value to avoid undefined
  }
};

async function page({ params }) {
  const { id } = params;
  const userData = await getUserId(id);
  const { name, email, message } = userData;
  return <Update id={id} name={name} email={email} message={message} />;
}

export default page;
