import { useState } from 'react'
import '../../App.css'
import './styles.css'
import '../commonStyles.css'
import { Button, Form, FormProps, Input, Select } from 'antd'
import { useNavigate } from 'react-router-dom';

import { navigateToRoute } from '../../components/utils'
import { checkMobileExists, loginUser } from '../../api'

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
    const [mobileError, setMobileError] = useState<boolean>(false);

    const navigate = useNavigate(); 

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
          <Select style={{ width: 70 }} >
            <Option value="65">+65</Option>
          </Select>
        </Form.Item>
      );

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        setLoading(true);

        try {
            await checkMobileExists(values.mobile);
            setMobileError(false);
        } catch (error) {
            console.error("Error checking user mobile:", error);
            setMobileError(true);
            setLoading(false);
            return;
        }

        try {
            console.log('Logging in', loading)
            localStorage.clear()
            const response = await loginUser(values.mobile)
            const { access_token, user } = response
            localStorage.setItem('access_token', access_token)
            localStorage.setItem('user_id', user.user_id)
            localStorage.setItem('name', user.name)
            navigateToRoute('/home', navigate);
        } catch (error) {
            console.error("Error logging in:", error);
            navigateToRoute('/', navigate);
        }
        setLoading(false);
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
                        rules={[
                            { required: true, message: 'Please input your mobile number' }
                        ]}
                    >
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    </Form.Item>
                   {mobileError && <div style={{ color: 'red', marginTop: -10 }}><p>Mobile number does not exist.</p></div>}
                    <Button htmlType='submit'>
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default Login