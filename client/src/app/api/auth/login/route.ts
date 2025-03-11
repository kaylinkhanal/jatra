import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await axios.post(
      "http://localhost:9000/login",
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log(response);

   return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
