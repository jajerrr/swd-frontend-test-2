"use client";

import React from "react";
import { Card, Table, Button, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../lib/store";
import { deletePerson, startEdit } from "../features/personSlice";
import type { Person } from "../features/personSlice";

const PersonTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.person.list);

  const columns = [
    {
      title: "ชื่อ - นามสกุล",
      dataIndex: "fullName",
      key: "fullName",
      render: (_: any, record: Person) =>
        `${record.title ? record.title + " " : ""}${record.firstName} ${
          record.lastName
        }`,
    },
    {
      title: "เบอร์มือถือ",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "สัญชาติ",
      dataIndex: "nationality",
      key: "nationality",
    },
    {
      title: "เงินเดือนที่คาดหวัง",
      dataIndex: "expectedSalary",
      key: "expectedSalary",
      render: (val: number | null) => (val ? val.toLocaleString() : "-"),
    },
    {
      title: "จัดการ",
      key: "actions",
      render: (_: any, record: Person) => (
        <Space>
          <Button
            size="small"
            onClick={() => dispatch(startEdit(record.id))}
          >
            แก้ไข
          </Button>
          <Button
            danger
            size="small"
            onClick={() => dispatch(deletePerson(record.id))}
          >
            ลบ
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card
      className="mt-4 rounded-2xl border-none bg-white/90 shadow-2xl backdrop-blur-md"
      
    >
      <Table<Person>
        rowKey="id"
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20],
        }}
      />
    </Card>
  );
};

export default PersonTable;
