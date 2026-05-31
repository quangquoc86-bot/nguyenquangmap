import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import prisma from '../config/db';

export const getGraves = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const graves = await prisma.grave.findMany({
      include: {
        person: true,
        photos: true,
      },
    });
    res.status(200).json(graves);
  } catch (error) {
    console.error('Error fetching graves:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getGraveById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const grave = await prisma.grave.findUnique({
      where: { id },
      include: {
        person: true,
        photos: true,
        qrCode: true,
      },
    });

    if (!grave) {
      res.status(404).json({ error: 'Grave not found' });
      return;
    }

    res.status(200).json(grave);
  } catch (error) {
    console.error('Error fetching grave:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createGrave = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { personId, latitude, longitude, cemeteryName, locationDetail } = req.body;

    const newGrave = await prisma.grave.create({
      data: {
        personId,
        latitude,
        longitude,
        cemeteryName,
        locationDetail,
      },
    });

    res.status(201).json(newGrave);
  } catch (error) {
    console.error('Error creating grave:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateGrave = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { latitude, longitude, cemeteryName, locationDetail } = req.body;

    const updatedGrave = await prisma.grave.update({
      where: { id },
      data: {
        latitude,
        longitude,
        cemeteryName,
        locationDetail,
      },
    });

    res.status(200).json(updatedGrave);
  } catch (error) {
    console.error('Error updating grave:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteGrave = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    // Delete photos first
    await prisma.gravePhoto.deleteMany({
      where: { graveId: id }
    });

    // Delete QR Code
    await prisma.qRCode.deleteMany({
      where: { graveId: id }
    });

    await prisma.grave.delete({ where: { id } });

    res.status(200).json({ message: 'Grave deleted successfully' });
  } catch (error) {
    console.error('Error deleting grave:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const addGravePhoto = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { url } = req.body; // In a real app, you would upload to Firebase Storage, then save the URL here.

    if (!url) {
      res.status(400).json({ error: 'Photo URL is required' });
      return;
    }

    const photo = await prisma.gravePhoto.create({
      data: {
        graveId: id,
        url,
      },
    });

    res.status(201).json(photo);
  } catch (error) {
    console.error('Error adding grave photo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
