import React, {useState, useEffect} from "react"
import RecommendList from '../Component/List/RecommendList'
import BookmarkModal from "../Component/Modal/BookmarkModal"
import OptionCard from "../Component/Card/OptionCard"
import { Spin, Card, Row, Col, Button, Alert, Typography } from "antd"
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { Actions as dataAction } from '../../store/actions/dataActions'
import { useLocation, useNavigate } from 'react-router-dom'

const { Text, Title } = Typography;

export default function Recommend () {
  const dispatch = useDispatch();
  const Location = useLocation()
  const navigate = useNavigate()
  useEffect(() => !localStorage.getItem('authToken') ? 
    navigate('/login') : 
    navigate('/Recommended')
, []);
  const [isBookmarkModalOpen, setIsRecommendationModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(<></>);
  const [wrongCount, setWrongCount] = useState(0);
  const closeBookmarkModal = () => {setIsRecommendationModalOpen(false)};
  const [listContent, setListContent] = useState([]);
  const [problemNumber, setProblemNumber] = useState(1); 
  const MAX_PROBLEM = 50;

  const wrongNum = [];
  for(let i = 0; i <= 10; i++) {
    wrongNum.push({ value: i, label: i, })
  }
  const problemNum = [];
  for(let i = 1; i <= MAX_PROBLEM; i++) {
    problemNum.push({ value: i, label: i, })
  }

  const { data, isLoading } = useSelector((state) => {
    let data = state.data;
    let isLoading = state.data.loadingData

    return { 
      data: data ? data : undefined, 
      isLoading: isLoading
    }
  }, shallowEqual)

  let pathSnippets = Location.pathname.split('/')
  pathSnippets = pathSnippets.filter((i) => i)
  
  useEffect(()=> {
    pathSnippets[0] !== 'Recommended' && setIsDataClicked(false)
  }, [pathSnippets])

  const [isDataClicked, setIsDataClicked] = useState(false); 
  const onSubmitClicked = () => {
    console.log('getQuestion called in ProblemList')
    dispatch(dataAction.getQuestions({
      userEmail: localStorage.getItem('userEmail'),
      questionNumber: problemNumber,
      difficulty: [1, 2, 3],
      timezone: [1, 2, 3],
      paper: [1, 2, 3],
      chapter: [1,2,3,4,5,6,7,8,9,10,11,12],
      wrong: parseInt(wrongCount[0]),
    }))
    setIsDataClicked(true) 
  }

  useEffect(() => {
    console.log("Data! which is ", data);
    (data && isDataClicked === true) ? setListContent(data.data) : setListContent([])
  }, [data, isDataClicked])

  const style={margin: 10}

    return (
      <>
      <Row span={24}>
          <Col span={24}>
            <div
              style={{
                justifyContent: 'center',
                display: 'flex'
              }}
            >
              <div
                style={{
                  backgroundColor: '#d0e2f3',
                  padding: '5px 50px',
                  fontWeight: 'bold',
                  fontSize: 20,
                  borderRadius: 5,
                  marginBottom: 50
                }}
              >
                Instruction
              </div>
            </div>
            <div
              style={{
                justifyContent: 'center',
                display: 'flex',
                fontSize: 20,
                marginBottom: 80
              }}
            >
              Questions with wrong count higher than the input will be shown.
            </div>
          </Col>
        </Row>
        <Row span={24} justify={'space-around'} align={'center'}
          style={{
            borderBottom: '1px solid #f0f0f0',
            paddingBottom: 50
          }}
        >
          <Col span={6} style={style}>
            <OptionCard useSwitch={false} items={problemNum} title={'Problem Number'} update={setProblemNumber} isSingleSelect={true}/>
          </Col>
          <Col span={6} style={style}>
            <OptionCard useSwitch={false} items={wrongNum} title={'Wrongs'} update={setWrongCount} isSingleSelect={true}/>
          </Col>
          <Col 
            span={6} 
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Button 
              onClick={onSubmitClicked}
              size="large"
            >
              Submit
            </Button>
          </Col>
        </Row>
      <Row span={24}>
        <Col span={24}>
          { isLoading ? 
          <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 100
          }}
        >
            <Spin/>
          </div>
           : <>
            <RecommendList onItemClicked={()=>setIsRecommendationModalOpen(true)} setModalContent={setModalContent} listContent = {listContent}/>
            <BookmarkModal open={isBookmarkModalOpen} onClosed={closeBookmarkModal} modalContent = {modalContent}/>
          </>}
        </Col>
      </Row>
    
      </>
    )
}