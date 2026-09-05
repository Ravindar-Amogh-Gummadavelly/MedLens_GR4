import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export async function GET() {
  const token = cookies().get('medlens_session')?.value;
  if (!token) {
    return NextResponse.json({ authenticated: false, user: null });
  }

  const user = verifyToken(token);
  if (!user) {
    return NextResponse.json({ authenticated: false, user: null });
  }

  return NextResponse.json({ authenticated: true, user });
}
