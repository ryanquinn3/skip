import * as axios from 'axios';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import Player from './player';
import * as React from 'react';

type SongList = string[];

interface ITrackTableProps {
};
interface ITrackTableState {
    songs: SongList;
    selectedSong?: string;
};

interface IApiRootResponse {
    files: SongList;
}

class TrackTable extends React.Component<ITrackTableProps, ITrackTableState> {

    constructor(props: ITrackTableProps) {
        super(props);
        this.state = {
            songs: []
        };
    }

    public async componentDidMount() {
        const response = await axios.get('/api') as Axios.AxiosXHR<IApiRootResponse>;
        const data: SongList = response.data.files;
        this.setState({
            songs: response.data.files
        });
    }
    public songSelected(songIndex: number) {
        const song = this.state.songs[songIndex];
        this.setState({
            selectedSong: `/api/play/${song}`,
            songs: this.state.songs
        });
    }

    public render(): React.ReactElement<any> {
        const { selectedSong } = this.state;
        return (
            <div>
                <div>{ selectedSong && <Player song={selectedSong}/> }</div>
                <Table selectable={false} onCellClick={this.songSelected.bind(this)}>
                    <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>Song Name</TableHeaderColumn>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    { this.state.songs.map((song: string) => (
                        <TableRow key={song}>
                            <TableRowColumn>{song}</TableRowColumn>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}
export default TrackTable;
