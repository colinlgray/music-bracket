import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Grid from "@material-ui/core/Grid";
import { map } from "lodash";
import CompetitorDisplay from "./CompetitorDisplay";
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  minHeight: 400
});

export class CompetitorSelection extends Component {
  state = {
    dragging: false
  };

  onDragEnd = result => {
    const { source, destination } = result;
    this.setState({ dragging: false });
    // dropped outside the list
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      this.props.onReorder({
        listName: source.droppableId,
        startIndex: source.index,
        endIndex: destination.index
      });
      if (destination.droppableId === "selected") {
        console.log("The indices need to be updated");
      }
      return;
    }

    if (destination.droppableId === "selected") {
      this.props.onAddCompetitor(
        this.props[source.droppableId][source.index],
        destination.index
      );
    } else {
      this.props.onRemoveCompetitor(
        this.props[source.droppableId][source.index],
        destination.index
      );
    }
  };

  onDragStart = () => {
    this.setState({ dragging: true });
  };

  render() {
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
      >
        <Grid container>
          {this.props.editable && (
            <Droppable droppableId="selectable">
              {(provided, snapshot) => (
                <Grid
                  item
                  ref={provided.innerRef}
                  xs={6}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {this.props.selectable.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <CompetitorDisplay
                          competitor={item}
                          isDragging={snapshot.isDragging}
                          displayedOn="selection"
                          innerRef={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClickCta={c => {
                            this.props.onAddCompetitor(c);
                          }}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Grid>
              )}
            </Droppable>
          )}
          <Droppable droppableId="selected">
            {(provided, snapshot) => (
              <Grid
                item
                xs={this.props.editable ? 6 : 12}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {map(this.props.selected, (item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <CompetitorDisplay
                        competitor={item}
                        isDragging={snapshot.isDragging}
                        displayedOn="selection"
                        innerRef={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClickCta={c => {
                          this.props.onRemoveCompetitor(c);
                        }}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        </Grid>
      </DragDropContext>
    );
  }
}
