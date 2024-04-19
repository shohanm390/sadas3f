
import connectMongodb from "@/libs/mongodb";
import formModel from "@/model/formModel";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    await connectMongodb();
    const users = await formModel.find(); // Assuming formModel is your model
    const usersJSON = JSON.stringify(users); // Convert users to JSON string
    return new NextResponse(usersJSON, {
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new NextResponse.error("Internal Server Error", { status: 500 });
  }
}


export async function POST(request) {
    const { name, email, message } = await request.json();
    await connectMongodb();
    await formModel.create({ name, email, message });
    return  NextResponse.json({ message: "User Created" }, { status: 201 });
  
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongodb();
  await formModel.findOneAndDelete(id);
  return NextResponse.json({success:"user deleted"},{status:200})
}