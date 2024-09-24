import { Button, Divider } from 'antd'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.css'
import { getSeniorByIdData, getVisitByIdData } from '../../api';
import { SeniorInterface, VisitInterface, VisitStatus } from '../../models/interfaces';
import { VisitCard } from '../../components/Card/VisitCard';
import { HeartOutlined, DislikeOutlined, MessageOutlined, CalendarOutlined, EnvironmentTwoTone, FrownTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
import { handleCancelVisit, handleCheckInVisit, handleCompleteVisit, navigateToRoute } from '../../components/utils';
import { APIProvider } from '@vis.gl/react-google-maps';
import CustomMap from '../Home/components/Map/Map';

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

  const googleDirectionsLink = (origin: google.maps.LatLngLiteral, destination: google.maps.LatLngLiteral) => `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}`

  return (
    <div className={'container'}>
      <div className={'header'} style={{ marginBottom: 0 }}>
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
                {(visit.status === VisitStatus.UPCOMING || visit.status === VisitStatus.ONGOING) && <>
                  <div className='map'>
                    <APIProvider
                      apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                      onLoad={() => console.log('maps api 2 has loaded')}
                    >
                      <CustomMap
                        locations={[senior]}
                        defaultCenter={{ lat: senior.lat, lng: senior.lon }}
                        showDirections={true}
                        defaultZoom={15}
                        hideDetails={true}
                      />

                    </APIProvider>
                  </div>
                  <Button>
                    <a
                      style={{fontWeight: 400}}
                      target="_blank" rel="noopener noreferrer"
                      href={googleDirectionsLink({ lat: senior.lat, lng: senior.lon }, { lat: senior.lat, lng: senior.lon })} >
                      Get Directions  <EnvironmentTwoTone />
                    </a>
                  </Button>
                </>}

                <div >
                  {visit.status === VisitStatus.UPCOMING &&
                    <>
                      <Button className={'cancelBtn'} onClick={() => handleCheckInVisit(visit)}>
                        Check In <CheckCircleTwoTone twoToneColor={'#faad14'} />
                      </Button>
                      <Button className={'cancelBtn'} onClick={() => handleCancelVisit(visit)}>
                        Cancel Visit <FrownTwoTone twoToneColor="#eb2f96" />
                      </Button>
                    </>}
                  {visit.status === VisitStatus.ONGOING && <Button className={'cancelBtn'} onClick={() => handleCompleteVisit(visit, navigate)}>
                    Mark as Completed <CheckCircleTwoTone twoToneColor="#52c41a" />
                  </Button>}
                </div>

                <Divider style={{ margin: '0.5rem' }} />

                <div className={'sectionHeader'}>
                  <h3>About the senior</h3>
                </div>

                {seniorProfileAttributes}

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