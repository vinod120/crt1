import BackBtn from "@/components/backBtn/BackBtn";
import RefreshBtn from "@/components/refreshBtn/RefreshBtn";
import { Result, Typography } from 'antd';
import React from 'react';
import { useRouteError } from 'react-router-dom';
import { RouteError } from "./types";

const { Paragraph, Text } = Typography;

const ErrorPage: React.FC = () => {
  const error = useRouteError() as RouteError;
  return (
    <Result
      status="error"
      title="Oops!"
      subTitle="Sorry, an unexpected error has occurred."
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
            The page you tried to open has the following error:
          </Text>
        </Paragraph>
        <Paragraph copyable>{error?.statusText || error?.message}</Paragraph>
      </div>
    </Result>
  );
};

export default ErrorPage;