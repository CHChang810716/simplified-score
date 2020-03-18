import React, { Component } from 'react';
import Note from './note.js';
import {value_or, rects_union} from './utils.js';
class NoteGroup extends Component {
  constructor(props){
    super(props);
    this.notes = [];
    this.line = [
      { start: -1, end: -1},
      { start: -1, end: -1},
      { start: -1, end: -1},
      { start: -1, end: -1}
    ];
    // this.bound_rect = {x:-1, y:-1, width:0, height:0}
    this.props.model.notes.map((n) => {
      n.under_line = 0;
    });
    for(let i in this.props.model.under_line) {
      let under_line = this.props.model.under_line[i];
      let curr_line = this.line[i];
      curr_line.start = under_line[0];
      curr_line.end   = under_line[under_line.length - 1] + 1;
      for(let j = curr_line.start; j < curr_line.end; j ++ ) {
        this.props.model.notes[j].under_line ++;
      }
    }
    let last_x_r = this.props.pos_x;
    for(let i in this.props.model.notes) {
      let noteinfo=this.props.model.notes[i];
      let margin_seed = this.getMarginSeed(
        noteinfo.under_line
      );
      let margin = margin_seed * this.props.size_ratio;
      let note = new Note(
        {
          key_code: noteinfo.key_code,
          octave: noteinfo.octave,
          ascent: noteinfo.ascent,
          key_x: last_x_r + margin,
          key_y: this.props.pos_y,
          half_point: noteinfo.half_point,
          size_ratio: this.props.size_ratio
        }
      );
      let last_rect = note.boundRect()
      last_x_r = last_rect.x + last_rect.width + margin;
      this.notes.push(note);
    }
    const line_margin_seed = 1;
    this.line_margin = line_margin_seed * this.props.size_ratio;
    let n_rect = this.notesBoundRect();
    this.line_margin_y0 = n_rect.y + n_rect.height + this.line_margin;
  }
  getMarginSeed(ul) {
    if(ul <= 1) {
      return 2;
    } else if( ul <= 2) {
      return 0.3;
    } else {
      return 0;
    }
  }
  notesBoundRect() {
    let res = this.notes.map((n) => {
      return n.boundRect();
    }).reduce((r, pr) => {
      let x = Math.min(r.x, pr.x)
      let y = Math.min(r.y, pr.y)
      return {
        x: x,
        y: y,
        width: Math.max(r.x + r.width, pr.x + pr.width)  - x,
        height: Math.max(r.y + r.height, pr.y + pr.height) - y
      }
    })
    return res;
  }
  lineBoundRect() {
    const n_rect = this.notesBoundRect();
    const line_num = this.line.map((l)=>{
      if(l.start < 0) {
        return 0;
      }else return 1;
    }).reduce((p, pl)=>{
      return p + pl;
    }, 0)
    return {
      x: n_rect.x,
      y: this.line_margin_y0,
      width: n_rect.width,
      height: this.line_margin * line_num 
    };
  }
  boundRect() {
    return rects_union([
      this.notesBoundRect(),
      this.lineBoundRect()
    ]);
  }
  renderArray(arr) {
    let tags = [];
    for(let i in arr) {
      let obj = arr[i];
      tags.push(obj.render(i));
    }
    return tags;
  }
  renderLine() {
    let lines = [];
    console.log(this.line);
    for(let i = 0; i < this.line.length; i ++ ) {
      if(this.line[i].start < 0) break;
      let start_note = this.notes[this.line[i].start].keyBoundRect();
      let end_note = this.notes[this.line[i].end - 1].keyBoundRect();
      let x_start = start_note.x;
      let x_end = end_note.x + end_note.width;
      let y = this.line_margin_y0 + (i * this.line_margin);
      lines.push(
        <line x1={x_start} x2={x_end} y1={y} y2={y} key={i} style={{
            "stroke": 'black', 
            "strokeWidth": 1
        }}/>
      );
    }
    return lines;
  }
  render(key) {
    if(key === undefined) {
      key = 0;
    }
    let bound_rect = this.boundRect(); 
    console.log(bound_rect)
    let debug_tags = [
        // (<rect x={bound_rect.x} y={bound_rect.y} 
        //   width={bound_rect.width} height={bound_rect.height} style={{
        //   "stroke": 'black', 
        //   "strokeWidth": 2,
        //   "fill": 'none'
        // }}></rect>),
        (<circle r={2} transform={
          "translate(" + 
            this.props.pos_x + "," +
            this.props.pos_y + 
          ")"
        }></circle>)
    ]

    return (
      <g className="NoteGroup" key={key}>
        { this.renderArray(this.notes) }
        { this.renderLine()}
        {
          // debug_tags
        }
      </g>
    )
  }
}

export default NoteGroup;