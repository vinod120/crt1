import SimpleBarScroll from "@/scrollbar/SimpleBarScroll";
import { Button, Drawer, Space, Tooltip, Typography } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { LiaCheckDoubleSolid } from "react-icons/lia";
import "./SettingsPanel.css";

const { Title } = Typography;

interface SettingsPanelProps {
  visible: boolean;
  onClose: () => void;
}

interface ColorChoice {
  background: string | null;
  text: string | null;
}

interface StagedColors {
  [variableName: string]: ColorChoice;
}

const LOCAL_STORAGE_KEY = "crtCustomThemeSettings";

const presetColors = [
  { name: "Orange", value: "#e46c09" },
  { name: "Teal", value: "#2a838a" },
  { name: "Light Blue", value: "#74cee2" },
  { name: "Cornflower", value: "#71a0cb" },
  { name: "Green", value: "#00a585" },
  { name: "Mint", value: "#7cccbf" },
  { name: "Dark Grey", value: "#595959" },
  { name: "Night Sky", value: "#0c3e54" }
];

const colorSections = [
  {
    key: "header",
    label: "Header",
    bgVariableName: "--crt-header-background",
    textVariableName: "--crt-header-color",
  },
  {
    key: "sidebar",
    label: "Sidebar",
    bgVariableName: "--crt-sidebar-main-background",
    textVariableName: "--crt-sidebar-main-color",
  },
  {
    key: "logoHeader",
    label: "Header Logo",
    bgVariableName: "--crt-sidebar-header-background",
    textVariableName: "--crt-sidebar-header-main-active-color",
  },
];

const getDefaultColorChoice = (): ColorChoice => ({
  background: null,
  text: null,
});

const SettingsPanel: React.FC<SettingsPanelProps> = ({ visible, onClose }) => {
  const [stagedColors, setStagedColors] = useState<StagedColors>({});
  const [initialPanelColors, setInitialPanelColors] = useState<StagedColors>({});

  const loadInitialColors = useCallback(() => {
    let currentColors: StagedColors = {};
    const savedSettings = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedSettings) {
      try {
        currentColors = JSON.parse(savedSettings);
      } catch (e) {
        console.error("Failed to parse saved theme settings:", e);
      }
    } else if (typeof window !== "undefined") {
      const customColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--crt-primary-orange")
        .trim();
      currentColors["--crt-primary-orange"] = {
        background: customColor || null,
        text: "#FFFFFF",
      };
      colorSections.forEach((section) => {
        const bg =
          document.documentElement.style.getPropertyValue(section.bgVariableName).trim() ||
          getComputedStyle(document.documentElement).getPropertyValue(section.bgVariableName).trim();
        const text =
          document.documentElement.style.getPropertyValue(section.textVariableName).trim() ||
          getComputedStyle(document.documentElement).getPropertyValue(section.textVariableName).trim();
        currentColors[section.bgVariableName] = {
          background: bg || null,
          text: text || null,
        };
      });
    }
    setStagedColors(currentColors);
    setInitialPanelColors(JSON.parse(JSON.stringify(currentColors)));
  }, []);

  useEffect(() => {
    if (visible) {
      loadInitialColors();
    }
  }, [visible, loadInitialColors]);

  const handleColorSwatchClick = (
    colorValue: string,
    bgVariableName: string = '--crt-primary-orange'
  ) => {
    const newChoice = { background: colorValue, text: "#FFFFFF" };
    setStagedColors((prev) => ({
      ...prev,
      [bgVariableName]: newChoice,
    }));

    document.documentElement.style.setProperty(bgVariableName, newChoice.background);
  };

  const handleSave = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stagedColors));
    setInitialPanelColors(JSON.parse(JSON.stringify(stagedColors)));
    onClose();
  };

  const handleCancel = () => {
    Object.keys(initialPanelColors).forEach((bgVariableKey) => {
      const choice = initialPanelColors[bgVariableKey];
      const section = colorSections.find((s) => s.bgVariableName === bgVariableKey);

      if (section) {
        if (choice && choice.background) {
          document.documentElement.style.setProperty(section.bgVariableName, choice.background);
          if (choice.text) {
            document.documentElement.style.setProperty(section.textVariableName, choice.text);
          } else {
            document.documentElement.style.removeProperty(section.textVariableName);
          }
        } else {
          document.documentElement.style.removeProperty(section.bgVariableName);
          document.documentElement.style.removeProperty(section.textVariableName);
        }
      } else {
        if (choice && choice.background) {
          document.documentElement.style.setProperty(bgVariableKey, choice.background);
        } else {
          document.documentElement.style.removeProperty(bgVariableKey);
        }
      }
    });

    setStagedColors(initialPanelColors);
    onClose();
  };

  const handleResetToDefaults = () => {
    const defaultStaged: StagedColors = {};
    document.documentElement.style.removeProperty('--crt-primary-orange');
    defaultStaged['--crt-primary-orange'] = getDefaultColorChoice();
    colorSections.forEach((section) => {
      document.documentElement.style.removeProperty(section.bgVariableName);
      document.documentElement.style.removeProperty(section.textVariableName);
      defaultStaged[section.bgVariableName] = getDefaultColorChoice();
    });
    setStagedColors(defaultStaged);
    setInitialPanelColors(JSON.parse(JSON.stringify(defaultStaged)));
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-theme"
        ) {
          const savedSettings = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (!savedSettings) {
            loadInitialColors();
          }
          break;
        }
      }
    });
    if (typeof window !== "undefined") {
      observer.observe(document.body, { attributes: true });
    }
    return () => {
      observer.disconnect();
    };
  }, [loadInitialColors]);

  const renderSettingPanelHeader = () => {
    return (
      <Space style={{ width: "100%", justifyContent: "space-between" }}>
        <Title level={4} style={{ margin: 0 }} className="crt-settings-panel-title">
          Settings
        </Title>
        <Button
          onClick={handleResetToDefaults}
          className="crt-reset-button"
        >
          Reset
        </Button>
      </Space>
    );
  };

  return (
    <Drawer
      title={renderSettingPanelHeader()}
      placement="right"
      onClose={handleCancel}
      className="crt-settings-panel"
      open={visible}
      width={320}
      style={{ overflow: "hidden" }}
      styles={{ body: { padding: 0, overflow: 'hidden' } }}
      footer={
        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button className="crt-setting-panel-save-button" onClick={handleSave}>
            Save
          </Button>
        </Space>
      }
    >
      <SimpleBarScroll style={{ height: "calc(100vh - 134px)", padding: 16 }}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div className="crt-color-swatches">
            <Title level={5} className="crt-settings-panel-section-title">
              Custom Theme
            </Title>
            <p className="crt-setting-panel-sub-section">
              Choose your primary theme color
            </p>
            <Space wrap>
              {presetColors.map((color) => {
                const isSelected = stagedColors['--crt-primary-orange']?.background === color.value;
                return (
                  <Tooltip title={color.name} key={color.value}>
                    <Button
                      className={`color-swatch ${isSelected ? "active" : ""}`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => handleColorSwatchClick(color.value)}
                    >
                      {isSelected && (
                        <LiaCheckDoubleSolid
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            color: "#FFFFFF",
                            fontSize: "16px",
                            zIndex: 2,
                          }}
                        />
                      )}
                    </Button>
                  </Tooltip>
                );
              })}
            </Space>
          </div>
          {colorSections?.map((section) => (
            <div key={section.key} className="crt-color-swatches">
              <Title level={5} className="crt-settings-panel-section-title">
                {section.label} Theme
              </Title>
              <p className="crt-setting-panel-sub-section">{`Choose your ${section.label} theme color`}</p>
              <Space wrap>
                {presetColors.map((color) => {
                  const currentChoice =
                    stagedColors[section.bgVariableName] || getDefaultColorChoice();
                  const isActive = currentChoice.background === color.value;
                  return (
                    <Tooltip title={color.name} key={color.value}>
                      <Button
                        className={`color-swatch ${isActive ? "active" : ""}`}
                        style={{
                          backgroundColor: color.value,
                        }}
                        onClick={() =>
                          handleColorSwatchClick(section.bgVariableName, color.value)
                        }
                        aria-label={`Set ${section.label} to ${color.name}${
                          isActive ? " (active)" : ""
                        }`}
                      >
                        {isActive && (
                          <LiaCheckDoubleSolid
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              color: "#FFFFFF",
                              fontSize: "16px",
                              zIndex: 2,
                            }}
                          />
                        )}
                      </Button>
                    </Tooltip>
                  );
                })}
              </Space>
            </div>
          ))}
        </Space>
      </SimpleBarScroll>
    </Drawer>
  );
};

export default SettingsPanel;