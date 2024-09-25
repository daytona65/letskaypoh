import { useState } from 'react'
import '../../App.css'
import './styles.css'
import '../commonStyles.css'
import { Button, Form, FormProps, Input, message, Radio, Select } from 'antd'
import { useNavigate } from 'react-router-dom';
import { SupportedLanguages, UserInterface } from '../../models/interfaces'
import { navigateToRoute } from '../../components/utils'
import { registerUser } from '../../api'

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

const Register = () => {
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
        setLoading(true)

        const newUserDetails: UserInterface = (
            {
                name: values.name,
                nric: values.nric,
                email: values.email,
                mobile: values.mobile,
                age: Number(values.age),
                gender: values.gender,
                languages: values.languages,
                address: values.address,
                postal_code: Number(values.postal_code),
            }
        )

        localStorage.clear()
        localStorage.setItem('name', values.name)
        localStorage.setItem('nric', values.nric)
        localStorage.setItem('email', values.email)
        localStorage.setItem('age', values.age)
        localStorage.setItem('mobile', values.mobile)
        localStorage.setItem('gender', values.gender)
        localStorage.setItem('languages', JSON.stringify(values.languages))
        localStorage.setItem('address', values.address)
        localStorage.setItem('postal_code', values.postal_code)

        try {
            console.log('Registering new user', loading)
            const response = await registerUser(newUserDetails)
            message.success('Registration success')
            const { access_token, user } = response
            localStorage.setItem('access_token', access_token)
            localStorage.setItem('user_id', user.user_id)
            localStorage.setItem('name', user.name)
            navigateToRoute('/register-success', navigate)
        } catch (error) {
            console.error("Error registering user:", error);
        }


        setLoading(false)
        
    };

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
                    scrollToFirstError
                    onFinish={onFinish}
                    initialValues={{
                        prefix: '+65'
                    }}
                    name="register"
                    layout="horizontal"
                    labelCol={{span: 10}}
                    wrapperCol={{ span: 14}}
                    className='formInput'
                >
                    <Form.Item label="Full Name" name="name" rules={[{ required: true, message: 'Please input your full name!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Last 4 digits of NRIC/FIN"
                        name="nric"
                        rules={[{ required: true, message: 'Please input the last 4 digits of NRIC' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Mobile No."
                        name="mobile"
                        rules={[{ required: true, message: 'Please input your mobile number' }]}
                    >
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        label="Age"
                        name="age"
                        rules={[{ required: true, message: 'Please input your age' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Gender"
                        name="gender"
                        rules={[{ required: true, message: 'Please input your gender' }]}
                    >
                        <Radio.Group>
                            <Radio value="M">Male</Radio>
                            <Radio value="F">Female</Radio>
                            <Radio value=" ">Prefer not to say</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="Spoken Languages"
                        name="languages"
                        rules={[{ required: true, message: 'Please select your spoken languages' }]}
                    >
                        <Select mode="multiple" placeholder="Please select spoken languages">
                            {Object.values(SupportedLanguages).map((lang) => 
                                <Option value={lang}>{lang}</Option>
                            )}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please input your area'}]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Postal Code"
                        name="postalCode"
                        rules={[{ required: true, message: 'Please input your postal code' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Button htmlType='submit'>
                        Register
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default Register