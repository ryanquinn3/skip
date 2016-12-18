import { Request, Response, Router } from 'express';
import * as fs from 'fs';
import { processMp3 } from './mp3-utils';

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

router.get('/', async(req: Request, res: Response) => {
    const rootDir: string = req.app.get('rootDir');
    const files = fs.readdirSync(rootDir).slice(10);
    const songFiles = files.filter((fileName: string) => fileName.endsWith('.mp3'));

    const proms = songFiles.map((file) => processMp3(rootDir, file));

    const processedResults = await Promise.all(proms);

    return res.json({
        count: songFiles.length,
        directory: rootDir,
        files: processedResults
    });
});

export default router;
