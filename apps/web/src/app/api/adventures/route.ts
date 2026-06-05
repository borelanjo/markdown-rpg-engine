import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getAdventureMetadata } from '@rpg/engine';

export async function GET() {
  const adventuresDir = path.resolve(process.cwd(), '../../adventures');
  
  try {
    const adventureFolders = fs.readdirSync(adventuresDir);
    
    const adventures = adventureFolders.map(folder => {
      const adventurePath = path.join(adventuresDir, folder, 'aventura.md');
      
      if (fs.existsSync(adventurePath)) {
        const content = fs.readFileSync(adventurePath, 'utf-8');
        const metadata = getAdventureMetadata(content);
        return {
          slug: folder,
          ...metadata
        };
      }
      return null;
    }).filter(Boolean);

    return NextResponse.json(adventures);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to list adventures' }, { status: 500 });
  }
}
