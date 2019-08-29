import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import RoomDetails from './components/RoomDetails.jsx';
import Date from './components/Date.jsx';
import Guest from './components/Guest.jsx';
import Total from './components/Total.jsx';
import Reserve from './components/ReserveBtn.jsx';
import styled from 'styled-components';

const ResModule = styled.div`
  color: rgb(72, 72, 72);
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  width: 376px;
  padding-bottom: 16px;
  border: 1px rgb(228, 228, 228) solid;
  border-radius: 4px;
`
const ResInner = styled.div`
  width: 326px;
  height: 466px;
  margin: auto;
`
const ResLine = styled.div`
  width: 326px;
  height: 1px;
  background-color: rgb(235, 235, 235);
  margin-top: 16px;
  margin-bottom: 16px;
`
const ResForm = styled.form`
  width: 326px;
  height: 385px;
`
const ResChargeStatement = styled.div`
  width: 326px;
  height: 20px;
  margin-top: 8px;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
`

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resStyle: {
        float: "right",
        marginRight: "150px",
        marginTop: "52px",
        listing: {},
        booking: []
      }
    }
    this.initialData = this.getInitialData.bind(this);
  }
  componentDidMount() {
    this.initialData();
    window.addEventListener('scroll', this.onScroll.bind(this));
  }
  getInitialData() {
    axios.post('/api/reservation/search', {id: 1})
    .then((res) => {
      this.setState({
        listing: res.data.listing[0],
        booking: res.data.booking
      })
    })
    .catch((err) => {
      console.log("err")
    })
  }
  onScroll(e) {
    if (e.target.scrollingElement.scrollTop > 527 && e.target.scrollingElement.scrollTop < 1688) {
      this.setState({
        resStyle: {
          right: "158px",
          position: "fixed",
          top: "0px",
          marginTop: "52px"
        }
      })
    }
    if (e.target.scrollingElement.scrollTop < 527) {
      this.setState({
        resStyle: {
          float: "right",
          marginRight: "150px",
          marginTop: "52px"
        }
      })
    }
    if (e.target.scrollingElement.scrollTop > 1688) {
      this.setState({
        resStyle: {
          float: "right",
          marginRight: "150px",
          marginTop: "1220px"
        }
      })
    }
  }
  onSubmit(e) {
    e.preventDefault();
  }
  render() {
    return (
    <ResModule style={this.state.resStyle}>
        <ResInner >
          <RoomDetails details={this.state.listing}/>
          <ResLine />
          <ResForm onSubmit={this.onSubmit.bind(this)}>
            <Date booking={this.state.booking}/>
            <Guest details={this.state.listing}/>
            <Total details={this.state.listing}/>
            <Reserve />
            <ResChargeStatement>You won’t be charged yet</ResChargeStatement>
          </ResForm>
        </ResInner>
    </ResModule>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("res"))
//style={this.state.resStyle}
export default App;