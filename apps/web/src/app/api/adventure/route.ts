import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  // No mundo real, mapearíamos o slug para o caminho correto.
  // Por enquanto, carregamos a nossa única aventura de exemplo.
  try {
    const adventurePath = path.resolve(process.cwd(), '../../adventures/a-caverna-do-dragao/aventura.md');
    const markdown = fs.readFileSync(adventurePath, 'utf-8');
    
    return NextResponse.json({ markdown });
  } catch (error) {
    return NextResponse.json({ error: 'Adventure not found' }, { status: 404 });
  }
}
