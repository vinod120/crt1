import BackBtn from "@/components/backBtn/BackBtn";
import RefreshBtn from "@/components/refreshBtn/RefreshBtn";
import { Result, Typography } from 'antd';
import React from 'react';
import { FaRegCircleXmark } from "react-icons/fa6";

const { Paragraph, Text } = Typography;

const Error400Page: React.FC = () => {
  return (
    <Result
      status="error"
      title="400"
      subTitle="Bad request. The request could not be understood by the server due to malformed syntax. The client should not repeat the request without modifications"
      extra={[<BackBtn type="primary" key="back" />, <RefreshBtn key="refresh" />]}
    >
      <div className="desc">
        <Paragraph>
          <Text
            strong
            style={{
              fontSize: 16,
            }}
          >
            The content you submitted has the following error:
          </Text>
        </Paragraph>
        <Paragraph>
          <FaRegCircleXmark style={{ color: 'red' }} />
          &nbsp;Bad Request - Invalid URL&nbsp;
          <a href="/">Forward error &gt;</a>
        </Paragraph>
        <Paragraph>
          <FaRegCircleXmark style={{ color: 'red' }} />
          &nbsp;Bad Request. Your browser sent a request that this server could
          not understand&nbsp;
          <a href="/">Go to console &gt;</a>
        </Paragraph>
      </div>
    </Result>
  );
};

export default Error400Page;