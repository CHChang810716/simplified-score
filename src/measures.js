import React, { Component } from 'react';
import MusicTheory from './musicTheory.js';
import Note from './note.js';
import NoteGroup from './noteGroup.js'
import {value_or, rects_union} from './utils.js'
/**
 * @brief Define the measure's outfit and process the music theory of tempo length. 
 */
class Measures extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pos_x:          props.pos_x,
      pos_y:          props.pos_y,
      back_bar_gen:   value_or(
        props.back_bar_gen, function (x, y, len) {
          return (<line x1={x} x2={x} y1={y} y2={y + len} 
            style={{
              "stroke": 'black', 
              "strokeWidth": 1
            }}
          />)
        }
      ),
      size_ratio: props.size_ratio,
      model:      props.model
    }
    const back_bar_len_seed = 14.6;
    const padding_x_seed = 0.5;
    const padding_y_seed = 4;
    this.back_bar_len = back_bar_len_seed * this.state.size_ratio;
    this.padding_x    = padding_x_seed    * this.state.size_ratio;
    this.padding_y    = padding_y_seed    * this.state.size_ratio;
    this.notegroups   = [];
    let last_x_offset = 0;
    for(let ng_model of this.state.model) {
      let note_group = new NoteGroup(
        {
          model: ng_model,
          pos_x: last_x_offset + this.state.pos_x + this.padding_x,
          pos_y: this.state.pos_y + this.padding_y,
          size_ratio: this.state.size_ratio
        }
      );
      this.notegroups.push(note_group);
      let ng_rect = note_group.boundRect();
      last_x_offset += ng_rect.width;
    }
  }
  boundRect() {
    let rects = this.notegroups.map((n) => {
      return n.boundRect();
    })
    rects.push(this.backBarBoundRect());
    rects.push({
      x: this.state.pos_x,
      y: this.state.pos_y,
      width: 0,
      height: 0
    })
    let res = rects_union(rects);
    return res;
  }
  backBarBoundRect() {
    let last_ng_rect = this.notegroups[this.notegroups.length - 1]
      .boundRect();
    return {
      x: last_ng_rect.x + last_ng_rect.width + this.padding_x,
      y: this.state.pos_y - this.padding_y,
      width: 0,
      height: this.back_bar_len
    }
  }
  render(key){
    if(key === undefined) {
      key = 0;
    }
    let notegroups = [];
    for(let i in this.notegroups) {
      let ng = this.notegroups[i];
      notegroups.push(ng.render(i));
    }
    let last_ng_rect = this.notegroups[this.notegroups.length - 1]
      .boundRect();
    let bound_rect = this.boundRect();
    let debug_tags = [
        // (<rect x={bound_rect.x} y={bound_rect.y} 
        //   width={bound_rect.width} height={bound_rect.height} style={{
        //   "stroke": 'black', 
        //   "strokeWidth": 2,
        //   "fill": 'none'
        // }}></rect>),
        // (<circle r={2} transform={
        //   "translate(" + 
        //     this.state.pos_x + "," +
        //     this.state.pos_y + 
        //   ")"
        // }></circle>)
    ];
    return ( 
      <g className="Measures" key={key}>
        { notegroups }
        { 
          this.state.back_bar_gen(
            last_ng_rect.x + last_ng_rect.width + this.padding_x,
            this.state.pos_y - this.padding_y,
            this.back_bar_len
          )
        }
        {
          debug_tags
        }
      </g>
    );
  }
}
export default Measures;