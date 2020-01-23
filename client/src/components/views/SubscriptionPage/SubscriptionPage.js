import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import { Card, Icon, Avatar, Col, Typography, Row } from "antd";
import moment from "moment";
import Axios from "axios";
const { Title } = Typography;
const { Meta } = Card;

function SubscriptionPage() {
  const [Video, setVideo] = useState([]);
  useEffect(() => {
    const subscriptionVariables = {
      userFrom: localStorage.getItem("userId")
    };
    Axios.post("/api/video/getSubscriptionVideos", subscriptionVariables).then(
      response => {
        if (response.data.success) {
          console.log(response.data);
          setVideo(response.data.videos);
        } else {
          alert("비디오를 가져오는데 실패하였습니다.");
        }
      }
    );
  }, []);
  const renderCards = Video.map((video, index) => {
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <a href={`/video/${video._id}`}>
            <img
              style={{ width: "100%" }}
              src={`http://localhost:5000/${video.thumbnail}`}
              alt="thumbnail"
            />
            <div className="duration">
              <span>
                {minutes} : {seconds}
              </span>
            </div>
          </a>
        </div>
        <br />
        <Meta
          avatar={<Avatar src={video.writer.image} />}
          title={video.title}
          description=""
        />
        <span>{video.writer.name} </span> <br />
        <span style={{ marginLeft: "3rem" }}>{video.views} views </span> -
        <span>{moment(video.createdAt).format("MMM Do YY")}</span> <br />
      </Col>
    );
  });
  return (
    // <>
    // <div className="app">
    //     <FaCode style={{ fontSize: '4rem' }} /><br />
    //     <span style={{ fontSize: '2rem' }}>Let's Start Coding!</span>
    // </div>
    // <div style={{ float:'right' }}>Thanks For Using This Boiler Plate by John Ahn</div>
    // </>
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}> 맞춤 동영상</Title>
      <hr />
      <Row gutter={[32, 16]}>{renderCards}</Row>
    </div>
  );
}

export default SubscriptionPage;
