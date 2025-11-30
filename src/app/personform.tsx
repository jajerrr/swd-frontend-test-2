"use client";

import React, { useEffect } from "react";
import {
  Card,
  Form,
  Input,
  Select,
  DatePicker,
  Radio,
  InputNumber,
  Row,
  Col,
  Button,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../lib/store";
import { setField, resetFormState, addPerson ,updatePerson} from "../features/personSlice";
import type { PersonFormState } from "../features/personSlice";

const { Option } = Select;

const PersonForm: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();

  const { form: formData, isEditing } = useSelector(
    (state: RootState) => state.person
  );

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [formData, form]);

  const onFinish = () => {
    if (isEditing) {
      console.log("Update person:", formData);
      dispatch(updatePerson());
    } else {
      console.log("Add new person:", formData);
      dispatch(addPerson());
    }
    form.resetFields();
  };

  const onValuesChange = (
    changed: Partial<PersonFormState>,
    _allValues: PersonFormState
  ) => {
    const field = Object.keys(changed)[0] as keyof PersonFormState;
    const value = changed[field];
    dispatch(setField({ field, value }));
  };

  const handleReset = () => {
    dispatch(resetFormState());
    form.resetFields();
  };

  return (
    <div className="w-full">
      <Card
        className="rounded-2xl border-none bg-white/90 shadow-2xl backdrop-blur-md"
        
      >
       <Form
  form={form}
  layout="vertical"
  onFinish={onFinish}
  onValuesChange={onValuesChange}
  className="space-y-2"
>
  <Row gutter={16}>
    <Col span={4}>
      <Form.Item
        label="คำนำหน้า"
        name="title"
        rules={[{ required: true, message: "กรุณาเลือกคำนำหน้า" }]}
      >
        <Select placeholder="เลือกคำนำหน้า" size="middle">
          <Option value="นาย">นาย</Option>
          <Option value="นาง">นาง</Option>
          <Option value="นางสาว">นางสาว</Option>
        </Select>
      </Form.Item>
    </Col>

    <Col span={10}>
      <Form.Item
        label="ชื่อจริง"
        name="firstName"
        rules={[{ required: true, message: "กรุณากรอกชื่อจริง" }]}
      >
        <Input placeholder="กรอกชื่อจริง" className="h-10" />
      </Form.Item>
    </Col>

    <Col span={10}>
      <Form.Item
        label="นามสกุล"
        name="lastName"
        rules={[{ required: true, message: "กรุณากรอกนามสกุล" }]}
      >
        <Input placeholder="กรอกนามสกุล" className="h-10" />
      </Form.Item>
    </Col>
  </Row>

  <Row gutter={16}>
    <Col span={6}>
      <Form.Item
        label="วันเกิด"
        name="birthday"
        rules={[{ required: true, message: "กรุณาเลือกวันเกิด" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
    </Col>

    <Col span={6}>
      <Form.Item
        label="สัญชาติ"
        name="nationality"
        rules={[{ required: true, message: "กรุณาเลือกสัญชาติ" }]}
      >
        <Select placeholder="เลือกสัญชาติ">
          <Option value="Thai">ไทย</Option>
          <Option value="Other">อื่นๆ</Option>
        </Select>
      </Form.Item>
    </Col>

    <Col span={12}>
      <Form.Item
        label="เลขบัตรประชาชน"
        name="citizenId"
      >
        <Input placeholder="กรอกเลขบัตรประชาชน" />
      </Form.Item>
    </Col>
  </Row>

  <Row gutter={16}>
    <Col span={8}>
      <Form.Item
        label="เพศ"
        name="gender"
        rules={[{ required: true, message: "กรุณาเลือกเพศ" }]}
      >
        <Radio.Group className="flex gap-4">
          <Radio value="male">ชาย</Radio>
          <Radio value="female">หญิง</Radio>
          <Radio value="unsex">ไม่ระบุ</Radio>
        </Radio.Group>
      </Form.Item>
    </Col>

    <Col span={8}>
      <Form.Item
        label="เบอร์มือถือ"
        name="mobile"
        rules={[{ required: true, message: "กรุณากรอกเบอร์มือถือ" }]}
      >
        <Input placeholder="กรอกเบอร์มือถือ" />
      </Form.Item>
    </Col>

    <Col span={8}>
      <Form.Item
        label="เลขพาสปอร์ต"
        name="passportNo"
      >
        <Input placeholder="กรอกเลขพาสปอร์ต" />
      </Form.Item>
    </Col>
  </Row>

  <Row gutter={16}>
    <Col span={8}>
      <Form.Item
        label="เงินเดือนที่คาดหวัง"
        name="expectedSalary"
        rules={[{ required: true, message: "กรุณากรอกเงินเดือนที่คาดหวัง" }]}
      >
        <InputNumber className="w-full" placeholder="เช่น 30000" />
      </Form.Item>
    </Col>
  </Row>

  <Row justify="end" gutter={8} className="pt-2">
    <Col>
      <Button onClick={handleReset}>ล้างฟอร์ม</Button>
    </Col>
    <Col>
      <Button type="primary" htmlType="submit">
        {isEditing ? "บันทึกการแก้ไข" : "ส่งข้อมูล"}
      </Button>
    </Col>
  </Row>
</Form>

      </Card>
    </div>
  );
};

export default PersonForm;
