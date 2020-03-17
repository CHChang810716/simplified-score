import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Note from './note.js';
import MusicTheory from './musicTheory.js';
import Measures from './measures.js';
import SimpleRow from './simpleRow.js';

class App extends Component {
  render() {
    let measure = [
      {
        under_line: [
          [0, 1],
          [1]
        ],
        notes: [
          {
            key_code: 2,
            octave: -2,
            ascent: MusicTheory.KEY_ASCENT.FLAT,
            extend_dash: 0,
            half_point: 1
          },
          {
            key_code: 7,
            octave: 1
          }
        ]
      },
      {
        under_line: [
          [0, 2],
          [1, 2]
        ],
        notes: [
          {
            key_code: 2,
            octave: -2,
            ascent: MusicTheory.KEY_ASCENT.FLAT
          },
          {
            key_code: 3,
            octave: 2,
            ascent: MusicTheory.KEY_ASCENT.SHARP
          },
          {
            key_code: 7,
            octave: 1
          }
        ]
      }
    ]
    ;
    let measures = [
      measure, measure
    ]
    return (
      <div className="App">
        <svg width="1000" height="1000">
          <SimpleRow 
            pos_x={60}
            pos_y={100}
            size_ratio={5}
            model={measures}
          />
        </svg>
      </div>
    );
    // return (
    //   <div className="App">
    //     <svg width="1000" height="1000">
    //       <Measures 
    //         pos_x={60}
    //         pos_y={100}
    //         size_ratio={3}
    //         model={notes_groups}
    //       />
    //     </svg>
    //   </div>
    // );
  }
}

export default App;
