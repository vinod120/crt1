import React, { useState, useEffect, useCallback } from 'react';
import { Drawer, Typography, Button, Space, Divider, Tooltip } from 'antd'; // Added Tooltip
import './SettingsPanel.css';

const { Title } = Typography;

interface SettingsPanelProps {
  visible: boolean;
  onClose: () => void;
}

interface ColorChoice {
  background: string | null;
  text: string | null; // Expected to be '#FFFFFF' or null
}

interface StagedColors {
  [variableName: string]: ColorChoice;
}

const LOCAL_STORAGE_KEY = 'crtCustomThemeSettings';

const presetColors = [
  { name: 'Primary', value: '#04a9f5' },
  { name: 'Blue', value: '#1677ff' },
  { name: 'Purple', value: '#722ED1' },
  { name: 'Green', value: '#52C41A' },
  { name: 'Red', value: '#F5222D' },
  { name: 'Orange', value: '#FA8C16' },
  { name: 'Dark Grey', value: '#595959' },
  { name: 'Teal', value: '#13c2c2' },
];

const colorSections = [
  {
    key: 'header',
    label: 'Header Color',
    bgVariableName: '--crt-header-background',
    textVariableName: '--crt-header-color',
  },
  {
    key: 'sidebar',
    label: 'Sidebar Color',
    bgVariableName: '--crt-sidebar-background',
    textVariableName: '--crt-sidebar-color',
  },
  {
    key: 'logoHeader',
    label: 'Logo Header Color',
    bgVariableName: '--crt-sidebar-header-background',
    textVariableName: '--crt-sidebar-header-main-active-color',
  },
];

const getDefaultColorChoice = (): ColorChoice => ({ background: null, text: null });

const SettingsPanel: React.FC<SettingsPanelProps> = ({ visible, onClose }) => {
  const [stagedColors, setStagedColors] = useState<StagedColors>({});
  const [initialPanelColors, setInitialPanelColors] = useState<StagedColors>({}); // To store state on panel open for cancel

  const loadInitialColors = useCallback(() => {
    let currentColors: StagedColors = {};
    // Try to load from localStorage first
    const savedSettings = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedSettings) {
      try {
        currentColors = JSON.parse(savedSettings);
      } catch (e) {
        console.error("Failed to parse saved theme settings:", e);
      }
    } else if (typeof window !== 'undefined') {
      // If no localStorage, initialize from current live CSS (inline or computed)
      colorSections.forEach(section => {
        const bg = document.documentElement.style.getPropertyValue(section.bgVariableName).trim() ||
                   getComputedStyle(document.documentElement).getPropertyValue(section.bgVariableName).trim();
        const text = document.documentElement.style.getPropertyValue(section.textVariableName).trim() ||
                     getComputedStyle(document.documentElement).getPropertyValue(section.textVariableName).trim();
        currentColors[section.bgVariableName] = { background: bg || null, text: text || null };
      });
    }
    setStagedColors(currentColors);
    setInitialPanelColors(JSON.parse(JSON.stringify(currentColors))); // Deep copy for cancel
  }, []);


  useEffect(() => {
    if (visible) {
      loadInitialColors();
    }
  }, [visible, loadInitialColors]);

  const handleColorSwatchClick = (bgVariableName: string, colorValue: string) => {
    const newChoice = { background: colorValue, text: '#FFFFFF' };
    setStagedColors(prev => ({
      ...prev,
      [bgVariableName]: newChoice,
    }));

    // Apply live preview
    const section = colorSections.find(s => s.bgVariableName === bgVariableName);
    if (section) {
      document.documentElement.style.setProperty(section.bgVariableName, newChoice.background);
      if (newChoice.text) { // Should always be #FFFFFF
        document.documentElement.style.setProperty(section.textVariableName, newChoice.text);
      }
    }
  };

  const handleSave = () => {
    // The styles are already live previewed by handleColorSwatchClick.
    // Save just needs to persist stagedColors to localStorage and update initialPanelColors.
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stagedColors));
    setInitialPanelColors(JSON.parse(JSON.stringify(stagedColors))); // Update baseline for "Cancel"
    onClose(); // Close panel on save
  };

  const handleCancel = () => {
    // Revert live UI to the state stored in initialPanelColors
    Object.keys(initialPanelColors).forEach(bgVariableKey => {
      const choice = initialPanelColors[bgVariableKey];
      const section = colorSections.find(s => s.bgVariableName === bgVariableKey);

      if (section) {
        if (choice && choice.background) {
          document.documentElement.style.setProperty(section.bgVariableName, choice.background);
          if (choice.text) {
            document.documentElement.style.setProperty(section.textVariableName, choice.text);
          } else { // Should not happen if saved correctly, but good practice
            document.documentElement.style.removeProperty(section.textVariableName);
          }
        } else {
          // If initial state for this section was "no custom color"
          document.documentElement.style.removeProperty(section.bgVariableName);
          document.documentElement.style.removeProperty(section.textVariableName);
        }
      }
    });

    setStagedColors(initialPanelColors); // Reset staged colors to match the reverted live UI
    onClose();
  };

  const handleResetToDefaults = () => {
    const defaultStaged: StagedColors = {};
    colorSections.forEach(section => {
      document.documentElement.style.removeProperty(section.bgVariableName);
      document.documentElement.style.removeProperty(section.textVariableName);
      defaultStaged[section.bgVariableName] = getDefaultColorChoice();
    });
    setStagedColors(defaultStaged);
    setInitialPanelColors(JSON.parse(JSON.stringify(defaultStaged)));
    localStorage.removeItem(LOCAL_STORAGE_KEY);
     // console.log('Colors Reset to Theme Defaults and Saved Settings Cleared');
  };

  // Handle external theme changes (light/dark mode)
   useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          // If theme changes, and if there are no saved custom settings,
          // we might want to update stagedColors to reflect the new theme's computed styles.
          // However, if there ARE saved/staged settings, they should take precedence.
          // This logic can get complex. For now, prioritize explicit user choices.
          // A full refresh of stagedColors from computed styles might be needed if no localStorage.
          const savedSettings = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (!savedSettings) { // Only if no custom settings are saved
             loadInitialColors(); // Re-evaluate based on new theme's computed styles
          }
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
  }, [loadInitialColors]); // loadInitialColors is stable due to useCallback

  return (
    <Drawer
      title="Theme Customizer"
      placement="right"
      onClose={handleCancel} // Use handleCancel for drawer's native close
      open={visible}
      width={320}
      footer={
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Button onClick={handleResetToDefaults}>
            Reset & Clear Saved
          </Button>
          <Space>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Space>
        </Space>
      }
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {colorSections.map((section) => (
          <div key={section.key}>
            <Title level={5}>{section.label}</Title>
            <Space wrap>
              {presetColors.map((color) => {
                const currentChoice = stagedColors[section.bgVariableName] || getDefaultColorChoice();
                const isActive = currentChoice.background === color.value;
                return (
                  <Tooltip title={color.name} key={color.value}>
                    <Button
                      className={`color-swatch ${isActive ? 'active' : ''}`}
                      style={{ backgroundColor: color.value, width: '32px', height: '32px', minWidth: '32px' }}
                      onClick={() => handleColorSwatchClick(section.bgVariableName, color.value)}
                      aria-label={`Set ${section.label} to ${color.name}${isActive ? ' (active)' : ''}`}
                    />
                  </Tooltip>
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
