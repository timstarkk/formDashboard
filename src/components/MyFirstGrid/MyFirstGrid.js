import {Responsive, WidthProvider} from 'react-grid-layout';
import React, { Component } from 'react';
import { ItemContext } from '../../context';
import './MyFirstGrid.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
 
export default class MyFirstGrid extends Component {
  render() {
    // layout is an array of objects, see the demo for more complete usage
    const layouts = {
        lg: [
            {i: 'a', x: 0, y: 0, w: 12, h: 4},
            {i: 'b', x: 0, y: 1, w: 6, h: 4},
            {i: 'c', x: 6, y: 1, w: 6, h: 4},
            {i: 'd', x: 0, y: 2, w: 12, h: 4}
            ]
    };

    return (
      <ResponsiveReactGridLayout 
      className="layout" 
      layouts={layouts}
      breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
      cols={{lg: 12, md: 12, sm: 12, xs: 12, xxs: 12}}
      rowHeight={30}>
        <div className="grid-item" key="a">a</div>
        <div className="grid-item" key="b">b</div>
        <div className="grid-item" key="c">c</div>
        <div className="grid-item" key="d">d</div>
      </ResponsiveReactGridLayout>
    );
  };
};