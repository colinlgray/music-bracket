import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { map } from "lodash";
import CompetitorDisplay from "./CompetitorDisplay";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  minWidth: 440
});

export class CompetitorSelection extends Component {
  state = {
    items: [],
    selected: []
  };

  idToList = {
    droppable: "items",
    droppable2: "selected"
  };

  move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    if (droppableSource.droppableId === "droppable") {
      this.props.onAddCompetitor(removed);
    } else {
      this.props.onRemoveCompetitor(removed);
    }
    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  getList = id => this.state[this.idToList[id]];

  onDragEnd = result => {
    const { source, destination } = result;
    this.setState({ dragging: false });

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      let state = { items };

      if (source.droppableId === "droppable2") {
        state = { selected: items };
      }

      this.setState(state);
    } else {
      const result = this.move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      this.setState({
        items: result.droppable,
        selected: result.droppable2
      });
    }
  };

  onDragStart = () => {
    this.setState({ dragging: true });
  };

  componentWillReceiveProps(props) {
    // Do something more complex here
    if (!this.state.dragging) {
      this.setState({ items: props.competitors, selected: props.selected });
    } else {
      console.error("Tried to update list while dragging");
    }
  }

  componentDidMount() {
    this.setState({
      items: this.props.competitors,
      selected: this.props.selected
    });
  }

  render() {
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
      >
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <CompetitorDisplay
                      competitor={item}
                      viewState={"not-selected"}
                      isDragging={snapshot.isDragging}
                      innerRef={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClickCta={() => {
                        console.log("onClick");
                      }}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="droppable2">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {map(this.state.selected, (item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <CompetitorDisplay
                      competitor={item}
                      viewState={"not-selected"}
                      isDragging={snapshot.isDragging}
                      innerRef={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClickCta={() => {
                        console.log("onClick");
                      }}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}
