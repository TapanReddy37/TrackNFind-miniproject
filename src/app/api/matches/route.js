import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export async function GET(request) {
  try {
    const tokenCookie = request.cookies.get('token');
    if (!tokenCookie) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const decoded = jwt.verify(tokenCookie.value, JWT_SECRET);

    const lostItems = await prisma.item.findMany({
      where: { reporterId: decoded.id, category: 'LOST' }
    });

    const foundItems = await prisma.item.findMany({
      where: { category: 'FOUND' },
      include: { reporter: { select: { name: true, email: true } } }
    });

    const matches = [];

    for (const lost of lostItems) {
      const lostText = (lost.title + " " + lost.description).toLowerCase();
      const lostWords = Array.from(new Set(lostText.split(/\W+/).filter(w => w.length > 2))); // 3 letters or more
      
      for (const found of foundItems) {
        const foundText = (found.title + " " + found.description).toLowerCase();
        
        let matchCount = 0;
        for (const w of lostWords) {
          // Substring check allows matching "grey" inside "greycolor"
          if (foundText.includes(w)) matchCount++;
        }
        
        // Single word match is now enough
        if (matchCount >= 1) {
          matches.push({ lostItem: lost, foundItem: found, score: matchCount });
        }
      }
    }
    
    matches.sort((a, b) => b.score - a.score);

    return NextResponse.json({ matches });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
