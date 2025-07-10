import React, { useState, useEffect, useCallback } from 'react';
import { Drawer, Typography, Button, Space, Divider } from 'antd';
import './SettingsPanel.css';

const { Title } = Typography;

interface SettingsPanelProps {
  visible: boolean;
  onClose: () => void;
}

const presetColors = [
  { name: 'Primary', value: '#04a9f5' }, // Assuming this is a primary theme color
  { name: 'Blue', value: '#1677ff' },
  { name: 'Purple', value: '#722ED1' },
  { name: 'Green', value: '#52C41A' },
  { name: 'Red', value: '#F5222D' },
  { name: 'Orange', value: '#FA8C16' },
  { name: 'Dark Grey', value: '#595959' },
  { name: 'Teal', value: '#13c2c2'},
];

const colorSections = [
  {
    key: 'header',
    label: 'Header Color',
    variableName: '--crt-header-background',
  },
  {
    key: 'sidebar',
    label: 'Sidebar Color',
    variableName: '--crt-sidebar-background',
  },
  {
    key: 'logoHeader',
    label: 'Logo Header Color',
    variableName: '--crt-sidebar-header-background',
  },
];

const SettingsPanel: React.FC<SettingsPanelProps> = ({ visible, onClose }) => {
  const [activeCustomColors, setActiveCustomColors] = useState<Record<string, string | null>>({});

  const getInitialActiveColors = useCallback(() => {
    const initialColors: Record<string, string | null> = {};
    if (typeof window !== 'undefined') {
      colorSections.forEach(section => {
        // Get property from inline style; if not set, it's null or empty.
        const inlineValue = document.documentElement.style.getPropertyValue(section.variableName).trim();
        initialColors[section.variableName] = inlineValue || null;
      });
    }
    setActiveCustomColors(initialColors);
  }, []);

  // Initialize active colors when the panel becomes visible or on mount
  useEffect(() => {
    if (visible) {
      getInitialActiveColors();
    }
  }, [visible, getInitialActiveColors]);

  const handleColorSwatchClick = (variableName: string, colorValue: string) => {
    document.documentElement.style.setProperty(variableName, colorValue);
    setActiveCustomColors(prev => ({ ...prev, [variableName]: colorValue }));
  };

  const handleResetColors = () => {
    const newActiveColors: Record<string, string | null> = {};
    colorSections.forEach(section => {
      document.documentElement.style.removeProperty(section.variableName);
      newActiveColors[section.variableName] = null; // Mark as no custom color applied
    });
    setActiveCustomColors(newActiveColors);
  };

  // Effect to update active colors if theme changes externally (e.g. main light/dark toggle)
  // This ensures that if a custom color was set, it remains the active one, otherwise it reflects the theme.
  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          // Theme has changed, re-evaluate active colors
          // If a custom color is set (not null in activeCustomColors), it should remain.
          // Otherwise, the element will take its color from the new theme via CSS.
          // We might need to update `activeCustomColors` if a previously overridden value
          // is now effectively "reset" by the theme change, but only if we want the UI to show it as such.
          // For now, if a user picked a color, it stays as the 'activeCustomColor' in state.
          // If they reset, it becomes null and will reflect theme.
          // This behavior means custom choices persist over theme changes.

          // To ensure swatches correctly reflect non-overridden theme colors
          // when no custom color is set for a section:
          const updatedColors: Record<string, string | null> = { ...activeCustomColors };
          let changed = false;
          colorSections.forEach(section => {
            if (activeCustomColors[section.variableName] === null) { // Only if not actively customized
              const currentThemeColor = getComputedStyle(document.documentElement).getPropertyValue(section.variableName).trim();
              // This part is tricky: we don't want to set it as an *active custom color*
              // but the swatch UI might need to know what the base theme color is.
              // For simplicity, the active state is only for user-picked swatches.
              // If null, no swatch is 'active'.
            }
          });
           // If we wanted swatches to highlight the current computed color even if not custom:
           // This would require a more complex state or prop drilling.
           // For now, only explicitly set custom colors are "active" in the swatch UI.
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
  }, [activeCustomColors]); // Re-check activeCustomColors as it's part of the logic

  return (
    <Drawer
      title="Theme Customizer"
      placement="right"
      onClose={onClose}
      open={visible}
      width={320}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button onClick={handleResetColors}>
            Reset All Custom Colors
          </Button>
        </div>
      }
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {colorSections.map((section) => (
          <div key={section.key}>
            <Title level={5}>{section.label}</Title>
            <Space wrap>
              {presetColors.map((color) => {
                const isActive = activeCustomColors[section.variableName] === color.value;
                return (
                  <Button
                    key={color.value}
                    className={`color-swatch ${isActive ? 'active' : ''}`}
                    style={{ backgroundColor: color.value, width: '32px', height: '32px', minWidth: '32px' }}
                    onClick={() => handleColorSwatchClick(section.variableName, color.value)}
                    aria-label={`Set ${section.label} to ${color.name}${isActive ? ' (active)' : ''}`}
                  />
                );
              })}
            </Space>
            <Divider style={{ margin: '16px 0' }}/>
          </div>
        ))}
      </Space>
    </Drawer>
  );
};

export default SettingsPanel;
