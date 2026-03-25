import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    
    const response = NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    response.cookies.set('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 86400 });
    return response;
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
