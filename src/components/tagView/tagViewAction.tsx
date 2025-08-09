import { RootState } from "@/store";
import { addTag, removeAllTag, removeOtherTag, removeTag } from "@/store/slices/tagsViewSlice";
import { SettingOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import type { FC } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const TagsViewAction: FC = () => {
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { activeTagId, tags } = useAppSelector(state => state.tagsView);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Dropdown
      menu={{
        items: [
          {
            key: '0',
            onClick: () => {
              dispatch(removeTag(activeTagId));
              const remainingTags = tags.filter(tag => tag.path !== activeTagId);
              if (remainingTags.length > 0) {
                navigate(remainingTags[remainingTags.length - 1].path);
              }
            },
            label: 'Close Current Tag',
          },
          {
            key: '1',
            onClick: () => {
              dispatch(removeOtherTag());
              navigate(activeTagId);
            },
            label: 'Close Other Tags',
          },
          {
            key: '2',
            onClick: () => {
              dispatch(removeAllTag());
              navigate(tags[0].path);
            },
            label: 'Close All Tags',
          },
          {
            key: '3',
            type: 'divider',
          },
          {
            key: '4',
            label: <Link to="/">Home</Link>,
            onClick: () => {
              dispatch(
                addTag({
                  path: '/',
                  label: 'Home',
                  closable: false,
                  tags: [],
                }),
              );
            },
          },
        ],
      }}
    >
      <span id="pageTabs-actions">
        <SettingOutlined className="tagsView-extra" />
      </span>
    </Dropdown>
  );
};

export default TagsViewAction;