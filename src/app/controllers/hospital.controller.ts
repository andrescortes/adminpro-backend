import { Response, Request } from 'express';

import { IHospital } from '../interfaces';
import { Hospital } from '../models';


const getHospitals = async (req: Request, res: Response) => {
  const { uid, name } = (req as any)?.props as { uid: string, name: string };
  const hospitals = await Hospital.find().populate('user', 'name img');
  res.status(200).json({
    ok: true,
    hospitals,
    auditedBy: {
      uid,
      name
    }
  });
};

const createHospital = async (req: Request, res: Response) => {

  try {
    const body = req.body as IHospital;
    const { uid, name } = (req as any)?.props as { uid: string, name: string };

    const hospital = new Hospital({ ...body, user: uid });
    const hospitalDb = await hospital.save();
    res.status(201).json({
      ok: true,
      msg: 'Hospital created',
      hospital: hospitalDb,
      auditedBy: {
        uid,
        name
      }
    });
  } catch (error: any) {
    res.status(500).json({
      ok: false,
      message: error[ "message" ] ?? 'Something went wrong',
    });
  }
};

const updateHospital = async (req: Request, res: Response) => {
  try {
    const { uid, name } = (req as any)?.props as { uid: string, name: string };
    res.status(200).json({
      ok: true,
      msg: 'User updated',
      auditedBy: {
        uid,
        name
      }
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Something went wrong',
    });
  }
};

const deleteHospital = async (req: Request, res: Response) => {
  const uid = req.params.id;
  try {
    const hospital = await Hospital.findById(uid);
    res.status(200).json({
      ok: true,
      msg: 'User deleted',
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Something went wrong',
    })
  }
};

export {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital
};
