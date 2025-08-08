import { Input, Spin } from "antd";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { FaFileLines } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";

import { notify } from "@/common/services/notificationService";
import BreadcrumbView from "@/components/breadcrumb/Breadcrumb";
import { useAssetDetailsByIdQuery } from "@/services/queries/assetQueries";
import { useStudyDetailsByAssetQuery } from "@/services/queries/studyQueries";
import { DEBOUNCE_DELAY } from "@/utils";
import { debounce } from "lodash";
import "./Assets.css";
import StudyTable from "./StudyTable";
const AssetInfo = lazy(() => import("./AssetInfo"));

const { Search } = Input;

const AssetDashboard = () => {
  const navigate = useNavigate();
  const { assetId } = useParams();
  const [searchText, setSearchText] = useState("");
  const debouncedSetSearchText = useMemo(
    () =>
      debounce((value: string) => {
        setSearchText(value);
      }, DEBOUNCE_DELAY),
    []
  );
  const handleSearch = (value: string) => {
    setSearchText(value);
    debouncedSetSearchText(value);
  };
  const {
    data: assetDetails,
    isLoading: assetLoading,
    isError: assetError,
    error,
  } = useAssetDetailsByIdQuery(assetId);

  const {
    data: studies,
    isLoading: studiesLoading,
    isError: studiesError,
    error: studyError,
  } = useStudyDetailsByAssetQuery(assetId);

  useEffect(() => {
    if (assetError || studiesError) {
      const errorMessage =
        (error as any)?.response?.data?.message ||
        (error as Error)?.message ||
        "Failed to fetch dashboard data";
      notify("error", "Asset Dashboard Error", errorMessage);
    }
  }, [assetError, studiesError, studyError, error]);

  const filteredStudies = useMemo(() => {
    if (!studies) return [];
    return studies.filter((study: any) =>
      study?.setupName?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [studies, searchText]);

  const breadcrumbs = [
    {
      title: (
        <div className="breadcrumb-item">
          <IoHome size={15} className="breadcrumb-icon" />
          <span>Home</span>
        </div>
      ),
      key: "home",
      onClick: () => navigate("/"),
    },
    {
      title: (
        <div className="breadcrumb-item">
          <FaFileLines size={15} className="breadcrumb-icon" />
          <span className="active-breadcrumb">
            {assetLoading ? "Loading..." : assetDetails?.assetName || ""}
          </span>
        </div>
      ),
      key: `${assetId}`,
      onClick: () => navigate(`/asset/${assetId}`),
    },
  ];

  return (
    <>
      <BreadcrumbView
        breadcrumbs={breadcrumbs}
        title={assetLoading ? "Loading..." : assetDetails?.assetName || ""}
      />
      <Suspense
        fallback={
          <div className="centered-spinner">
            <Spin />
          </div>
        }
      >
        <AssetInfo details={assetDetails || null} loading={assetLoading} />
      </Suspense>
      <Search
        placeholder="Search studies and setups..."
        onChange={(e) => handleSearch(e.target.value)}
        onSearch={handleSearch}
        value={searchText}
        className="setups-study-search"
        enterButton
        name="stuides and setups search"
        allowClear
        id="setup-study-search"
        disabled={studiesLoading}
      />
      <StudyTable
        data={filteredStudies}
        loading={studiesLoading}
        assetId={assetId!}
      />
    </>
  );
};

export default AssetDashboard;
