import React from 'react'
import '../../App.css'
import './styles.css'
import '../commonStyles.css'
import { Button, Form, Input, Radio, Select } from 'antd'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { Option } = Select;

    const navigate = useNavigate(); 
    const routeChange = () =>{ 
      const path = `/register-success`; 
      navigate(path);
    }

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
          <Select style={{ width: 70 }} >
            <Option value="65">+65</Option>
          </Select>
        </Form.Item>
      );
    
    return (
        <div className={'container'}>
            <div className={'header'}>
                <h1>let's kaypoh!</h1>
                <h3>Register to be a kaypoh!</h3>
                <p>Thank you for your interest in volunteering with us!</p>
                <p>Just a couple more questions...</p>
            </div>

            <div className={'form'}>
                <Form
                    initialValues={{
                        prefix: '+65'
                    }}
                    name="register"
                    layout="horizontal"
                    labelCol={{span: 10}}
                    wrapperCol={{ span: 14}}
                    className='formInput'
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
                        label="Email"
                        name="email"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Mobile No."
                        name="mobile"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
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
        </div>
    )
}

export default Register