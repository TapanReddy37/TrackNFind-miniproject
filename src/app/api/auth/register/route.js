import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, passwordHash }
    });
    return NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
