import React from 'react'
import '../../App.css'
import { Button, Form, Input, Radio, Select } from 'antd'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { Option } = Select;

    const navigate = useNavigate(); 
    const routeChange = () =>{ 
      const path = `/register-success`; 
      navigate(path);
    }
    
    return (
        <div className={'container'}>
            <div className={'header'}>
                <h1>let's kaypoh!</h1>
                <h3>Register to be a kaypoh!</h3>
                <p>Thank you for your interest in volunteering with us! Just a couple more questions...</p>
            </div>

            <Form
                name="register"
                layout="vertical"
                labelCol={{ span: 1 }}
                wrapperCol={{ span: 1 }}
            >
                <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="NRIC/FIN"
                    name="nric"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Age"
                    name="age"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Gender"
                    name="gender"
                    rules={[{ required: true }]}
                >
                    <Radio.Group>
                        <Radio value="a">Male</Radio>
                        <Radio value="b">Female</Radio>
                        <Radio value="c">Prefer not to say</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label="Spoken Languages"
                    name="languages"
                    rules={[{ required: true }]}
                >
                    <Select mode="multiple" placeholder="Please select spoken languages">
                        <Option value="english">English</Option>
                        <Option value="mandarin">Mandarin</Option>
                        <Option value="malay">Bahasa Melayu</Option>
                        <Option value="tamil">Tamil</Option>
                        <Option value="Hindi">Hindi</Option>
                        <Option value="hokkien">Hokkien</Option>
                        <Option value="cantonese">Cantonese</Option>
                        <Option value="teochew">Teo Chew</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Postal Code"
                    name="postal"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

            </Form>

            <Button onClick={routeChange}>
                Register
            </Button>
        </div>
    )
}

export default Register