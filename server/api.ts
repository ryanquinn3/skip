import { Request, Response, Router } from 'express';
import * as fs from 'fs';

const router = Router();


router.get('/play/:file', (req: Request, res: Response) => {
    const rootDir: string = req.app.get('rootDir');
    const filePath = req.params.file;
    const path: string = `${rootDir}/${filePath}`;
    const stat = fs.statSync(path);
    res.writeHead(200, {
        'Content-Length': stat.size,
        'Content-Type': 'audio/mpeg'
    });
    fs.createReadStream(filePath).pipe(res);
});


router.get('/', (req: Request, res: Response) => {
    const rootDir: string = req.app.get('rootDir');
    const files = fs.readdirSync(rootDir);
    res.json({ files });
});

export default router;
