import AppBar from 'material-ui/AppBar';
import {grey500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import TrackTable from './song-table';
import './index.css';

injectTapEventPlugin();

const App = () => (
    <div>
        <AppBar style={{backgroundColor: grey500}} title={'Skip The Bad Shit'}/>
        <TrackTable/>
    </div>
);

const ThemedApp = () => (
    <MuiThemeProvider>
        <App/>
    </MuiThemeProvider>
);

export default ThemedApp;
