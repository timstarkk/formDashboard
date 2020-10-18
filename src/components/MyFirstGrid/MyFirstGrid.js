import {Responsive, WidthProvider} from 'react-grid-layout';
import React, { Component } from 'react';
import { ItemContext } from '../../context';
import './MyFirstGrid.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
 
export default class MyFirstGrid extends Component {
  static contextType = ItemContext;
  constructor(props) {
    super();
    this.onLayoutChange = this.onLayoutChange.bind(this);
  }

  onLayoutChange(layout, layouts) {
    console.log(layout);
    console.log(layouts);
    // below copied from example
    // this.props.onLayoutChange(layout, layouts);
  }

  render() {
    const { layouts, updateLayouts } = this.context;

    console.log(layouts);
    return (
      <ResponsiveReactGridLayout 
      className="layout" 
      layouts={layouts}
      onLayoutChange={this.onLayoutChange}
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