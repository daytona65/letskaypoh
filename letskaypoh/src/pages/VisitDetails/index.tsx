import { Button, Divider } from 'antd'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.css'
import { getSeniorByIdData, getVisitByIdData } from '../../api';
import { SeniorInterface, VisitInterface} from '../../models/interfaces';
import { VisitCard } from '../../components/Card/VisitCard';
import { HeartOutlined, DislikeOutlined, MessageOutlined, CalendarOutlined } from '@ant-design/icons';
import { navigateToRoute } from '../../components/utils';

interface profileItem {
  key: React.Key
  label: string
  icon: JSX.Element
  children: JSX.Element
}

const VisitDetails = () => {
  const token = localStorage.getItem('access_token');
  const navigate = useNavigate();
  if (!token) {
      navigateToRoute('/', navigate)
  }
  const visitId = Number(useLocation().pathname.split("/")[2]);

  // add api endpoint - get visit
  const [visit, setVisit] = useState<VisitInterface>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const visitData = await getVisitByIdData(visitId);
        setVisit(visitData);
        console.log(visitData)
      } catch (error) {
        console.error("Error fetching visit data:", error);
      }
    };
    fetchData();
    setLoading(false)
  }, [visitId])

  const [senior, setSenior] = useState<SeniorInterface | null>(null);

  useEffect(() => {
    if (visit) {
      const fetchData = async () => {
        try {
          const seniorData = await getSeniorByIdData(visit.senior_id);
          setSenior(seniorData);
        } catch (error) {
          console.error("Error fetching senior data:", error);
        }
      };

      fetchData();
    }
  }, [visit])

  const seniorProfileItems: profileItem[] = senior ? [
    {
      key: 'likes',
      label: 'Story',
      icon: <HeartOutlined />,
      children: <span>{senior.story}</span>
    },
    {
      key: 'dislikes',
      label: 'Dislikes',
      icon: <DislikeOutlined />,
      children: <span>{senior.dislikes}</span>
    },
    {
      key: 'social',
      label: 'Social',
      icon: <MessageOutlined />,
      children: <span>{senior.social}</span>
    },
    {
      key: 'lastVisited',
      label: 'Last Visited Date',
      icon: <CalendarOutlined />,
      children: <span>{senior.last_visited_date}</span>
    }
  ] : []

  const seniorProfileAttributes = seniorProfileItems.map((attr) => {
    return (
      <>
        <div key={attr.key} className={'seniorProfileDetail'}>
          <span>{attr.icon} <h4>{attr.label}</h4></span>
          {attr.children}
        </div>
        <Divider style={{ margin: '0.5rem' }} />
      </>
    )
  })

  return (
    <div className={'container'}>
      <div className={'header'}>
        <h1>let's kaypoh!</h1>
        <h3>Visit Details</h3>
      </div>
      {
        loading ? <div>Loading...</div> :

          (senior && visit) ?

            <div className={'visits'}>
              <div className='visitInfo'>
                <VisitCard 
                  visit={visit} 
                  cancellable={false}
                />

                <Divider style={{ margin: '0.5rem' }} />

                <div className={'sectionHeader'}>
                  <h3>About the senior</h3>
                </div>

                {seniorProfileAttributes}

                <div className={'sectionHeader'}>
                  <h3>Getting there</h3>
                      // map
                // copy address
                // get directions
                </div>


                <Divider style={{ margin: '0.5rem' }} />

                <div className={'sectionHeader'}>
                  <h3>Visitors</h3>
                </div>

                <Button onClick={() => navigateToRoute('/visits', navigate)}>
                  Back to Visits
                </Button>

              </div>
            </div>
            : <div>Loading...</div>
      }
    </div>
  )
}

export default VisitDetails