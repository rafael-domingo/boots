import React from 'react';
import LargeMap from '../components/LargeMap';
import SearchBox from '../components/SearchBox';
import SearchResults from '../components/SearchResults';

export default function SearchView() {
    const divStyle = {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        height: '100vh'
    }

    const searchDivStyle = {
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        margin: '2em',
        height: '90vh',
        overflow: 'scroll'
    }
    return (
        <div style={divStyle}>
            <LargeMap />
            <div style={searchDivStyle}>
                <SearchResults />
                <SearchBox />
            </div>
        
        </div>
    )
}