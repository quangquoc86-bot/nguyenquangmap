import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import prisma from '../config/db';

export const getPersons = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const persons = await prisma.person.findMany({
      include: {
        relationships: {
          include: { relatedPerson: true },
        },
        grave: true,
      },
    });
    res.status(200).json(persons);
  } catch (error) {
    console.error('Error fetching persons:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getPersonById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const person = await prisma.person.findUnique({
      where: { id },
      include: {
        relationships: {
          include: { relatedPerson: true },
        },
        relatedTo: {
          include: { person: true },
        },
        grave: true,
        memorialEvents: true,
      },
    });

    if (!person) {
      res.status(404).json({ error: 'Person not found' });
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    console.error('Error fetching person:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createPerson = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, dateOfBirth, dateOfDeath, gender, bio } = req.body;
    
    const newPerson = await prisma.person.create({
      data: {
        firstName,
        lastName,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        dateOfDeath: dateOfDeath ? new Date(dateOfDeath) : null,
        gender,
        bio,
      },
    });
    
    res.status(201).json(newPerson);
  } catch (error) {
    console.error('Error creating person:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updatePerson = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { firstName, lastName, dateOfBirth, dateOfDeath, gender, bio } = req.body;

    const updatedPerson = await prisma.person.update({
      where: { id },
      data: {
        firstName,
        lastName,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        dateOfDeath: dateOfDeath ? new Date(dateOfDeath) : null,
        gender,
        bio,
      },
    });

    res.status(200).json(updatedPerson);
  } catch (error) {
    console.error('Error updating person:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deletePerson = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Delete related relationships first to avoid foreign key constraints errors
    await prisma.relationship.deleteMany({
      where: {
        OR: [
          { personId: id },
          { relatedPersonId: id },
        ],
      },
    });

    await prisma.person.delete({ where: { id } });

    res.status(200).json({ message: 'Person deleted successfully' });
  } catch (error) {
    console.error('Error deleting person:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createRelationship = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { personId, relatedPersonId, type } = req.body; // type: PARENT, CHILD, SPOUSE

    if (!personId || !relatedPersonId || !type) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const relationship = await prisma.relationship.create({
      data: {
        personId,
        relatedPersonId,
        type,
      },
    });

    res.status(201).json(relationship);
  } catch (error) {
    console.error('Error creating relationship:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
