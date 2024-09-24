import { useState } from 'react'
import '../../App.css'
import './styles.css'
import '../commonStyles.css'
import { Button, Form, FormProps, Input, Select } from 'antd'
import { useNavigate } from 'react-router-dom';

import { navigateToRoute } from '../../components/utils'
import { loginUser } from '../../api'

type FieldType = {
    name: string;
    nric: string;
    email: string;
    mobile: string;
    age: string;
    gender: string;
    languages: string[];
    address: string;
    postal_code: string;
  };

const Login = () => {
    const { Option } = Select;

    const [loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate(); 

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
          <Select style={{ width: 70 }} >
            <Option value="65">+65</Option>
          </Select>
        </Form.Item>
      );

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        console.log('Received values of form: ', values);
        setLoading(true)

        const userDetails = (
            {
                mobile: values.mobile,
            }
        )

        try {
            console.log('Logging in', loading)
            const response = await loginUser(userDetails)
            const { access_token } = response.data
            localStorage.setItem('access_token', access_token)
            navigateToRoute('/home', navigate);
        } catch (error) {
            console.error("Error registering user:", error);
            navigateToRoute('/', navigate);
        }
        setLoading(false)
        
    };

    return (
        <div className={'container'}>
            <div className={'header'}>
                <h1>let's kaypoh!</h1>
                <h3>Why so kaypoh?</h3>
            </div>

            <div className={'form'}>
                <Form
                    scrollToFirstError
                    onFinish={onFinish}
                    initialValues={{
                        prefix: '+65'
                    }}
                    name="login"
                    layout="horizontal"
                    labelCol={{span: 10}}
                    wrapperCol={{ span: 14}}
                    className='formInput'
                >
                    <Form.Item
                        label="Mobile No."
                        name="mobile"
                        rules={[{ required: true, message: 'Please input your mobile number' }]}
                    >
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    </Form.Item>
                   
                    <Button htmlType='submit'>
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default Login