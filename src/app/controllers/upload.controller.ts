import { v4 } from 'uuid';
import * as path from 'path';
import { existsSync } from "fs";
import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { updateImage } from '../helpers';

const uploadFile = async (req: Request, res: Response) => {

    const { collection, id } = req.params;

    if (![ 'doctors', 'hospitals', 'users' ].includes(collection)) {
        return res.status(400).json({
            ok: false,
            msg: 'The collection must be: users, doctors or hospitals'
        });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No files were uploaded.'
        });
    }
    // process image
    const file = req.files.image as UploadedFile;
    const ext = file.mimetype.split('/')[ 1 ];
    if (![ 'png', 'jpg', 'jpeg', 'gif' ].includes(ext)) {
        return res.status(400).json({
            ok: false,
            msg: 'The file must be: png, jpg, jpeg, gif'
        });
    }
    const fileName = v4().concat(`.${ext}`);
    const path = `./uploads/${collection}/${fileName}`;
    await file.mv(path)
        .then(() => {
            updateImage(collection, id, fileName);
            return res.status(200).json({
                ok: true,
                msg: 'File uploaded',
                fileName
            });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error uploading file',
                error: err
            });
        });
};

const getImage = async (req: Request, res: Response) => {
    const { collection, imageId } = req.params;
    const pathImage = path.join(__dirname, `../../../uploads/${collection}/${imageId}`) ?? undefined;
    if (existsSync(pathImage)) {
        res.status(200).sendFile(pathImage);
    } else {
        const pathImageAlter = path.join(__dirname, `../../../uploads/default/no-img.jpg`);
        res.status(200).sendFile(pathImageAlter);
    }
};

export {
    uploadFile,
    getImage
};