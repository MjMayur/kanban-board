import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";

function KanbanBord() {
  const [modal, setModal] = useState(false);
  const [cardStatus, setCardStatus] = useState("");
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedEndItem, setDraggedEndItem] = useState(null);
  const [cardData, setCardData] = useState({
    title: "",
    task: "",
  });
  const [columns, setColumns] = useState({
    todo: [
      {
        id: 1,
        title: "Complete Task 1",
        task: "Ensure all requirements for Task 1 are met and documented before submission.",
      },
      {
        id: 2,
        title: "Complete Task 2",
        task: "Ensure all requirements for Task 2 are met and documented before submission.",
      },
      {
        id: 3,
        title: "Complete Task 3",
        task: "Ensure all requirements for Task 3 are met and documented before submission.",
      },
    ],
    inProgress: [
      {
        id: 4,
        title: "Start Project Alpha",
        task: "Define project scope and assign tasks to team members.",
      },
      {
        id: 5,
        title: "Design Prototype Beta",
        task: "Create wireframes and gather feedback for the prototype.",
      },
      {
        id: 6,
        title: "Prepare Marketing Plan",
        task: "Draft the initial marketing strategy and budget allocation.",
      },
      {
        id: 7,
        title: "Set Up Testing Environment",
        task: "Configure servers and test scripts for the application.",
      },
    ],
    testing: [
      {
        id: 8,
        title: "Conduct Meeting with Team",
        task: "Review progress and address any blockers for the current sprint.",
      },
      {
        id: 9,
        title: "Finalize Presentation Slides",
        task: "Polish the presentation for the upcoming client demo.",
      },
    ],
    done: [
      {
        id: 10,
        title: "Review Codebase",
        task: "Ensure code consistency and address any technical debt.",
      },
      {
        id: 11,
        title: "Submit Timesheet",
        task: "Log work hours and submit the timesheet for approval.",
      },
      {
        id: 12,
        title: "Plan Next Sprint",
        task: "Create a roadmap and prioritize tasks for the upcoming sprint.",
      },
      {
        id: 13,
        title: "Plan Next Sprint",
        task: "Create a roadmap and prioritize tasks for the upcoming sprint.",
      },
      {
        id: 14,
        title: "Plan Next Sprint",
        task: "Create a roadmap and prioritize tasks for the upcoming sprint.",
      },
      {
        id: 15,
        title: "Plan Next Sprint",
        task: "Create a roadmap and prioritize tasks for the upcoming sprint.",
      },
    ],
  });
  const handleModal = (value) => {
    setModal(!modal);
    setCardStatus(value);
    setCardData({
      title: "",
      task: "",
    });
  };

  const handleSubmit = () => {
    let array = [];
    if (cardStatus === "todo") {
      array = [...columns.todo];
      array.push(cardData);
      setColumns({ ...columns, todo: array });
    } else if (cardStatus === "inProgress") {
      array = [...columns.inProgress];
      array.push(cardData);
      setColumns({ ...columns, inProgress: array });
    } else if (cardStatus === "testing") {
      array = [...columns.testing];
      array.push(cardData);
      setColumns({ ...columns, testing: array });
    } else {
      array = [...columns.done];
      array.push(cardData);
      setColumns({ ...columns, done: array });
    }
    handleModal("");
  };

  const handleChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  //on drag start code
  const ondragstart = (e, id, columnKey) => {
    setDraggedItem({ id, from: columnKey });
    e.currentTarget.style.opacity = "0.5";
  };

  //on drag over code
  const handleDragOver = (e, status) => {
    console.log(status);
    setDraggedEndItem(status);
  };

  //on drag end code
  const handleDragEnd = (e) => {
    e.preventDefault();

    if (!draggedItem) return;
    const { id, from } = draggedItem;
    console.log(from, draggedEndItem, "----->>>");
    if (from === draggedEndItem) return;
    setColumns((prevColumns) => {
      const updatedFromColumn = prevColumns[from].filter(
        (item) => item.id !== id
      );
      const draggedItemDetails = prevColumns[from].find(
        (item) => item.id === id
      );
      const updatedToColumn = [
        ...prevColumns[draggedEndItem],
        draggedItemDetails,
      ];

      // Return the updated columns object
      return {
        ...prevColumns,
        [from]: updatedFromColumn,
        [draggedEndItem]: updatedToColumn,
      };
    });
    setDraggedItem(null);
    e.currentTarget.style.opacity = "1";
  };
  console.log(columns);
  return (
    <Card className="m-2" style={{ fontFamily: "" }}>
      <Modal
        isOpen={modal}
        centered={true}
        style={{ fontFamily: "fantasy" }}
        toggle={handleModal}
      >
        <ModalBody>
          <h3 className="text-3xl font-bold d-flex justify-content-center mb-3">
            Add New Task
          </h3>
          <Input
            name="title"
            placeholder="Title"
            type="text"
            onChange={handleChange}
          />
          <Input
            name="task"
            placeholder="Description"
            className="mt-3"
            type="textarea"
            onChange={handleChange}
          />
        </ModalBody>
        <Button
          color="dark m-3"
          className="border-5 rounded-md"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Modal>
      <CardHeader className="flex justify-content-center">Task List</CardHeader>
      <Row className="m-2">
        <Col md={3} lg={3}>
          <Card>
            <CardHeader>Todo</CardHeader>
            <CardBody>
              <Col>
                {columns.todo.length > 0 ? (
                  columns.todo.map((item) => (
                    <Row
                      className="mx-1"
                      draggable
                      onDragStart={(e) => ondragstart(e, item.id, "todo")}
                      onDragOver={(e) => handleDragOver(e, "todo")}
                      onDragEnd={(e) => handleDragEnd(e, "todo")}
                    >
                      <Card className="mt-3 shadow-md">
                        <CardHeader
                          className="d-flex justify-content-center bg-secondary text-white"
                          style={{ cursor: "pointer" }}
                        >
                          {item.title}
                        </CardHeader>
                        <CardBody className="flex justify-start">
                          {item.task}
                        </CardBody>
                      </Card>
                    </Row>
                  ))
                ) : (
                  <div
                    className="empty-placeholder text-center text-muted mt-3"
                    style={{
                      height: "100px",
                      border: "2px dashed #ccc",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    onDragOver={(e) => handleDragOver(e, "todo")}
                  >
                    Drag tasks here
                  </div>
                )}
                <Button
                  className="mt-3 w-100 shadow-md"
                  outline
                  color="secondary"
                  onClick={() => handleModal("todo")}
                >
                  Create
                </Button>
              </Col>
            </CardBody>
          </Card>
        </Col>
        <Col md={3} lg={3}>
          <Card>
            <CardHeader>In Progress</CardHeader>
            <CardBody>
              <Col>
                {columns.inProgress.length > 0 ? (
                  columns.inProgress.map((item) => (
                    <Row
                      className="mx-1"
                      draggable
                      onDragStart={(e) => ondragstart(e, item.id, "inProgress")}
                      onDragOver={(e) => handleDragOver(e, "inProgress")}
                      onDragEnd={(e) => handleDragEnd(e, "todo")}
                    >
                      <Card className="mt-3 shadow-md">
                        <CardHeader
                          className="d-flex justify-content-center bg-info text-white"
                          style={{ cursor: "pointer" }}
                        >
                          {item?.title}
                        </CardHeader>
                        <CardBody className="d-flex justify-content-start">
                          {item?.task}
                        </CardBody>
                      </Card>
                    </Row>
                  ))
                ) : (
                  <div
                    className="empty-placeholder text-center text-muted mt-3"
                    style={{
                      height: "100px",
                      border: "2px dashed #ccc",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    onDragOver={(e) => handleDragOver(e, "inProgress")}
                  >
                    Drag tasks here
                  </div>
                )}
                <Button
                  className="mt-3 w-100 shadow-md"
                  outline
                  color="info"
                  onClick={() => handleModal("inProgress")}
                >
                  Create
                </Button>
              </Col>
            </CardBody>
          </Card>
        </Col>
        <Col md={3} lg={3}>
          <Card>
            <CardHeader>Testing</CardHeader>
            <CardBody>
              <Col
                className=""
                onDragOver={(e) => handleDragOver(e, "testing")}
              >
                {columns.testing.length > 0 ? (
                  columns.testing.map((item) => (
                    <Row
                      className="mx-2"
                      draggable
                      onDragStart={(e) => ondragstart(e, item.id, "testing")}
                      onDragOver={(e) => handleDragOver(e, "testing")}
                      onDragEnd={(e) => handleDragEnd(e, "testing")}
                    >
                      <Card className="mt-3 shadow-md">
                        <CardHeader
                          className="d-flex justify-content-center bg-primary text-white"
                          style={{ cursor: "pointer" }}
                        >
                          {item.title}
                        </CardHeader>
                        <CardBody className="d-flex justify-content-start">
                          {item.task}
                        </CardBody>
                      </Card>
                    </Row>
                  ))
                ) : (
                  <div
                    className="empty-placeholder text-center text-muted mt-3"
                    style={{
                      height: "100px",
                      border: "2px dashed #ccc",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    onDragOver={(e) => handleDragOver(e, "testing")}
                  >
                    Drag tasks here
                  </div>
                )}
                <Button
                  className="mt-3 w-100 shadow-md"
                  outline
                  color="primary"
                  onClick={() => handleModal("testing")}
                >
                  Create
                </Button>
              </Col>
            </CardBody>
          </Card>
        </Col>
        <Col md={3} lg={3}>
          <Card>
            <CardHeader>Done</CardHeader>
            <CardBody>
              <Col>
                {columns.done.length > 0 ? (
                  columns.done.map((item) => (
                    <Row
                      className="mx-2"
                      draggable
                      onDragStart={(e) => ondragstart(e, item.id, "done")}
                      onDragOver={(e) => handleDragOver(e, "done")}
                      onDragEnd={(e) => handleDragEnd(e, "done")}
                    >
                      <Card className="mt-3 shadow-md">
                        <CardHeader
                          className="d-flex justify-content-center bg-success text-white"
                          style={{ cursor: "pointer" }}
                        >
                          {item.title}
                        </CardHeader>
                        <CardBody className="d-flex justify-content-start">
                          {item.task}
                        </CardBody>
                      </Card>
                    </Row>
                  ))
                ) : (
                  <div
                    className="empty-placeholder text-center text-muted mt-3"
                    style={{
                      height: "100px",
                      border: "2px dashed #ccc",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    onDragOver={(e) => handleDragOver(e, "done")}
                  >
                    Drag tasks here
                  </div>
                )}
                <Button
                  className="mt-3 w-100 shadow-md"
                  outline
                  color="success"
                  onClick={() => handleModal("done")}
                >
                  Create
                </Button>
              </Col>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Card>
  );
}

export default KanbanBord;
