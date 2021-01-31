import React, { useState } from 'react'
import {
    Button,
    Input,
    Space,
} from "antd";

function Subtask(props) {
    const [subTask, setSubTask] = useState('')

    const handleAddSubTask = () => {
        props.handleCreateSubTask(subTask)
        setSubTask('')
    }

    return (
        <Space>
            <Input placeholder="Enter Subtask Name" style={{ width: 400 }} value={subTask} onChange={(e) => setSubTask(e.target.value)} />
            <Button type="primary" onClick={handleAddSubTask}>Add Subtask</Button>
        </Space>
    )
}

export default Subtask