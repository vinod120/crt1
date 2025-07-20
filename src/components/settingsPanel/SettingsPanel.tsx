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
  { name: "Night Sky", value: "#0c3e54" },
];

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
      const primaryColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--crt-primary-orange")
        .trim();
      currentColors["--crt-primary-orange"] = {
        background: primaryColor || null,
        text: "#FFFFFF",
      };
    }

    setStagedColors(currentColors);
    setInitialPanelColors(JSON.parse(JSON.stringify(currentColors)));
  }, []);

  useEffect(() => {
    if (visible) {
      loadInitialColors();
    }
  }, [visible, loadInitialColors]);

  const handleColorSwatchClick = (colorValue: string) => {
    const newChoice = { background: colorValue, text: "#FFFFFF" };
    setStagedColors({
      "--crt-primary-orange": newChoice,
    });
    document.documentElement.style.setProperty(
      "--crt-primary-orange",
      colorValue
    );
  };

  const handleSave = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stagedColors));
    setInitialPanelColors(JSON.parse(JSON.stringify(stagedColors)));
    onClose();
  };

  const handleCancel = () => {
    const initialPrimaryColor = initialPanelColors["--crt-primary-orange"];
    if (initialPrimaryColor && initialPrimaryColor.background) {
      document.documentElement.style.setProperty(
        "--crt-primary-orange",
        initialPrimaryColor.background
      );
    } else {
      document.documentElement.style.removeProperty("--crt-primary-orange");
    }
    setStagedColors(initialPanelColors);
    onClose();
  };

  const handleResetToDefaults = () => {
    const defaultColor = "#e46c09";
    document.documentElement.style.setProperty(
      "--crt-primary-orange",
      defaultColor
    );
    const defaultStaged: StagedColors = {
      "--crt-primary-orange": { background: defaultColor, text: "#FFFFFF" },
    };
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
              Choose your primary theme color, that will main color, of siderbar, text, border right which we have on the left side and, button color, etc...
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
        </Space>
      </SimpleBarScroll>
    </Drawer>
  );
};

export default SettingsPanel;