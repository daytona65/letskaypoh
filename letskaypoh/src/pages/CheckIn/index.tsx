import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Check from '../../assets/check.webp'
import { Alert, Button, Form, FormProps, Rate } from 'antd';
import { SeniorInterface, VisitInterface } from '../../models/interfaces';
import { getVisitByIdData, getAllSeniorsData } from '../../api';
import { SeniorCard } from '../../components/Card/SeniorCard';
import { VisitCard } from '../../components/Card/VisitCard';
import { navigateToRoute } from '../../components/utils';
import TextArea from 'antd/es/input/TextArea';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';

type FieldType = {
  visitNotes: string;
};


const CompleteVisit = () => {
  const visitId = Number(useLocation().pathname.split("/")[2]);

  const navigate = useNavigate()

  const userName = localStorage.getItem('name')

  const [visit, setVisit] = useState<VisitInterface | null>(null)
  const [senior, setSenior] = useState<SeniorInterface | null>(null);

  const customIcons: Record<number, React.ReactNode> = {
    1: <FrownOutlined color={'red'}/>,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const visitData = await getVisitByIdData(visitId);
        const seniorData = await getAllSeniorsData();
        setVisit(visitData);
        setSenior(seniorData);
      } catch (error) {
        console.error("Error fetching senior data:", error);
      }
    };

    fetchData();
  }, [visitId])

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Received values of form: ', values);
  }

  return (
    <div className={'container'}>
      <div className={'header'}>
        <h1>let's kaypoh!</h1>
      </div>

      <div className={'confirmVisit'}>
        <div className={'thankYou'}>
          <h2>Visit Completed</h2>
          <h3>
            Thank you for visiting, {userName?.split(" ")[0]}!
          </h3>
        </div>
        <img className={'checkImg'} src={Check} />
        <Alert
              className='alert'
              // message={<h3 >Visit confirmed!</h3>}
              // description={`Drop ${props.senior.name} a call to notify ${props.senior.gender.toLowerCase() === "m" ? 'him' : 'her'} that you're visiting!`} 
              description={"Please give some feedback on the visit to help us monitor the senior's wellbeing"}
              type="success"
              // showIcon
          />


        <h3 className={'visitDetails'}>Visit Details</h3>
        <div className={'form'} style={{width: '100%'}}>
          <Form
            scrollToFirstError
            onFinish={onFinish}
            name="completeVisit"
            layout="horizontal"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            className='formInput'
          >
            
            <Form.Item label="Rate your visit" name="rate" rules={[{ required: false, message: 'Please input any notes / remarks!' }]}>
              <Rate defaultValue={3} character={({ index = 0 }) => customIcons[index + 1]} />
            </Form.Item>

            <Form.Item label="Physical Health Condition" name="physical" rules={[{ required: false, message: 'Please input any notes / remarks!' }]}>
              <Rate defaultValue={3} character={({ index = 0 }) => customIcons[index + 1]} />
              {/* <Input /> */}
            </Form.Item>
            <Form.Item label="Mental Health Condition" name="mental" rules={[{ required: false, message: 'Please input any notes / remarks!' }]}>
              <Rate defaultValue={3} character={({ index = 0 }) => customIcons[index + 1]} />
              {/* <Input /> */}
            </Form.Item>

            <Form.Item label="Social Situation" name="social" rules={[{ required: false, message: 'Please input any notes / remarks!' }]}>
              <Rate defaultValue={3} character={({ index = 0 }) => customIcons[index + 1]} />
              {/* <Input /> */}
            </Form.Item>
            <Form.Item label="Visit Notes" name="visitNotes" rules={[{ required: false, message: 'Please input any notes / remarks!' }]}>
              <TextArea />
            </Form.Item>
            <Form.Item label="Any follow up actions?" name="followUp" rules={[{ required: false, message: 'Please input any notes / remarks!' }]}>
              <TextArea />
            </Form.Item>

          </Form>
        </div>


        {senior &&
          <SeniorCard senior={senior} />}
        {visit &&
          <VisitCard visit={visit} />}
        <Button
          className={'regularBtn'}
          onClick={() => navigateToRoute('/home', navigate)}>
          Submit
        </Button>
      </div>

    </div>
  )
}

export default CompleteVisit