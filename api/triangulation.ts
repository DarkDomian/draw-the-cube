import { VercelRequest, VercelResponse } from '@vercel/node';

interface TriangulationRequest {
  width: number;
  height: number;
  length: number;
}

export default function handler(req: VercelRequest, res: VercelResponse) {

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {

    const { width, height, length } = req.body as TriangulationRequest;

    const vertices = [
      // Near face
      0, 0, 0,   // Vertex 0: Bottom-left near
      width, 0, 0,   // Vertex 1: Bottom-right near
      width, height, 0,   // Vertex 2: Top-right near
      0, height, 0,   // Vertex 3: Top-left near
    
      // Far face
      0, 0, length,   // Vertex 4: Bottom-left far
      width, 0, length,   // Vertex 5: Bottom-right far
      width, height, length,   // Vertex 6: Top-right far
      0, height, length    // Vertex 7: Top-left far
    ];


    return res.status(200).json({ vertices });
  } catch (error) {
    console.error('Error parsing request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
