import { Response, Request } from 'express';

import { IDoctor } from '../interfaces';
import { Doctor } from '../models';


const getDoctors = async (req: Request, res: Response) => {
  const { uid, name } = (req as any)?.props as { uid: string, name: string };
  const doctors = await Doctor.find()
    .populate('user', 'uid name img')
    .populate('hospital', 'uid name');
  res.status(200).json({
    ok: true,
    doctors,
    auditedBy: {
      uid,
      name
    }
  });
};

const createDoctor = async (req: Request, res: Response) => {
  const body = req.body as IDoctor;

  try {
    const { uid, name: username } = (req as any)?.props as { uid: string, name: string };
    const doctor = new Doctor({ ...body, user: uid });
    const doctorDb = await doctor.save();

    res.status(201).json({
      ok: true,
      msg: 'Doctor created',
      doctor: doctorDb,
      auditedBy: {
        uid,
        name: username
      }
    });
  } catch (error: any) {
    res.status(500).json({
      ok: false,
      message: error[ "message" ] ?? 'Something went wrong',
    });
  }
};

const updateDoctor = async (req: Request, res: Response) => {
  try {
    const { uid, name } = (req as any)?.props as { uid: string, name: string };
    const body = req.body as IDoctor;
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({
        ok: false,
        msg: 'Doctor not found',
      });
    }
    const doctorUpdated = await Doctor.findByIdAndUpdate(
      req.params.id,
      { ...body, user: uid },
      { new: true }
    )
    .populate('user', 'name img')
    .populate('hospital', 'name img');

    res.status(200).json({
      ok: true,
      msg: 'Doctor updated',
      doctor: doctorUpdated,
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

const deleteDoctor = async (req: Request, res: Response) => {
  const uid = req.params.id;
  try {
    await Doctor.findByIdAndDelete(uid);
    res.status(200).json({
      ok: true,
      msg: 'Doctor deleted'
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Something went wrong',
    })
  }
};

export {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor
};
