import React from 'react'
import '../commonStyles.css'
import '../../App.css'
import './styles.css'
import { Button, DatePicker, Form } from 'antd'


const RegisterVisit = () => {

    return (
        <div className={'container'}>
            <div className={'header'}>
                <h1>let's kaypoh!</h1>
                <h3>Register your visit</h3>
            </div>

            <div className={'register-visit'}>
                <Form
                    name="register"
                    layout="inline"
                    labelCol={{ span: 4 }}
                    className='formInput'
                >
                    <Form.Item
                        label="Date"
                        name="date"
                        rules={[{ required: true, message: 'Please input intended date of visit!' }]}
                    >
                        <DatePicker />
                    </Form.Item>
                    
                </Form>
                <Button onClick={() => console.log('aaa')}>
                    Register
                </Button>
            </div>

        </div>
    )
}

export default RegisterVisit