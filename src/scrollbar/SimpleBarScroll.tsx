import { CSSProperties, FC, ReactNode } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import SimpleBar from 'simplebar-react';
import "./ScrollBar.css";

interface SimpleBarScrollProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
}

const SimpleBarScroll: FC<SimpleBarScrollProps> = ({ children, className, style, ...other }) => {
  return (
    <>
      <BrowserView style={{ flexGrow: 1, height: '100%', overflow: 'hidden' }}>
        <SimpleBar clickOnTrack={false} style={{ maxHeight: '100%', ...style }} className={className} {...other}>
          {children}
        </SimpleBar>
      </BrowserView>
      <MobileView>
        <div style={{ overflowX: 'auto', ...style }} className={className} {...other}>
          {children}
        </div>
      </MobileView>
    </>
  );
};

export default SimpleBarScroll;