import { log } from 'console';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json(); // it is used route handling to parse the incoming request body as JSON. This allows you to access the sent in the request.
    const response = await fetch('http://localhost:9000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

   // console.log("response", response);
    
    //if response is getting false:
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();  //it is used to parse the JSON response from the sercer after making fetch request. The response from the server is typically in JSON format, and we need to conver it into a javascript object so we use json() method
    console.log("data", data);
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

