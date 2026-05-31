import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import prisma from '../config/db';

export const getQRCodeByGraveId = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { graveId } = req.params;
    const qrCode = await prisma.qRCode.findUnique({
      where: { graveId },
      include: {
        grave: true,
      },
    });

    if (!qrCode) {
      res.status(404).json({ error: 'QR Code not found for this grave' });
      return;
    }

    res.status(200).json(qrCode);
  } catch (error) {
    console.error('Error fetching QR code:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const generateQRCode = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { graveId, codeUrl } = req.body; // codeUrl could be the frontend URL to the grave details page

    if (!graveId || !codeUrl) {
      res.status(400).json({ error: 'graveId and codeUrl are required' });
      return;
    }

    // Upsert QR code for grave
    const qrCode = await prisma.qRCode.upsert({
      where: { graveId },
      update: { codeUrl },
      create: {
        graveId,
        codeUrl,
      },
    });

    res.status(201).json(qrCode);
  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
