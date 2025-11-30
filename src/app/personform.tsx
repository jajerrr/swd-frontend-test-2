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
    <div className="w-full" 
     style={{ padding: "5rem" }}>
      <Card
        className="rounded-2xl border-none bg-white/90 shadow-2xl backdrop-blur-md"
       styles={{body: {padding: "2rem",},}}
        
      >
       <Form
  form={form}
  layout="vertical"
  onFinish={onFinish}
  onValuesChange={onValuesChange}
  className="space-y-6"
>

  <Row gutter={24}>
    <Col xs={24} md={6}>
      <Form.Item label="คำนำหน้า" name="title" rules={[{ required: true }]}>
        <Select placeholder="เลือกคำนำหน้า" />
      </Form.Item>
    </Col>

    <Col xs={24} md={9}>
      <Form.Item label="ชื่อจริง" name="firstName" rules={[{ required: true }]}>
        <Input placeholder="กรอกชื่อจริง" />
      </Form.Item>
    </Col>

    <Col xs={24} md={9}>
      <Form.Item label="นามสกุล" name="lastName" rules={[{ required: true }]}>
        <Input placeholder="กรอกนามสกุล" />
      </Form.Item>
    </Col>
  </Row>

  <Row gutter={24}>
    <Col xs={24} md={6}>
      <Form.Item label="วันเกิด" name="birthday" rules={[{ required: true }]}>
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
    </Col>

    <Col xs={24} md={6}>
      <Form.Item label="สัญชาติ" name="nationality" rules={[{ required: true }]}>
        <Select placeholder="เลือกสัญชาติ" />
      </Form.Item>
    </Col>

    
  </Row>

  <Col xs={24} md={12}>
      <Form.Item label="เลขบัตรประชาชน" name="citizenId">
        <Input placeholder="กรอกเลขบัตรประชาชน" />
      </Form.Item>
    </Col>
  
    <Col xs={24} md={8}>
      <Form.Item label="เพศ" name="gender" rules={[{ required: true }]}>
        <Radio.Group className="flex gap-6">
          <Radio value="male">ชาย</Radio>
          <Radio value="female">หญิง</Radio>
          <Radio value="unsex">ไม่ระบุ</Radio>
        </Radio.Group>
      </Form.Item>
    </Col>

    <Col xs={24} md={8}>
      <Form.Item label="เบอร์มือถือ" name="mobile" rules={[{ required: true }]}>
        <Input placeholder="กรอกเบอร์มือถือ" />
      </Form.Item>
    </Col>

    <Col xs={24} md={8}>
      <Form.Item label="เลขพาสปอร์ต" name="passportNo">
        <Input placeholder="กรอกเลขพาสปอร์ต" />
      </Form.Item>
    </Col>
  

  <Row gutter={24}>
  <Col xs={24} md={12}>
    <Form.Item
      label="เงินเดือนที่คาดหวัง"
      name="expectedSalary"
      rules={[{ required: true }]}
    >
      <InputNumber className="w-full" placeholder="เช่น 30000" />
    </Form.Item>
  </Col>
</Row>

  <Row justify="end" gutter={12}>
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
