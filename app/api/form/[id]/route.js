
import connectMongodb from "@/libs/mongodb";
import userNodel from "@/model/formModel";
import { NextResponse } from "next/server";

export async function PUT(request,{params}){
    const {id} = params;
    const {newName: name, newEmail:email, newMessage:message} = await request.json();
    await connectMongodb()
    await userNodel.findByIdAndUpdate(id,{name,email,message})
    return NextResponse.json({success:"User Update"}, {status:200})
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongodb();
    const users = await userNodel.findOne({ _id: id });
    return NextResponse.json({ users }, { status: 200 });
}
