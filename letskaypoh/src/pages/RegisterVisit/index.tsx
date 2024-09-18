import React, { useEffect, useState } from 'react'
import '../commonStyles.css'
import '../../App.css'
import './styles.css'
import { Button, Checkbox, DatePicker, Form, FormProps, message } from 'antd'
import { SeniorCard } from '../../components/Card/SeniorCard'
import { InfoCircleTwoTone } from '@ant-design/icons'
import { SeniorInterface, VisitInterface, VisitStatus } from '../../models/interfaces'
import { useLocation, useNavigate } from 'react-router-dom'
import { navigateToRoute } from '../../components/utils'
import { createVisit, getLatestVisitId, getSeniorByIdData } from '../../api'
// import cn from 'classnames'

type FieldType = {
    visitDate: string
    visitTime: string
};

interface TimeslotButtonProps {
    time: string
    setSelectedTime: (time: string) => void
    isSelected: boolean
}

export const TimeSlotButton: React.FC<TimeslotButtonProps> = (props) => {
    return <Button className='timeslotBtn'
        type={props.isSelected ? 'primary' : 'default'}
        onClick={() => props.setSelectedTime(props.time)} 
    >
        {props.time}
    </Button>
}

const RegisterVisit: React.FC = () => {
    const seniorId = Number(useLocation().pathname.split("/")[2]);

    const userId = localStorage.getItem('userId')

    const [loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate(); 

    const [selectedTimeslot, setSelectedTimeslot] = useState<string>()

    const timeslots = ["8AM-11PM", "11PM-2PM", "2PM-5PM", "5PM-8PM"]

    const handleConfirmVisit: FormProps['onFinish'] = (fieldValues) => {
        const dateValue = fieldValues['visitDate']
        const timeValue = fieldValues['visitTime']

        const values: FieldType = {
            visitDate: dateValue.format('DD MMM YYYY'),
            visitTime: timeValue
        }
        
        console.log('Received values of form: ', values);
        console.log('visitDate', values.visitDate)
        setLoading(true)

        const visitDetails: VisitInterface = {
            datetime: values.visitDate,
            time: values.visitDate,
            senior_id: seniorId,
            visitor_ids: [Number(userId)],
            status: VisitStatus.UPCOMING
        }
        
        const postData = async () => {
            try {
                await createVisit(visitDetails);
                const visitId = await getLatestVisitId();

                console.log('visitDetails: ', visitDetails)

                setLoading(false)
                console.log('loading', loading)

                message.success('Visit confirmed')

                navigateToRoute(`/visit-confirmed/${visitId}`, navigate)
            } catch (error) {
                console.error("Error fetching senior data:", error);
            }
        };

        postData();
    }

    const [senior, setSenior] = useState<SeniorInterface | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const seniorData = await getSeniorByIdData(seniorId);
                setSenior(seniorData);
            } catch (error) {
                console.error("Error fetching senior data:", error);
            }
        };
 
        fetchData();
    }, [seniorId])

    return (
        <div className={'container'}>
            <div className={'header'}>
                <h1>let's kaypoh!</h1>
                <h3>Register your visit</h3>
            </div>

            <div className={'register-visit'}>
                {senior && 
                <SeniorCard senior={senior}/> }

                <Form
                    scrollToFirstError
                    onFinish={handleConfirmVisit}
                    name="register"
                    layout="inline"
                    labelCol={{ span: 6 }}
                    className='formInput'
                >
                    <Form.Item
                        label="Date"
                        name="visitDate"
                        rules={[{ required: true, message: 'Please input intended date of visit!' }]}
                    >
                        <DatePicker style={{width:'200px'}} />
                    </Form.Item>

                    <Form.Item name='visitTime' label="Timeslot"
                    >{
                        timeslots.map((time) => (
                            <TimeSlotButton 
                                time={time} 
                                setSelectedTime={setSelectedTimeslot}
                                isSelected={time === selectedTimeslot}
                            />
                        ))
                    }</Form.Item> 

                    <div className={'note'}>
                        <h3>Important Notes <InfoCircleTwoTone style={{fontSize: 14}}/></h3>
                        To ensure the well being of our seniors, please read the following terms of usage:
                        <ul>
                            <li>The senior's unit number will be shown on the <a>Upcoming Visits</a> tab 1 hour before the stipulated visit timeslot.</li>
                            <li>During your visit, do NOT enter the senior's house at any point of time</li>
                            <li>Remember to mark your visit as completed and complete the post-visit survey after your visit. </li>
                            <li>If you missed your visit, please indicate that you have missed it</li>
                        </ul>
                    </div>

                    <Form.Item
                        name="acknowledgement"
                        valuePropName="checked"
                        rules={[{
                            validator: (_, value) =>
                              value ? Promise.resolve() : Promise.reject(new Error('Please acknowledge agreement!')),
                          },]}
                    >
                        <Checkbox>I have read the <a>Terms & Conditions</a></Checkbox>
                    </Form.Item>


                    <Form.Item>
                        <Button 
                            type={'primary'}
                            className={'confirmButton'} 
                            htmlType='submit'
                        >
                            Confirm Visit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default RegisterVisit