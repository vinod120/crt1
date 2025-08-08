import LocalDBObj from "@/utils/localDb";
import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider, Spin, theme } from "antd";
import { Suspense, useEffect } from "react"; // Added React and useEffect
import { useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import LoadPreferencesOnStart from "./components/preferences/LoadPreferencesOnStart ";
import router from "./routes";
import { RootState } from "./store";

// Definitions needed for applying styles (could be imported from a shared constants file)
const LOCAL_STORAGE_KEY = "crtCustomThemeSettings";

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
    bgVariableName: "--crt-header-background",
    textVariableName: "--crt-header-color",
  },
  {
    bgVariableName: "--crt-sidebar-background",
    textVariableName: "--crt-sidebar-color",
  },
  {
    bgVariableName: "--crt-sidebar-header-background",
    textVariableName: "--crt-sidebar-header-main-active-color",
  },
];

const App = () => {
  const themeType = useSelector((state: RootState) => state.theme.theme);
  const userDetails = JSON.parse(LocalDBObj?.getVal('userDetails') || '{}');

  useEffect(() => {
    const applyPersistedThemeSettings = () => {
      const savedSettingsRaw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedSettingsRaw) {
        try {
          const savedSettings: StoredSettings = JSON.parse(savedSettingsRaw);

          persistenceColorSections.forEach((sectionInfo) => {
            const settingKey = sectionInfo.bgVariableName; // Settings are stored by bgVariable name
            const choice = savedSettings[settingKey];

            if (choice && choice.background) {
              document.documentElement.style.setProperty(
                sectionInfo.bgVariableName,
                choice.background
              );
              if (choice.text) {
                // Should be '#FFFFFF' if background was set
                document.documentElement.style.setProperty(
                  sectionInfo.textVariableName,
                  choice.text
                );
              }
            } else {
              // If a setting for a section was explicitly nullified or is missing after being saved previously,
              // ensure its properties are removed to revert to theme defaults.
              // This case might be less common if saving only occurs for actual choices.
              document.documentElement.style.removeProperty(
                sectionInfo.bgVariableName
              );
              document.documentElement.style.removeProperty(
                sectionInfo.textVariableName
              );
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
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#36cfc9'
        },
        algorithm:
          themeType === "light" ? theme.defaultAlgorithm : theme.darkAlgorithm,
          components: {
            Table: {
              headerBorderRadius: 0,
            }
          }
      }
    }
    >
      <Suspense
        fallback={
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spin size="default" />
          </div>
        }
      >
        <div className="app-container">
          {userDetails?.userName && userDetails?.userId &&  <LoadPreferencesOnStart /> }
          <RouterProvider router={router} />
        </div>
      </Suspense>
    </ConfigProvider>
  );
};

export default App;
