import * as axios from 'axios';
import DropDownMenu from 'material-ui/DropDownMenu';
import Divider from 'material-ui/Divider';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import * as React from 'react';
import Player, { PlayableSong } from './player';

export type Mp3File = {
    file: string;
    displayValue?: string;
    meta: {
        title: string;
        artist: string;
        album: string;
    }
};

type SongList = Mp3File[];

interface ITrackTableProps {
};
interface ITrackTableState {
    songs: SongList;
    selectedSong?: PlayableSong;
    songCount?: number;
    history: PlayableSong[];
};

interface IApiRootResponse {
    count: number;
    directory: string;
    files: SongList;
}

class TrackTable extends React.Component<ITrackTableProps, ITrackTableState> {

    constructor(props: ITrackTableProps) {
        super(props);
        this.state = {
            songs: [],
            history: []
        };
    }

    public async componentDidMount() {
        const response = await axios.get('/api') as Axios.AxiosXHR<IApiRootResponse>;
        const { files, directory, count} = response.data;
        const songData = files.map((song) => {
            const str = song.meta.title || song.file.slice(0, -4) || '----';
            return {
                ...song,
                displayValue: str
            };
        });
        this.setState({
            songs: songData,
            songCount: count,
            history: []
        });
    }
    public songSelected(songIndex: number) {
        const song = this.state.songs[songIndex];
        const newPlayable =  {
            name: song.displayValue || '',
            url: `/api/play/${song.file}`
        };
        const { history } = this.state;
        const newHistory = [newPlayable, ...history];

        this.setState({
            selectedSong: newPlayable,
            songs: this.state.songs,
            history: newHistory
        });
    }

    public render(): React.ReactElement<any> {
        const { selectedSong, songCount, songs, history } = this.state;
        return (
            <div className="track-table">
                <div className="player-container">
                    <Player song={selectedSong}/>
                    { !!history.length && <h4>Listening History:</h4>}
                    { history.map((song, i) => (
                        <div className="history-item" key={`${song}${i}`}>
                            {song.name}
                        </div>
                    ))}
                </div>
                <div className="track-list-container">
                    <Toolbar>
                        <ToolbarGroup>
                            <DropDownMenu value={1} onChange={() => { } }>
                                <MenuItem value={1} primaryText="All Broadcasts" />
                                <MenuItem value={2} primaryText="All Voice" />
                                <MenuItem value={3} primaryText="All Text" />
                                <MenuItem value={4} primaryText="Complete Voice" />
                                <MenuItem value={5} primaryText="Complete Text" />
                                <MenuItem value={6} primaryText="Active Voice" />
                                <MenuItem value={7} primaryText="Active Text" />
                            </DropDownMenu>
                        </ToolbarGroup>
                    </Toolbar>
                    <div className="track-list">
                        {songs.map((song, i) =>
                            <div key={ song.file }
                                className="song-row"
                                onClick={() => this.songSelected(i)}>
                                <span className="song-row-number">{i + 1}.</span>  {song.displayValue}
                                <Divider />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
export default TrackTable;
