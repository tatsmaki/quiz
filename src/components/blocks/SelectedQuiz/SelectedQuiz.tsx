import React from 'react';
import { Table, Space } from 'antd';

import StyledSelectedQuiz from './styles';
import SelectedQuizProps from './types';

function SelectedQuiz({ newQuizData, deleteRecord }: SelectedQuizProps) {
  function handleEdit() {
    // const key = event.target.getAttribute('record-key');
    // console.log(key);
  }

  function handleDelete(event: any) {
    const key = event.target.getAttribute('record-key');
    deleteRecord(key);
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
      render: (record: any) => (
        <Space size="middle">
          <a record-key={record.key} onClick={handleEdit}>Edit</a>
          <a record-key={record.key} onClick={handleDelete}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <StyledSelectedQuiz>
      <Table columns={columns} dataSource={newQuizData} scroll={{ y: '46.5vh' }} />
    </StyledSelectedQuiz>
  );
}

export default SelectedQuiz;
