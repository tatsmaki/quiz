import React, { useState } from 'react';
import { Table, Space } from 'antd';

import StyledSelectedQuiz from './styles';
import SelectedQuizProps from './types';

function SelectedQuiz({ newQuizData, deleteQuestion, editQuestion }: SelectedQuizProps) {
  const [editingKey, setEditingKey] = useState<number>(0);

  const isEditing = (key: number) => key === editingKey;

  function handleEdit(event: any) {
    const key = event.target.getAttribute('record-key');
    setEditingKey(+key);
    editQuestion(key);
  }

  function handleDelete(event: any) {
    const key = event.target.getAttribute('record-key');
    deleteQuestion(key);
  }

  function handleCancel() {
    setEditingKey(0);
  }

  const columns = [
    {
      title: '№',
      dataIndex: 'number',
      key: 'name',
      render: (text: number) => <span>{text}</span>,
      width: '5vw',
    },
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question',
      width: '43vw',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: any) => {
        const editable = isEditing(record.key);
        return editable ? (
          <Space size="middle">
            <a record-key={record.key} onClick={handleCancel}>Cancel</a>
          </Space>
        ) : (
          <Space size="middle">
            <a record-key={record.key} onClick={handleEdit}>Edit</a>
            <a record-key={record.key} onClick={handleDelete}>Delete</a>
          </Space>
        );
      },
    },
  ];

  return (
    <StyledSelectedQuiz>
      <Table columns={columns} dataSource={newQuizData} scroll={{ y: '46.5vh' }} />
    </StyledSelectedQuiz>
  );
}

export default SelectedQuiz;
