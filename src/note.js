import React, { Component } from 'react';
import MusicTheory from './musicTheory.js';
import { value_or } from './utils.js';
/**
 * @brief Define the note's outfit and process the music theory of key height. 
 */
class Note extends Component {
  constructor(props){
    super(props);
    this.state = {
      key_code:    props.key_code,
      octave:      value_or(props.octave, 0),
      ascent:      value_or(props.ascent, MusicTheory.KEY_ASCENT.NONE),
      extend_dash: value_or(props.extend_dash, 0),
      half_point:  value_or(props.half_point, 0),
      key_x:       props.key_x,
      key_y:       props.key_y,
      size_ratio:  props.size_ratio
    };
    
    const font_size_seed                =  5     ;
    const font_height_seed              = font_size_seed * 0.713 ;
    const font_width_seed               = font_size_seed * 0.54  ;
    const octave_dot_sp_seed            =  1.0   ; // the space between dot
    const octave_dot_r_seed             = font_size_seed * 0.07  ;
    const octave_dot_x_seed             =  1.4   ;
    const first_up_octave_dot_y_seed    = -4.7   ;
    const first_down_octave_dot_y_seed  =  1.0   ;
    const ascent_size_seed              =  3.5   ;
    const ascent_height_seed            = ascent_size_seed * 0.713;
    const ascent_width_seed             = ascent_size_seed * 0.54;
    const ascent_x_seed                 = -1.7  ;
    const ascent_y_seed                 = -2.2  ;
    const ext_dash_seed                 =  3.0  ;
    const ext_dash_y_seed               =  -(font_height_seed / 2)  ;
    const ext_dash_sp_seed              =  2.0  ;
    const half_point_r_seed             = font_size_seed * 0.1  ;
    // const half_point_sp_x_seed          =  1.0  ;
    // const half_point_sp_y_seed          =  0.0  ;

    this.font_size = font_size_seed * this.state.size_ratio;
    this.font_height = this.state.size_ratio * font_height_seed;
    this.font_width = this.state.size_ratio * font_width_seed;
    this.octave_dot_x = this.state.key_x + ( this.state.size_ratio * octave_dot_x_seed) ;
    this.octave_dot_r = this.state.size_ratio * octave_dot_r_seed;
    this.first_up_octave_dot_y   = this.state.key_y + (first_up_octave_dot_y_seed * this.state.size_ratio);
    this.first_down_octave_dot_y = this.state.key_y + (first_down_octave_dot_y_seed * this.state.size_ratio);
    this.ascent_size = this.state.size_ratio * ascent_size_seed;
    this.ascent_x = this.state.key_x + (this.state.size_ratio * ascent_x_seed);
    this.ascent_y = this.state.key_y + (this.state.size_ratio * ascent_y_seed);
    this.ascent_height = this.state.size_ratio * ascent_height_seed;
    this.ascent_width = this.state.size_ratio * ascent_width_seed;
    this.octave_dot_sp = octave_dot_sp_seed * this.state.size_ratio;
    this.octave_dot_ys = [];
    if ( this.state.octave > 0 ) {
      for ( let i = 0; i < this.state.octave; i ++ ){
        this.octave_dot_ys.push(this.first_up_octave_dot_y - ( this.octave_dot_sp * i ));
      }
    } else if ( this.state.octave < 0 ) {
      for ( let i = 0; i > this.state.octave; i -- ){
        this.octave_dot_ys.push(this.first_down_octave_dot_y - ( this.octave_dot_sp * i )) // !!! i is negtive
      }
    } else {}
    const key_rect = this.keyBoundRect();
    this.ext_dash = this.state.size_ratio * ext_dash_seed;
    this.ext_dash_sp = this.state.size_ratio * ext_dash_sp_seed;
    this.ext_dash_y = (this.state.size_ratio * ext_dash_y_seed) + this.state.key_y;
    this.ext_dash_xs = [];
    const ext_dash_start = key_rect.x + key_rect.width + this.ext_dash_sp;
    const ext_dash_x_dis = this.ext_dash_sp + this.ext_dash;
    for(let i = 0; i < this.state.extend_dash; i ++ ) {
      this.ext_dash_xs.push(ext_dash_start + ( ext_dash_x_dis * i));
    }
    
    this.half_point_start = ( ext_dash_start + ( this.ext_dash_xs.length * ext_dash_x_dis));
    this.half_point_y = this.ext_dash_y;
    this.half_point_sp = this.ext_dash_sp;
    this.half_point_xs = [];
    for(let i = 0; i < this.state.half_point; i ++) {
      this.half_point_xs.push(this.half_point_start + (this.half_point_sp * i));
    }
    this.half_point_r = half_point_r_seed * this.state.size_ratio;
  }
  keyBoundRect() {
    return {
      x: this.state.key_x,
      y: this.state.key_y - this.font_height,
      width: this.font_width,
      height: this.font_height
    }
  }
  halfPointsBoundRect() {
    return {
      x: this.half_point_start,
      y: this.half_point_y - this.half_point_r,
      height: this.half_point_r * 2,
      width: this.half_point_sp * (this.half_point_xs.length - 1) + (this.half_point_r * 2)
    }

  }
  // extDashBoundLine() {
  //   const key_rect = this.keyBoundRect();
  //   const start = key_rect.x + key_rect.width;
  //   return {
  //     y: this.ext_dash_y,
  //     start: start,
  //     length: 
  //   }
  // }
  ascentBoundRect() {
    return {
      x: this.ascent_x,
      y: this.ascent_y - this.ascent_height,
      width: this.ascent_width,
      height: this.ascent_height
    }
  }
  octaveDotsBoundRect() {
    return {
      x: this.octave_dot_x - this.octave_dot_r,
      y: Math.min(...this.octave_dot_ys) - this.octave_dot_r,
      width: this.octave_dot_r * 2,
      height: this.octave_dot_sp * (this.octave_dot_ys.length - 1) + (this.octave_dot_r * 2)
    }
  }
  boundRect() {
    let rects = [
      this.keyBoundRect(),
      this.ascentBoundRect(),
      this.octaveDotsBoundRect(),
      this.halfPointsBoundRect()
    ];
    let res = rects.reduce((r, pr) => {
      console.log(pr)
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
  render(key) {
    if(key === undefined) {
      key = 0;
    }
    // handle octave
    var octave_tags = [];
    for(let i in this.octave_dot_ys) {
      octave_tags.push(<circle fill="black" r={this.octave_dot_r} transform={
        "translate(" + 
          this.octave_dot_x + "," + 
          this.octave_dot_ys[i] + 
        ")"
      } key={i}/>);
    }
    // handle tempo bar
    let ext_dashs = [];
    for(let i in this.ext_dash_xs) {
      let ext_dash_x = this.ext_dash_xs[i];
      ext_dashs.push(<line
        x1={ext_dash_x}
        x2={ext_dash_x + this.ext_dash}
        y1={this.ext_dash_y}
        y2={this.ext_dash_y}
        key={i}
        style={{
          "stroke": 'black', 
          "strokeWidth": 1
        }} 
      />)
    }
    let half_points = [];
    for(let i in this.half_point_xs) {
      let hpx = this.half_point_xs[i]
      half_points.push(<circle
        fill="black"
        r={this.half_point_r} 
        transform={
          "translate(" + 
            hpx + "," + 
            this.half_point_y +
          ")"
        }
        key={i}
      />)
    }
    let note_rect = this.boundRect(); 
    console.log(note_rect)
    let debug_tags = [
        <rect x={note_rect.x} y={note_rect.y} 
          width={note_rect.width} height={note_rect.height} style={{
          "stroke": 'black', 
          "strokeWidth": 2,
          "fill": 'none'
        }}></rect>
    ]
    return (
      <g className="Note"
        key={key}
      >
        { octave_tags }
        <text transform={ 
            "translate(" + this.state.key_x + "," + this.state.key_y + ")" 
          } fontSize={this.font_size}>{ this.state.key_code }
        </text>
        <text fontSize={this.ascent_size} transform={
            "translate(" + this.ascent_x + ", " + this.ascent_y + ")"
          }> { 
            MusicTheory.KEY_ASCENT_SIGN[this.state.ascent] 
          } 
        </text>
          { ext_dashs }
          { half_points }
          {
            // debug_tags
          }
      </g>
    );
  }
}

export default Note;
