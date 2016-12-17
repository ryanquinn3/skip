import * as React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';

interface ITrackTableProps {
};
interface ITrackTableState {
    songs: string[];
};

class TrackTable extends React.Component<ITrackTableProps, ITrackTableState> {

    constructor(props: ITrackTableProps) {
        super(props);
        this.state = {
            songs: []
        };
    }

    public async componentDidMount() {
        const response = await window.fetch('/api');
        const json = await response.json();
        this.setState({
            songs: json.files
        });
    }

    public render(): React.ReactElement<any> {
        return (
            <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeaderColumn>ID</TableHeaderColumn>
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
        );
    }
}
export default TrackTable;
