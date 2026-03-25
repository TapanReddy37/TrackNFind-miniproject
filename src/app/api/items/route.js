import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export async function POST(request) {
  try {
    const tokenCookie = request.cookies.get('token');
    if (!tokenCookie) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const decoded = jwt.verify(tokenCookie.value, JWT_SECRET);
    
    const formData = await request.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const category = formData.get('category');
    const location = formData.get('location');
    const date = formData.get('date');
    const file = formData.get('file');

    let imageUrl = null;
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${file.name.replace(/\\s/g, '_')}`;
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      fs.writeFileSync(path.join(uploadDir, filename), buffer);
      imageUrl = `/uploads/${filename}`;
    }
    
    const item = await prisma.item.create({
      data: {
        title,
        description,
        category,
        location,
        date: new Date(date),
        imageUrl,
        reporterId: decoded.id,
      }
    });
    return NextResponse.json({ success: true, item });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
