import React, { useEffect } from "react"; // Added React and useEffect
import { ConfigProvider, theme } from "antd";
import { useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import AppLayout from "./layout/appLayout";
import { RootState } from "./store";

// Definitions needed for applying styles (could be imported from a shared constants file)
const LOCAL_STORAGE_KEY = 'crtCustomThemeSettings';

interface ColorChoice {
  background: string | null;
  text: string | null;
}

interface StoredSettings {
  [variableName: string]: ColorChoice;
}

// Simplified version for applying styles; original in SettingsPanel defines more for UI
const persistenceColorSections = [
  {
    bgVariableName: '--crt-header-background',
    textVariableName: '--crt-header-color',
  },
  {
    bgVariableName: '--crt-sidebar-background',
    textVariableName: '--crt-sidebar-color',
  },
  {
    bgVariableName: '--crt-sidebar-header-background',
    textVariableName: '--crt-sidebar-header-main-active-color',
  },
];


const App = () => {
  const themeType = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    const applyPersistedThemeSettings = () => {
      const savedSettingsRaw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedSettingsRaw) {
        try {
          const savedSettings: StoredSettings = JSON.parse(savedSettingsRaw);

          persistenceColorSections.forEach(sectionInfo => {
            const settingKey = sectionInfo.bgVariableName; // Settings are stored by bgVariable name
            const choice = savedSettings[settingKey];

            if (choice && choice.background) {
              document.documentElement.style.setProperty(sectionInfo.bgVariableName, choice.background);
              if (choice.text) { // Should be '#FFFFFF' if background was set
                document.documentElement.style.setProperty(sectionInfo.textVariableName, choice.text);
              }
            } else {
              // If a setting for a section was explicitly nullified or is missing after being saved previously,
              // ensure its properties are removed to revert to theme defaults.
              // This case might be less common if saving only occurs for actual choices.
              document.documentElement.style.removeProperty(sectionInfo.bgVariableName);
              document.documentElement.style.removeProperty(sectionInfo.textVariableName);
            }
          });
        } catch (e) {
          console.error("Failed to apply persisted theme settings:", e);
          // Potentially clear the corrupt localStorage item
          // localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
      }
    };

    applyPersistedThemeSettings();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <ConfigProvider
      theme={{
        algorithm:
          themeType === "light" ? theme.defaultAlgorithm : theme.darkAlgorithm,
      }}
    >
      <div className="app-container">
        <Router>
          <AppLayout />
        </Router>
      </div>
    </ConfigProvider>
  );
};

export default App;
