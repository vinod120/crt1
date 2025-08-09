import { RootState } from "@/store";
import { removeTag, setActiveTag } from "@/store/slices/tagsViewSlice";
import { Tabs } from 'antd';
import type { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './TagsView.css';


const TagsView: FC = () => {
  const { tags, activeTagId } = useSelector((state: RootState) => state?.tagsView);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onChange = (key: string) => {
    console.log("key", key)
    dispatch(setActiveTag(key));
    navigate(key);
  };

  const onClose = (targetKey: string) => {
    dispatch(removeTag(targetKey));
    if (targetKey === activeTagId && tags?.length > 1) {
      const newActiveTag = tags  && tags?.length > 0 && tags?.find((tag: any) => tag?.path !== targetKey);
      if (newActiveTag) {
        navigate(newActiveTag.path);
      }
    }
  };

  return (
    <div id="pageTabs" className="page-tabs">
      <Tabs
        onChange={onChange}
        activeKey={activeTagId}
        type="editable-card"
        hideAdd
        onEdit={(targetKey, action) => {
          if (action === 'remove' && typeof targetKey === 'string') {
            onClose(targetKey);
          }
        }}
       items={(tags && tags?.length > 0) ? tags?.map((tag: any) => {
        return {
          key: tag?.path,
          closable: tag?.closable,
          label: (
            <div className="tag-view-label">
              <div>{tag?.label}</div>
              <div className="tag-view-date">
                {tag?.studyStartDate}
              </div>
            </div>
          ),
        };
      }) : []}
      />
    </div>
  );
};

export default TagsView;