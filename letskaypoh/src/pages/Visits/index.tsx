import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './styles.css'
import { navigateToRoute } from '../../components/utils';
import { VisitCard } from '../../components/Card/VisitCard';
import { getAllVisitsData } from '../../api';
import { VisitInterface, VisitStatus } from '../../models/interfaces';

const Visits = () => {
  const navigate = useNavigate();

   // add api endpoint - get upcoming visits
   const [visits, setVisits] = useState<VisitInterface[] | []>([]);
   const [loading, setLoading] = useState<boolean>(false);

   useEffect(() => {
      setLoading(true)
       const fetchData = async () => {
           try {
               const visitsData = await getAllVisitsData();
               setVisits(visitsData);
           } catch (error) {
               console.error("Error fetching visit data:", error);
           }
       };
       fetchData();
       setLoading(false)
   }, [])

  const visitCards = visits.map((visit) => {
    return <VisitCard 
      key={visit.visit_id}
      visit={visit}
      cancellable={true}
    />
  })

  // add api endpoint - get upcoming  - filter by upcoming
  const [upcomingVisits, setUpcomingVisits] = useState<VisitInterface[] | []>([])

  useEffect(() => {
    const fetchData = async () => {
        try {
            const visitsData = await getAllVisitsData();
            setUpcomingVisits(visitsData.filter((visit: VisitInterface) => visit.status == VisitStatus.UPCOMING));
        } catch (error) {
            console.error("Error fetching visit data:", error);
        }
    };

    fetchData();
}, [])

  return (
    <div className={'container'}>
      <div className={'header'}>
        <h1>let's kaypoh!</h1>
        <h3>Upcoming Visits</h3>
      </div>
      <div className={'visits'}>
        {
          loading ? 'Loading...' :
          upcomingVisits.length === 0 ? <>
            <p>
              You have no upcoming visits.
            </p>
            <div className={'buttons'}>
              <Button onClick={() => navigateToRoute('/home', navigate)}>
                Explore
              </Button>
            </div>
          </> : visitCards.reverse()
        }
        
      </div>
    </div>
  )
}

export default Visits