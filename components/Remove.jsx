function Remove({ id }) {
  const removeUser = async () => {
    const res = await fetch(`http://localhost:3000/api/form?id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      window.location.reload();
    }
  };

  return (
    <button
      className="px-2 py-1 text-xl rounded-xl bg-red-800 text-white mx-5"
      onClick={removeUser}
    >
      Delete
    </button>
  );
}

export default Remove;
