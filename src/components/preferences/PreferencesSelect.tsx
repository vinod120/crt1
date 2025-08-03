import { Select, SelectProps, Tag } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { PreferencesSelectProps } from "./types";

type TagRender = SelectProps['tagRender'];

const colorPool = ['gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple', 'volcano', 'orange', 'magenta'];

const colorMap = new Map<string, string>();

const getColorForValue = (value: string): string => {
  if (colorMap.has(value)) return colorMap.get(value)!;

  const color = colorPool[colorMap.size % colorPool.length];
  colorMap.set(value, color);
  return color;
};

const tagRender: TagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Tag
      color={getColorForValue(String(value))}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginInlineEnd: 4 }}
    >
      {label}
    </Tag>
  );
};

const PreferencesSelect: React.FC<PreferencesSelectProps> = ({
  label,
  options,
  value,
  onChange,
  mode,
  placeholder,
}) => {
  const normalizedOptions =
    Array.isArray(options) && typeof options[0] === 'string'
      ? (options as string[]).map(opt => ({ label: opt, value: opt }))
      : (options as { label: string; value: string }[]);

  return (
    <div style={{ marginBottom: 16 }}>
      <Title level={5} style={{ margin: 0 }}>
        {label}
      </Title>
      <Select
        mode={mode}
        allowClear
        showSearch
        tagRender={tagRender}
        style={{ width: '100%' }}
        placeholder={placeholder}
        options={normalizedOptions}
        value={value}
        onChange={onChange}
        optionFilterProp="label"
      />
    </div>
  );
};

export default PreferencesSelect;