import React, { useState } from 'react'
import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  Row,
  Space,
  Typography,
} from "antd";
import styled from "styled-components";
import Subtask from "./component/SubTask"

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: 16px 24px;
`;

function App() {
  const [todo, setTodo] = useState([])
  const [inputTask, setInputTask] = useState('')

  const handleCreateTask = () => {
    setTodo([...todo, {
      name: inputTask,
      isAllDone: false,
      task: []
    }])
    setInputTask('')
  }

  const handleDeleteTask = (index) => {
    setTodo(todo.filter((_, idx) => idx !== index))
  }

  const handleDuplicateTask = (item) => {
    setTodo([...todo, item])
  }

  const handleCreateSubTask = (value, index) => {
    let subTask = {
      name: value,
      isDone: false
    }
    let addSubTask = todo.map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          task: [...item.task, subTask]
        }
      }
      else {
        return item
      }
    })
    setTodo(addSubTask)
  }

  const handleDeleteSubTask = (taskIndex, subTaskIndex) => {
    let deleteSubTask = todo.map((item, idx) => {
      if (idx === taskIndex) {
        return { ...item, task: item.task.filter((_, sIndex) => sIndex !== subTaskIndex) }
      }
      else {
        return item
      }
    })
    setTodo(deleteSubTask)
  }

  const handleActionSubTask = (taskIndex, subTaskIndex, isDone) => {
    let actionSubTask = todo.map((item, idx) => {
      if (idx === taskIndex) {
        return {
          ...item, task: item.task.map((sItem, sIndex) => {
            if (sIndex === subTaskIndex) {
              return {
                ...sItem,
                isDone
              }
            }
            else {
              return sItem
            }
          })
        }
      }
      else {
        return item
      }
    })
    setTodo(actionSubTask)
  }

  const computeAllTaskDone = (subTask) => {
    if (subTask.length) {
      let someTodo = subTask.some(item => !item.isDone)
      return !someTodo
    }
    return false
  }

  return (
    <Container>
      <Space>
        <Input style={{ width: 400 }} placeholder="Enter Task Name" value={inputTask} onChange={(e) => setInputTask(e.target.value)} />
        <Button type="primary" onClick={handleCreateTask}>Create Task</Button>
      </Space>
      <Space direction="vertical" style={{ marginTop: 24 }}>
        {todo.map((item, index) => (
          <React.Fragment key={index}>
            <Card
              title={<span style={{ textDecoration: `${computeAllTaskDone(item.task) ? 'line-through' : ''}` }}> {item.name} </span>}
              style={{ width: 600 }}
              extra={
                <React.Fragment>
                  <Button type="primary" onClick={() => handleDuplicateTask(item)}>Duplicate</Button>{" "}
                  <Button type="primary" danger onClick={() => handleDeleteTask(index)}>
                    Delete
                </Button>
                </React.Fragment>
              }
            >
              <Space direction="vertical" style={{ width: "100%" }}>
                <Subtask handleCreateSubTask={(value) => handleCreateSubTask(value, index)} />
                <Divider />
                {item.task.map((subItem, idx) => (
                  <React.Fragment key={idx}>
                    <Row>
                      <Col span={16}>
                        <Typography.Text style={{ textDecoration: `${subItem.isDone ? 'line-through' : ''}` }}>
                          {subItem.name} ({`${subItem.isDone ? 'Done' : 'Todo'}`})
                        </Typography.Text>
                      </Col>
                      <Col span={8}>
                        <Button type="primary" onClick={() => handleActionSubTask(index, idx, !subItem.isDone)} >
                          {`${subItem.isDone ? 'Undo' : 'Done'}`}
                        </Button>{" "}
                        <Button type="danger" onClick={() => handleDeleteSubTask(index, idx)}>
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </React.Fragment>
                ))}
              </Space>
            </Card>
          </React.Fragment>
        ))}
      </Space>
    </Container>
  );
}

export default App;
