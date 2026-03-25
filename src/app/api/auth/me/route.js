import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export async function GET(request) {
  try {
    const tokenCookie = request.cookies.get('token');
    if (!tokenCookie) return NextResponse.json({ user: null }, { status: 200 });
    
    const decoded = jwt.verify(tokenCookie.value, JWT_SECRET);
    return NextResponse.json({ user: decoded });
  } catch (err) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}

export async function POST(request) {
  // Logout
  const response = NextResponse.json({ success: true });
  response.cookies.delete('token');
  return response;
}
