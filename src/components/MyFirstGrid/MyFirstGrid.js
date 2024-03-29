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
      layouts: {},
      movingGridItem: false
    };

    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.handleBorders = this.handleBorders.bind(this);
  }

  componentDidMount() {
    const { updateLayouts, layouts } = this.context;
    console.log('didmountdidmount')
    this.setState({
      updateLayouts,
      layouts
    });
  }

  onLayoutChange = async (layout, layouts) => {
    const { types, labels, properties, handleGridItemBorders } = this.context;
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
      i.labelFor = labels[index].labelsFor;
      i.textValue = labels[index].textValue;
      i.placeholder = properties[index].placeholder;
      i.height = properties[index].height;
      i.width = properties[index].width;
      i.defaultValue = properties[index].defaultValue;
      i.borderWidth = properties[index].borderWidth;
      i.borderColor = properties[index].borderColor;
      i.borderRadius = properties[index].borderRadius;
      i.textboxColor = properties[index].textboxColor;
      i.textColor = properties[index].textColor;
      i.fontSize = properties[index].fontSize;
      i.fontFamily = properties[index].fontFamily;
      i.paddingLeft = properties[index].paddingLeft;
      i.italic = properties[index].italic;
    })

    this.state.updateLayouts(layout);
  }

  handleBorders = (show) => {
    this.setState({
      movingGridItem: show
    });
  };

  render() {
    const { layouts, displayForm, movingGridItem, handleGridItemBorders } = this.context;

    return (
      <>
        <ResponsiveReactGridLayout 
        className="layout" 
        layouts={layouts}
        onLayoutChange={this.onLayoutChange}
        onDrag={() => this.handleBorders(true)}
        onDragStop={() => this.handleBorders(false)}
        breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
        cols={{lg: 12, md: 12, sm: 12, xs: 12, xxs: 12}}
        rowHeight={30}>
          {/* have these grid items populate based on database object.*/}
          {displayForm(this.state.movingGridItem)}
        </ResponsiveReactGridLayout>
      </>
    );
  };
};