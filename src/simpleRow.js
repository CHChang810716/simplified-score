import React, { Component } from 'react';
import Measures from './measures.js';
import { value_or, rects_union } from './utils.js';
class SimpleRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pos_x: props.pos_x,
      pos_y: props.pos_y,
      front_bar_gen: value_or(
        props.front_bar_gen, function(x, y, len) {
          return (<line x1={x} x2={x} y1={y} y2={y + len} 
            style={{
              "stroke": 'black', 
              "strokeWidth": 1
            }}
          />)
        }
      ),
      size_ratio: props.size_ratio,
      model: props.model
    }
    const front_bar_len_seed = 14.6;
    const padding_x_seed = 0.5;
    const padding_y_seed = 4;
    this.front_bar_len  = front_bar_len_seed  * this.state.size_ratio;
    this.padding_x      = padding_x_seed      * this.state.size_ratio;
    this.padding_y      = padding_y_seed      * this.state.size_ratio;
    this.measures       = [];
    let last_x_offset   = 0;
    for(let m_mdl of this.state.model) {
      let m = new Measures(
        {
          model: m_mdl,
          pos_x: last_x_offset + this.state.pos_x,
          pos_y: this.state.pos_y,
          size_ratio: this.state.size_ratio
        }
      );
      this.measures.push(m);
      let m_rect = m.boundRect();
      last_x_offset += m_rect.width;
    }
  }
  frontBarBoundRect() {
    return {
      x: this.state.pos_x,
      y: this.state.pos_y - this.padding_y,
      width: 0,
      height: this.front_bar_len
    }
  }
  boundRect() {
    let rects = this.measures.map((m) => {
      return m.boundRect();
    })
    rects.push(this.frontBarBoundRect());
    return rects_union(rects);
  }
  render(key) {
    if(key === undefined) {
      key = 0;
    }
    let measures = [];
    for(let i in this.measures) {
      let m = this.measures[i];
      measures.push(m.render(i));
    }
    let front_bar_rect = this.frontBarBoundRect();

    
    // let debug_tags = [
    //     <rect x={bound_rect.x} y={bound_rect.y} 
    //       width={bound_rect.width} height={bound_rect.height} style={{
    //       "stroke": 'black', 
    //       "strokeWidth": 2,
    //       "fill": 'none'
    //     }}></rect>
    // ]
    return (
      <g className="ScoreRow" key={key}>
        {measures}
        {
          this.state.front_bar_gen(
            front_bar_rect.x, front_bar_rect.y,
            this.front_bar_len
          )
        }
      </g>
    );
  }
}
export default SimpleRow;