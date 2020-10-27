import {Responsive, WidthProvider} from 'react-grid-layout';
import React, { Component } from 'react';
import { ItemContext } from '../../context';
import './MyFirstGrid.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
 
export default class MyFirstGrid extends Component {
  static contextType = ItemContext;
  constructor(props) {
    super();
    this.state = { 
      updateLayouts: function () {},
      layouts: {}
    };

    this.onLayoutChange = this.onLayoutChange.bind(this);
  }

  componentDidMount() {
    const { updateLayouts, layouts } = this.context;

    console.log(layouts);
    this.setState({
      updateLayouts,
      layouts
    });
  }

  onLayoutChange(layout, layouts) {
    const { types, labels } = this.context;
    layout.map((i, index) => {
      i.isResizable = true;
      i.isDraggable = true;
      i.isBounded = false;
      i.maxH = Infinity;
      i.maxW = Infinity;
      i.minH = 0;
      i.minW = 0;
      i.type = types[index];
      i.isLabel = labels[index].isLabel;
      i.labelFor = labels[index].labelsFor
    })
    this.state.updateLayouts(layout);
  }

  render() {
    const { layouts, displayForm } = this.context;
    return (
      <>
        <ResponsiveReactGridLayout 
        className="layout" 
        layouts={layouts}
        onLayoutChange={this.onLayoutChange}
        breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
        cols={{lg: 12, md: 12, sm: 12, xs: 12, xxs: 12}}
        rowHeight={30}>
          {/* have these grid items populate based on database object.*/}
          {displayForm()}
        </ResponsiveReactGridLayout>
      </>
    );
  };
};