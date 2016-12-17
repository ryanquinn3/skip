import * as React from 'react';


interface IPlayerProps {
    song: string;
}

const SongPlayer = (props: IPlayerProps) => {
    return (
        <audio src={props.song} controls autoPlay></audio>
    );
};

export default SongPlayer;
