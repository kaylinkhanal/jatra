import { NextResponse } from 'next/server';
import axios from 'axios';



export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await axios.post('/register', body);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error('Registration error:', error);
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(error.response.data, { status: error.response.status });
    }
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}