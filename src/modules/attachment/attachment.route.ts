import express, { Request, Response, Router } from 'express';
import AttachmentController from './attachment.controller';
import multer from 'multer';
import authMiddleware from '../../middlewares/auth.middleware';


const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 2 
    }
});

const attachmentRoutes: Router = express.Router();
attachmentRoutes.post('/', upload.single('file'), (req: Request, res: Response) => AttachmentController.getInstance().attach(req, res));
attachmentRoutes.put('/:id', (req: Request, res: Response) => AttachmentController.getInstance().update(req, res));
attachmentRoutes.get('/', (req: Request, res: Response) => AttachmentController.getInstance().list(req, res));
attachmentRoutes.delete('/:id', (req: Request, res: Response) => AttachmentController.getInstance().delete(req, res));
export default express.Router().use('/attachment', authMiddleware, attachmentRoutes);