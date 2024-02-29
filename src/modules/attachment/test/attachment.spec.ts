import AttachmentService from '../attachment.service';
import CreateAttachmentDTO from '../dto/createAttachment.dto';
import FileSystem from '../../../lib/fileSystem/fileSystem';
import IAttachmentRepository from '../interface/attachment.repository.interface';
import { Readable } from 'stream';
import AttachmentEntity from '../attachment.entity';

// Mock de AttachmentRepository
const mockAttachmentRepository: IAttachmentRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    findAndCount: jest.fn(),
    softDelete: jest.fn(),
};

// Mock de FileSystem
jest.mock('../../../lib/fileSystem/fileSystem', () => ({
    upload: jest.fn(),
    download: jest.fn(),
}));

describe('AttachmentService', () => {
    let attachmentService: AttachmentService;

    beforeEach(() => {
        attachmentService = new AttachmentService(mockAttachmentRepository);
        jest.clearAllMocks(); // Reiniciar los mocks antes de cada prueba
    });

    describe('save', () => {
        it('should upload file and save attachment', async () => {
            const createAttachmentDTO: CreateAttachmentDTO = {
                attachment: 'test.txt',
                file: {
                    fieldname: 'file',
                    originalname: 'test.txt',
                    encoding: '7bit',
                    mimetype: 'text/plain',
                    destination: '',
                    filename: 'test.txt',
                    path: 'path/to/test.txt',
                    size: 12345,
                    buffer: Buffer.from('test content'),
                    stream: new Readable()
                },
                user: { id: '123' },
                createdBy: 'test@test.com'
            };
            const attachmentEntity: AttachmentEntity = { 
                id: '1', 
                attachment: 'test.txt',
                createdBy: 'test@test.com',
                createdDate: new Date(),
                lastModifiedBy: 'test@test.com',
                lastModifiedDate: null,
                deleteDate: null
            };

            (mockAttachmentRepository.save as jest.Mock).mockResolvedValue(attachmentEntity);

            const result = await attachmentService.save(createAttachmentDTO);
            const { file, ...attachment} = createAttachmentDTO;
            expect(FileSystem.upload).toHaveBeenCalledWith({ name: 'test.txt', buffer: Buffer.from('test content') });
            expect(mockAttachmentRepository.save).toHaveBeenCalledWith(attachment, undefined);
            expect(result).toEqual(attachmentEntity);
        });
    });

    describe('delete', () => {
        it('should soft delete attachment', async () => {
            await attachmentService.delete('1');

            expect(mockAttachmentRepository.softDelete).toHaveBeenCalledWith('1');
        });
    });
});