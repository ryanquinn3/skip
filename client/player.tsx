import { Card, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import * as React from 'react';

export type PlayableSong = {
    url: string,
    name: string
};

interface IPlayerProps {
    song?: PlayableSong;
}
const defaultTitle = 'Click A Song To Play';

const SongPlayer = (props: IPlayerProps) => {
    const { song } = props;
    return (
        <Card>
            <CardHeader title={song && song.name || defaultTitle}></CardHeader>
            <CardText>
                { song && <audio className="audio-element" src={song.url} controls autoPlay></audio> }
            </CardText>
        </Card>
    );
};

export default SongPlayer;
