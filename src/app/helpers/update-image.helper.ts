import { User, Doctor, Hospital } from "../models";
import * as fs from "fs";

const updateImage = async (collection: string, id: string, fileName: string) => {

    switch (collection) {
        case 'doctors':
            const doctor = await Doctor.findById(id);
            if (!doctor) {
                return false;
            }
            const lastPathDoctor = `./uploads/${collection}/${doctor.img}`;
            deleteImage(lastPathDoctor);
            doctor.img = fileName;
            await doctor.save();
            return true;
        case 'users':
            const user = await User.findById(id);
            if (!user) {
                return false;
            }
            const lastPathUser = `./uploads/${collection}/${user.img}`;
            deleteImage(lastPathUser);
            user.img = fileName;
            await user.save();
            return true;
        case 'hospitals':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                return false;
            }
            const lastPathHospital = `./uploads/${collection}/${hospital.img}`;
            deleteImage(lastPathHospital);
            hospital.img = fileName;
            await hospital.save();
            return true;
        default:
            return false;
    }
}

const deleteImage = async (path: string) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}
export {
    updateImage
};