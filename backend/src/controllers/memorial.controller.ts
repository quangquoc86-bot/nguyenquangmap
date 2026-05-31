import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import prisma from '../config/db';

export const getMemorialEvents = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const events = await prisma.memorialEvent.findMany({
      include: {
        person: true,
      },
    });
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching memorial events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createMemorialEvent = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { personId, eventDate, type, description } = req.body;

    const newEvent = await prisma.memorialEvent.create({
      data: {
        personId,
        eventDate: new Date(eventDate),
        type,
        description,
      },
    });

    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error creating memorial event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateMemorialEvent = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const { eventDate, type, description } = req.body;

    const updatedEvent = await prisma.memorialEvent.update({
      where: { id },
      data: {
        eventDate: eventDate ? new Date(eventDate) : undefined,
        type,
        description,
      },
    });

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error('Error updating memorial event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteMemorialEvent = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    await prisma.memorialEvent.delete({ where: { id } });
    res.status(200).json({ message: 'Memorial event deleted successfully' });
  } catch (error) {
    console.error('Error deleting memorial event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
