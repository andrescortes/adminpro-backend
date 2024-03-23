import { Request, Response } from 'express';
import { Doctor, Hospital, User } from '../models';
import { CollectionType } from '../types';

const getTodo = async (req: Request, res: Response) => {
    const param = req.params?.search;
    const regex = new RegExp(param, 'i');

    try {
        const [ users, doctors, hospitals ] = await Promise.all([
            User.find({ name: regex }),
            Doctor.find({ name: regex }),
            Hospital.find({ name: regex }),
        ]);
        res.status(200).json({
            ok: true,
            users,
            doctors,
            hospitals
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong',
            error
        });
    }

}

const getDocument = async (req: Request, res: Response) => {
    const search = req.params?.search;
    const collection = req.params?.collection as CollectionType;
    const regex = new RegExp(search, 'i');
    try {
        let data: any;
        switch (collection) {
            case 'doctors':
                data = await Doctor.find({ name: regex })
                    .populate('user', 'name img')
                    .populate('hospital', 'name img');
                break;
            case 'hospitals':
                data = await Hospital.find({ name: regex })
                    .populate('user', 'name img');
                break;
            case 'users':
                data = await User.find({ name: regex });
                break;
            default:
                res.status(500).json({
                    ok: false,
                    msg: 'The collection must be: users, doctors or hospitals',
                });
                break;
        }
        return res.status(200).json({
            ok: true,
            result: data
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong',
            error
        });
    }
}

export {
    getTodo,
    getDocument
}