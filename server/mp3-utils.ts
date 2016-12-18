import * as bluebird from 'bluebird';
const id3Mod: any = require('id3js');
const promisedReader: (p: any) => any = bluebird.promisify(id3Mod);

export type Mp3File = {
    file: string;
    meta: {
        title: string;
        artist: string;
        album: string;
    }
};

const processMp3 = async(root: string, file: string ): Promise<Mp3File> => {
    const readerParams = {
        file: `${root}/${file}`,
        type: id3Mod.OPEN_LOCAL
    };
    const result: any = await promisedReader(readerParams);
    const { v1, v2 } = result;

    return {
        file,
        meta: {
            title: v2.title || v1.title || result.title,
            artist: v2.artist || v1.artist || result.artist,
            album: v2.album || v1.album || result.album
        }
    };
};

export {
    processMp3
};
