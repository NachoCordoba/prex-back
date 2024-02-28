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


/**
 * @swagger
 * tags:
 *   name: Attachment
 *   description: Attachment API
 * /attachment:
 *   post:
 *     tags: [Attachment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *              type: object
 *              properties:
 *                  file:
 *                      type: string
 *                      format: base64
 *     responses:
 *       201:
 *         description: Successfully created
 */
attachmentRoutes.post('/', upload.single('file'), (req: Request, res: Response) => AttachmentController.getInstance().attach(req, res));

/**
 * @swagger
 * tags:
 *   name: Attachment
 *   description: Attachment API
 * /attachment/:id:
 *   put:
 *     tags: [Attachment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAttachment'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
attachmentRoutes.put('/:id', (req: Request, res: Response) => AttachmentController.getInstance().update(req, res));

/**
 * @swagger
 * tags:
 *   name: Attachment
 *   description: Attachment API
 * /attachment:
 *   get:
 *     tags: [Attachment]
 *     responses:
 *       200:
 *         description: Successfully Listed
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Attachment'
 */
attachmentRoutes.get('/', (req: Request, res: Response) => AttachmentController.getInstance().list(req, res));

/**
 * @swagger
 * tags:
 *   name: Attachment
 *   description: Attachment API
 * /attachment/:id:
 *   delete:
 *     tags: [Attachment]
 *     responses:
 *       200:
 *         description: Successfully Deleted
 */
attachmentRoutes.delete('/:id', (req: Request, res: Response) => AttachmentController.getInstance().delete(req, res));
export default express.Router().use('/attachment', authMiddleware, attachmentRoutes);