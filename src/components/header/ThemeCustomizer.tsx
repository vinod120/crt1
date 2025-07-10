import React, { useCallback, useEffect, useState } from 'react';
import { ColorPicker, Typography, Space } from 'antd';
import type { Color } from 'antd/es/color-picker';

const { Title } = Typography;

interface ColorSetting {
  label: string;
  variableName: string;
}

const colorSettings: ColorSetting[] = [
  { label: 'Sidebar', variableName: '--crt-sidebar-background' },
  { label: 'Header', variableName: '--crt-header-background' },
  { label: 'Logo Header', variableName: '--crt-sidebar-header-background' },
];

const getInitialColor = (variableName: string): string => {
  if (typeof window !== 'undefined') {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
  }
  return '#ffffff'; // Default fallback if not in browser
};

const ThemeCustomizer: React.FC = () => {
  // State to hold the current color values for the pickers
  const [pickerColors, setPickerColors] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    colorSettings.forEach(setting => {
      initial[setting.variableName] = getInitialColor(setting.variableName);
    });
    return initial;
  });

  // Effect to update picker colors if the theme changes externally
  useEffect(() => {
    const updateColorsFromCSS = () => {
      const newPickerColors: Record<string, string> = {};
      let changed = false;
      colorSettings.forEach(setting => {
        const currentColor = getInitialColor(setting.variableName);
        if (pickerColors[setting.variableName] !== currentColor) {
          changed = true;
        }
        newPickerColors[setting.variableName] = currentColor;
      });
      if (changed) {
        setPickerColors(newPickerColors);
      }
    };

    // Listen for changes on data-theme attribute of body
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          // Theme has changed, re-fetch colors after a short delay to allow CSS to apply
          setTimeout(updateColorsFromCSS, 50);
          break;
        }
      }
    });

    if (typeof window !== 'undefined') {
      observer.observe(document.body, { attributes: true });
    }

    return () => {
      observer.disconnect();
    };
  }, [pickerColors]); // Rerun if pickerColors changes to ensure consistency

  const handleColorChange = useCallback((variableName: string, color: Color | string) => {
    const colorString = typeof color === 'string' ? color : color.toHexString();
    document.documentElement.style.setProperty(variableName, colorString);
    setPickerColors(prevColors => ({
      ...prevColors,
      [variableName]: colorString,
    }));
  }, []);

  return (
    <div style={{ padding: '16px', minWidth: '250px' }}>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        {colorSettings.map((setting) => (
          <div key={setting.variableName}>
            <Title level={5} style={{ marginBottom: '8px' }}>{setting.label}</Title>
            <ColorPicker
              value={pickerColors[setting.variableName]}
              onChange={(color) => handleColorChange(setting.variableName, color)}
              showText
              style={{ width: '100%' }}
            />
          </div>
        ))}
      </Space>
    </div>
  );
};

export default ThemeCustomizer;
