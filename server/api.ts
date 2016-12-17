import { Request, Response, Router } from 'express';
import * as fs from 'fs';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    const rootDir: string = req.app.get('rootDir');
    const files = fs.readdirSync(rootDir);
    res.json({ files });
});

export default router;
