import {Request, Response} from "express";
import { validate } from "class-validator";
import {multer} from "multer";
import {mimetypes} from "mime-types";

export class UploadController {

   
  
   static new = async (req: Request, res: Response) => {
    const { username, password, role } = req.body;
   
    try {
    
    } catch (e) {
      return res.status(404).json({ message: 'Error' });
    }
    
    res.send('Upload complete');
  };

}

export default UploadController;